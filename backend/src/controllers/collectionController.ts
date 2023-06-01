import asyncHandler from 'express-async-handler';
import { Collection, Task } from '../models/index';
import { errorTrigger } from '../middlewares/errorMiddleware';
import { collectionValidation } from '../middlewares/collectionMiddleware';
import {
  tCreateCollection,
  tDeleteCollection,
  tGetCollections,
  tGetCollectionsOptions,
  tUpdateCollection,
} from '../types/collectionTypes';

/*
  @desc Get collections
  @route GET /api/collections
  @access Private
*/
export const getCollections: tGetCollections = asyncHandler(async (req, res) => {
  // options for query
  let options: tGetCollectionsOptions = {
    conditions: { user_id: res.locals.user._id }, // set user_id in conditions
    limit: 0,
    skip: 0,
    nextSkip: 0,
    sort: {},
    collation: { locale: 'en', strength: 2 },
    queryParts: { keywords: '', limit: 'default', sort: 'default', page: '' },
  };

  // set conditions and remove starting and trailing spaces
  if (req.query.keywords && (options.queryParts.keywords = req.query.keywords.trim())) {
    // remove extra spaces among words
    // escaping all special characters for regex
    // set OR conditions among words for database query
    const keywords = options.queryParts.keywords
      .replace(/\s+/g, ' ')
      .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
      .replace(/\s+/g, '|');
    // $options: "i" for case insensitive
    options.conditions.name = { $regex: keywords, $options: 'i' };
  }

  // set limit
  switch (req.query.limit) {
    case 'p36':
      options.limit = 36;
      options.queryParts.limit = req.query.limit; // for return value
      break;
    case 'p60':
      options.limit = 60;
      options.queryParts.limit = req.query.limit; // for return value
      break;
    default:
      options.limit = 12;
  }

  // set page
  let page: number;
  if (req.query.page && req.query.page.match(/^\d+$/) && (page = parseInt(req.query.page)) > 1) {
    options.skip = options.limit * (page - 1);
    options.nextSkip = options.limit * page;
    options.queryParts.page = req.query.page; // for return value
  } else {
    options.nextSkip = options.limit;
  }

  // set sort
  switch (req.query.sort) {
    case 'nameDESC':
      options.sort = { name: -1 };
      options.queryParts.sort = req.query.sort; // for return value
      break;
    case 'createdASC':
      options.sort = { createdAt: 1 };
      options.queryParts.sort = req.query.sort; // for return value
      break;
    case 'createdDESC':
      options.sort = { createdAt: -1 };
      options.queryParts.sort = req.query.sort; // for return value
      break;
    default:
      options.sort = { name: 1 };
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
      options.queryParts.page = ''; // for return value
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
    queryParts: options.queryParts,
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
export const createCollection: tCreateCollection = asyncHandler(async (req, res) => {
  // server side validation and processing
  const validationResults = collectionValidation(req.body, res);

  // create collection
  const collection = await Collection.create({
    user_id: res.locals.user._id,
    name: validationResults.name,
  });

  if (collection) {
    // return created collection
    res.status(200).json(collection);
  } else {
    errorTrigger(res, 409, 'Collection could not be created');
  }
});

/*
  @desc Update a collection
  @route PUT /api/collections
  @access Private
*/
export const updateCollection: tUpdateCollection = asyncHandler(async (req, res) => {
  // server side validation and processing
  const validationResults = collectionValidation(req.body, res);

  // if collection exists then it will be updated
  const collection = await Collection.findOneAndUpdate(
    {
      _id: req.body._id,
      user_id: res.locals.user._id,
    },
    {
      $set: {
        name: validationResults.name,
      },
    },
    {
      new: true, // true - return new document after update
      upsert: false, // true - create new if given does not exist
    },
  );

  if (collection) {
    // return updated collection
    res.status(200).json(collection);
  } else {
    errorTrigger(res, 401, 'Collection is not available');
  }
});

/*
  @desc Delete a collection
  @route DELETE /api/collections/:id
  @access Private
*/
export const deleteCollection: tDeleteCollection = asyncHandler(async (req, res) => {
  // find the collection and if exists, remove that
  const collection = await Collection.findOneAndRemove({
    _id: req.params.id,
    user_id: res.locals.user._id,
  });

  if (collection) {
    // remove related tasks too
    await Task.deleteMany({ collection_id: req.params.id });
    // return deleted collection
    res.status(200).json(collection);
  } else {
    errorTrigger(res, 401, 'Collection is not available');
  }
});
