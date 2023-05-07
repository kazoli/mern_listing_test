import { tCollectionData } from '../collection/collectionTypes';

// Type of posted task data
export type tTaskDataSave = {
  _id: string;
  collection_id: string;
  name: string;
  complete: boolean;
  tags: string[];
};

// Type of full task data
export type tTaskData = tTaskDataSave & {
  _id: string;
  collection_id: string;
  createdAt: string;
  updatedAt: string;
};

// Type of task query parts
export type tTaskQueryParts = {
  keywords: string;
  searchType: string;
  completion: string;
  sort: string;
  limit: string;
  page: string;
};

// Type of task state
export type tTaskState = {
  status: 'idle' | 'loading' | 'warning' | 'failed';
  highlighted: boolean | string;
  refreshPage: boolean;
  refreshButton: boolean;
  editor: boolean | number;
  resetSearch: boolean;
  message: string;
  isNextPage: boolean;
  collection: null | tCollectionData;
  data: tTaskData[];
  queryParts: tTaskQueryParts;
};
