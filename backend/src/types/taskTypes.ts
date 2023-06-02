import { RequestHandler, Response } from 'express';
import { SortOrder } from 'mongoose';

// Type for task create request body
type tTaskCreateRequest = {
  collection_id: string;
  name: string;
  complete: boolean | string;
  tags: string[];
};

// Type for task create request body
type tTaskUpdateRequest = tTaskCreateRequest & {
  _id: string;
};

// Type for task validation middleware function
export type tTaskValidation = {
  (values: tTaskCreateRequest, res: Response): tTaskCreateRequest;
};

// Type for options of get tasks controller function
export type tGetTasksOptions = {
  conditions: {
    collection_id: string;
    name?: { [key: string]: string };
    tags?: { [key: string]: string };
    $or?: [{ name: { [key: string]: string } }, { tags: { [key: string]: string } }];
    complete?: boolean;
  };
  limit: number;
  skip: number;
  nextSkip: number;
  sort: { [key: string]: SortOrder };
  collation: {
    locale: string;
    strength: number;
  };
  queryParts: {
    keywords: string;
    searchType: 'default' | 'name' | 'tags';
    completion: 'default' | 'complete' | 'incomplete';
    limit: 'default' | 'p36' | 'p60';
    sort: 'default' | 'nameDESC' | 'createdDESC' | 'createdASC';
    page: string;
  };
};

// Type for get tasks controller function
export type tGetTasks = RequestHandler<
  { collection_id: string }, // request params
  {
    queryParts: tGetTasksOptions['queryParts'];
    isNextPage: boolean;
    message: string;
    collection: Object;
    data: Object[];
  }, // response body
  {}, // request body
  {
    [Key in keyof tGetTasksOptions['queryParts']]?: tGetTasksOptions['queryParts'][Key];
  } // request query
>;

// Type for create task controller function
export type tCreateTask = RequestHandler<
  {}, // request params
  {}, // response body
  tTaskCreateRequest, // request body
  {} // request query
>;

// Type for update task controller function
export type tUpdateTask = RequestHandler<
  {}, // request params
  {}, // response body
  tTaskUpdateRequest, // request body
  {} // request query
>;

// Type for delete task controller function
export type tDeleteTask = RequestHandler<
  {
    collection_id: string;
    _id: string;
  }, // request params
  {}, // response body
  {}, // request body
  {} // request query
>;
