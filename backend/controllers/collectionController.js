const asyncHandler = require('express-async-handler');
const { errorTrigger } = require('../middlewares/errorMiddleware');
const { collectionValidation } = require('../middlewares/collectionMiddleware');
const { Collection, Task } = require('../models/index');

/*
  @desc Get collections
  @route GET /api/collections
  @access Private
*/
const getCollections = asyncHandler(async (req, res) => {
  // options for query
  let options = {
    conditions: { user_id: req.user.id }, // set user_id in conditions
    limit: 0,
    skip: 0,
    nextSkip: 0,
    sort: {},
    collation: { locale: 'en', strength: 2 },
  };

  // set conditions and remove starting and trailing spaces
  let keywords;
  if (req.query.keywords && (req.query.keywords = req.query.keywords.trim())) {
    // remove extra spaces among words
    // escaping all special characters for regex
    // set OR conditions among words for database query
    keywords = req.query.keywords
      .replace(/\s+/g, ' ')
      .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
      .replace(/\s+/g, '|');
    // $options: "i" for case insensitive
    options.conditions.name = { $regex: keywords, $options: 'i' };
  } else {
    req.query.keywords = ''; // for return value
  }

  // set limit
  switch (req.query.limit) {
    case 'p36':
      options.limit = 36;
      break;
    case 'p60':
      options.limit = 60;
      break;
    default:
      options.limit = 12;
      req.query.limit = 'default'; // for return value
  }

  // set page
  if (req.query.page && req.query.page.match(/^\d+$/) && req.query.page > 0) {
    const page = parseInt(req.query.page);
    options.skip = options.limit * (page - 1);
    options.nextSkip = options.limit * page;
  } else {
    options.nextSkip = options.limit;
    req.query.page = ''; // for return value
  }

  // set sort
  switch (req.query.sort) {
    default:
      req.query.sort = 'default'; // for return value
      options.sort = { name: 1 };
      break;
    case 'nameDESC':
      options.sort = { name: -1 };
      break;
    case 'createdASC':
      options.sort = { createdAt: 1 };
      break;
    case 'createdDESC':
      options.sort = { createdAt: -1 };
      break;
  }

  // loop to handle fallback to page 1 if no results at bigger page number
  let collections = [],
    message = '',
    fallback;
  do {
    // request data from database based on options
    collections = await Collection.find(options.conditions)
      .limit(options.limit)
      .skip(options.skip)
      .collation(options.collation)
      .sort(options.sort);
    fallback = options.skip > 0 && !collections.length;
    if (fallback) {
      options.skip = 0;
      options.nextSkip = options.limit;
      req.query.page = ''; // for return value
      message = 'Redirect to first page because requested page cannot be found';
    }
  } while (fallback);

  // check next page exists for paginator
  const isNextPage = await Collection.find(options.conditions)
    .limit(1)
    .skip(options.nextSkip)
    .collation(options.collation)
    .sort(options.sort);

  // return collections found
  res.status(200).json({
    queryParts: {
      keywords: req.query.keywords,
      limit: req.query.limit,
      sort: req.query.sort,
      page: req.query.page,
    },
    isNextPage: isNextPage.length > 0,
    message: message,
    data: collections,
  });
});

/*
  @desc Create a collection
  @route POST /api/collections
  @access Private
*/
const createCollection = asyncHandler(async (req, res) => {
  // server side validation and processing
  req.body = collectionValidation(req.body, res);

  // create collection
  const collection = await Collection.create({
    user_id: req.user.id,
    name: req.body.name,
  });

  // if collection cannot be created
  if (!collection) {
    errorTrigger(res, 409, 'Collection could not be created');
  }

  // return created collection
  res.status(200).json(collection);
});

/*
  @desc Update a collection
  @route PUT /api/collections
  @access Private
*/
const updateCollection = asyncHandler(async (req, res) => {
  // server side validation and processing
  req.body = collectionValidation(req.body);

  // if collection exists then it will be updated
  const collection = await Collection.findOneAndUpdate(
    {
      _id: req.body._id,
      user_id: req.user.id,
    },
    {
      $set: {
        name: req.body.name,
      },
    },
    {
      new: true, // true - return new document after update
      upsert: false, // true - create new if given does not exist
    },
  );

  // if no collection exists
  if (!collection) {
    errorTrigger(res, 401, 'Collection is not available');
  }

  // return updated collection
  res.status(200).json(collection);
});

/*
  @desc Delete a collection
  @route DELETE /api/collections/:id
  @access Private
*/
const deleteCollection = asyncHandler(async (req, res) => {
  // find the collection and if exists, remove that
  const collection = await Collection.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user.id,
  });

  if (collection) {
    // remove related tasks as well
    await Task.deleteMany({ collection_id: req.params.id });
  } else {
    // if no collection exists or user has no access to
    errorTrigger(res, 401, 'Collection is not available');
  }

  // return removed collection
  res.status(200).json(collection);
});

module.exports = {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
};
