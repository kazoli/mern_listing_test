const asyncHandler = require("express-async-handler");
const { errorTrigger } = require("../middlewares/errorMiddleware");
const { taskValidation } = require("../middlewares/taskMiddleware");
const { collectionAccess } = require("../middlewares/collectionMiddleware");
const { Task } = require("../models/index");

/*
  @desc Get tasks
  @route GET /api/tasks/:collection_id
  @access Private
*/
const getTasks = asyncHandler(async (req, res) => {
  // stop and wait until related collection will be checked
  const collection = await collectionAccess(
    req.params.collection_id,
    req.user.id,
    res
  );

  // options for query
  let options = {
    conditions: { collection_id: req.params.collection_id },
    limit: 0,
    skip: 0,
    nextSkip: 0,
    sort: {},
    collation: { locale: "en", strength: 2 },
  };

  // set conditions and remove starting and trailing spaces
  let keywords;
  if (req.query.keywords && (req.query.keywords = req.query.keywords.trim())) {
    // remove extra spaces among words
    // escaping all special characters for regex
    // set OR conditions among words for database query
    keywords = req.query.keywords
      .replace(/\s+/g, " ")
      .replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
      .replace(/\s+/g, "|");
    // $options: "i" for case insensitive
    switch (req.query.searchType) {
      case "name":
      case "tags":
        options.conditions[req.query.searchType] = {
          $regex: keywords,
          $options: "i",
        };
        break;
      default:
        options.conditions["$or"] = [
          { name: { $regex: keywords, $options: "i" } },
          { tags: { $regex: keywords, $options: "i" } },
        ];
        req.query.searchType = ""; // for return value
    }
  } else {
    req.query.keywords = ""; // for return value
    req.query.searchType = ""; // for return value
  }

  // show incomplete / complete / both
  switch (req.query.completion) {
    case "complete":
      options.conditions.complete = true;
      break;
    case "incomplete":
      options.conditions.complete = false;
      break;
    default:
      req.query.completion = ""; // for return value
  }

  // set limit
  switch (req.query.limit) {
    case "p36":
      options.limit = 36;
      break;
    case "p60":
      options.limit = 60;
      break;
    default:
      options.limit = 12;
      req.query.limit = ""; // for return value
  }

  // set page
  if (req.query.page && req.query.page.match(/^\d+$/) && req.query.page > 1) {
    const page = parseInt(req.query.page);
    options.skip = options.limit * (page - 1);
    options.nextSkip = options.limit * page;
  } else {
    options.nextSkip = options.limit;
    req.query.page = ""; // for return value
  }

  // set sort
  switch (req.query.sort) {
    default: // for return value
      req.query.sort = "";
      options.sort = { name: 1 };
      break;
    case "nameDESC":
      options.sort = { name: -1 };
      break;
    case "createdASC":
      options.sort = { createdAt: 1 };
      break;
    case "createdDESC":
      options.sort = { createdAt: -1 };
      break;
  }

  // loop to handle fallback to page 1 if no results at bigger page number
  let tasks = [],
    message = "",
    fallback;
  do {
    // request data from database based on options
    tasks = await Task.find(options.conditions)
      .limit(options.limit)
      .skip(options.skip)
      .collation(options.collation)
      .sort(options.sort);
    fallback = options.skip > 0 && !tasks.length;
    if (fallback) {
      options.skip = 0;
      options.nextSkip = options.limit;
      req.query.page = ""; // for return value
      message = "Redirect to first page because requested page cannot be found";
    }
  } while (fallback);

  // check next page exists for paginator
  const isNextPage = await Task.find(options.conditions)
    .limit(1)
    .skip(options.nextSkip)
    .collation(options.collation)
    .sort(options.sort);

  // return tasks found
  res.status(200).json({
    queryParts: {
      keywords: req.query.keywords,
      searchType: req.query.searchType,
      sort: req.query.sort,
      completion: req.query.completion,
      limit: req.query.limit,
      page: req.query.page,
    },
    isNextPage: isNextPage.length > 0,
    message: message,
    collection: collection,
    data: tasks,
  });
});

/*
  @desc Create a task
  @route POST /api/tasks
  @access Private
*/
const createTask = asyncHandler(async (req, res) => {
  // stop and wait until related collection will be checked
  await collectionAccess(req.body.collection_id, req.user.id, res);

  // server side validation and processing
  req.body = taskValidation(req.body, res);

  // create task
  const task = await Task.create({
    collection_id: req.body.collection_id,
    name: req.body.name,
    complete: req.body.complete,
    tags: req.body.tags,
  });

  // return created task
  res.status(200).json(task);
});

/*
  @desc Update a task
  @route PUT /api/tasks
  @access Private
*/
const updateTask = asyncHandler(async (req, res) => {
  // stop and wait until related collection will be checked
  await collectionAccess(req.body.collection_id, req.user.id, res);

  // server side validation and processing
  req.body = taskValidation(req.body);

  // if task exists then it will be updated
  const task = await Task.findOneAndUpdate(
    {
      _id: req.body._id,
    },
    {
      $set: {
        name: req.body.name,
        complete: req.body.complete,
        tags: req.body.tags,
      },
    },
    {
      new: true, // true - return new document after update
      upsert: false, // true - create new if given does not exist
    }
  );

  // if no task exists
  if (!task) {
    errorTrigger(res, 401, "Task cannot be found");
  }

  // return updated task
  res.status(200).json(task);
});

/*
  @desc Delete a task
  @route DELETE /api/tasks/:id
  @access Private
*/
const deleteTask = asyncHandler(async (req, res) => {
  // stop and wait until related collection will be checked
  await collectionAccess(req.body.collection_id, req.user.id, res);

  // find the task and if exists, remove that
  const task = await Task.findOneAndRemove({ _id: req.params.id });

  // if no task exists
  if (!task) {
    errorTrigger(res, 401, "Task cannot be found");
  }

  // return removed task
  res.status(200).json(task);
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
