import { RequestHandler, Response } from 'express';
import { SortOrder } from 'mongoose';

// Type for collection create request body
type tCollectionCreateRequest = {
  name: string;
};

// Type for collection create request body
type tCollectionUpdateRequest = tCollectionCreateRequest & {
  _id: string;
};

// Type for collection validation middleware function
export type tCollectionValidation = {
  (values: tCollectionCreateRequest, res: Response): tCollectionCreateRequest;
};

// Type for collection access middleware function
export type tCollectionAccess = {
  (collection_id: string, user_id: string, res: Response): Object;
};

// Type for options of get collections controller function
export type tGetCollectionsOptions = {
  conditions: {
    user_id: string;
    name?: { [key: string]: string };
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
    limit: 'default' | 'p36' | 'p60';
    sort: 'default' | 'nameDESC' | 'createdDESC' | 'createdASC';
    page: string;
  };
};

// Type for get collections controller function
export type tGetCollections = RequestHandler<
  {}, // request params
  {
    queryParts: tGetCollectionsOptions['queryParts'];
    isNextPage: boolean;
    message: string;
    data: Object[];
  }, // response body
  {}, // request body
  {
    [Key in keyof tGetCollectionsOptions['queryParts']]?: tGetCollectionsOptions['queryParts'][Key];
  } // request query
>;

// Type for create collection controller function
export type tCreateCollection = RequestHandler<
  {}, // request params
  {}, // response body
  tCollectionCreateRequest, // request body
  {} // request query
>;

// Type for update collection controller function
export type tUpdateCollection = RequestHandler<
  {}, // request params
  {}, // response body
  tCollectionUpdateRequest, // request body
  {} // request query
>;

// Type for delete collection controller function
export type tDeleteCollection = RequestHandler<
  { _id: string }, // request params
  {}, // response body
  {}, // request body
  {} // request query
>;
