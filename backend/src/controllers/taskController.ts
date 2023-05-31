import asyncHandler from 'express-async-handler';
import { Task } from '../models/index';
import { errorTrigger } from '../middlewares/errorMiddleware';
import { taskValidation } from '../middlewares/taskMiddleware';
import { collectionAccess } from '../middlewares/collectionMiddleware';
import {
  tCreateTask,
  tDeleteTask,
  tGetTasks,
  tGetTasksOptions,
  tUpdateTask,
} from '../types/taskTypes';

/*
  @desc Get tasks
  @route GET /api/tasks/:collection_id
  @access Private
*/
export const getTasks: tGetTasks = asyncHandler(async (req, res) => {
  // check and get collection
  const collection = await collectionAccess(req.params.collection_id, res.locals.user._id, res);

  // options for query
  let options: tGetTasksOptions = {
    conditions: { collection_id: req.params.collection_id },
    limit: 0,
    skip: 0,
    nextSkip: 0,
    sort: {},
    collation: { locale: 'en', strength: 2 },
    queryParts: {
      keywords: '',
      searchType: 'default',
      completion: 'default',
      limit: 'default',
      sort: 'default',
      page: '',
    },
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
    switch (req.query.searchType) {
      case 'name':
      case 'tags':
        options.conditions[req.query.searchType] = {
          $regex: keywords,
          $options: 'i',
        };
        options.queryParts.searchType = req.query.searchType; // for return value
        break;
      default:
        options.conditions['$or'] = [
          { name: { $regex: keywords, $options: 'i' } },
          { tags: { $regex: keywords, $options: 'i' } },
        ];
    }
  }

  // show incomplete / complete / both
  switch (req.query.completion) {
    case 'complete':
      options.conditions.complete = true;
      options.queryParts.completion = req.query.completion; // for return value
      break;
    case 'incomplete':
      options.conditions.complete = false;
      options.queryParts.completion = req.query.completion; // for return value
      break;
    default:
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
  let tasks = [],
    message = '',
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
      req.query.page = ''; // for return value
      message = 'Redirect to first page because requested page cannot be found';
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
    queryParts: options.queryParts,
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
export const createTask: tCreateTask = asyncHandler(async (req, res) => {
  // check collection
  await collectionAccess(req.body.collection_id, res.locals.user._id, res);

  // server side validation and processing
  const validationResults = taskValidation(req.body, res);

  // create task
  const task = await Task.create({
    collection_id: validationResults.collection_id,
    name: validationResults.name,
    complete: validationResults.complete,
    tags: validationResults.tags,
  });

  if (task) {
    // return created task
    res.status(200).json(task);
  } else {
    errorTrigger(res, 409, 'Task could not be created');
  }
});

/*
  @desc Update a task
  @route PUT /api/tasks
  @access Private
*/
export const updateTask: tUpdateTask = asyncHandler(async (req, res) => {
  // check collection
  await collectionAccess(req.body.collection_id, res.locals.user._id, res);

  // server side validation and processing
  const validationResults = taskValidation(req.body, res);

  // if task exists then it will be updated
  const task = await Task.findOneAndUpdate(
    {
      _id: req.body._id,
    },
    {
      $set: {
        name: validationResults.name,
        complete: validationResults.complete,
        tags: validationResults.tags,
      },
    },
    {
      new: true, // true - return new document after update
      upsert: false, // true - create new if given does not exist
    },
  );

  if (task) {
    // return updated task
    res.status(200).json(task);
  } else {
    errorTrigger(res, 401, 'Task cannot be found');
  }
});

/*
  @desc Delete a task
  @route DELETE /api/tasks/:id
  @access Private
*/
export const deleteTask: tDeleteTask = asyncHandler(async (req, res) => {
  // check collection
  await collectionAccess(req.params.collection_id, res.locals.user._id, res);

  // find the task and if exists, remove that
  const task = await Task.findOneAndRemove({ _id: req.params.id });

  if (task) {
    // return deleted task
    res.status(200).json(task);
  } else {
    errorTrigger(res, 401, 'Task cannot be found');
  }
});
