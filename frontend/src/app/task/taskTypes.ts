import { tCollectionData } from '../collection/collectionTypes';
import { tTypeMap } from '../general/types';

// Type of full task data validation limits
export type tTaskFormLabels = {
  name: string;
  tags: string;
};

// Type of full task data validation limits
export type tTaskValidationLimits = {
  minName: number;
  maxName: number;
  minTag: number;
  maxTag: number;
  totalTag: number;
};

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
  createdAt: string;
  updatedAt: string;
};

// Type of task list search type
export type tTaskListSearchType = {
  default: string;
  name: string;
  tags: string;
};

// Type of task list completion
export type tTaskListCompletion = {
  default: string;
  complete: string;
  incomplete: string;
};

// Type of task list sort
export type tTaskListSort = {
  default: string;
  nameDESC: string;
  createdDESC: string;
  createdASC: string;
};

// Type of task list limit
export type tTaskListLimit = {
  default: string;
  p36: string;
  p60: string;
};

// Type of task query parts
export type tTaskQueryParts = {
  keywords: string;
  searchType: keyof tTaskListSearchType;
  completion: keyof tTaskListCompletion;
  sort: keyof tTaskListSort;
  limit: keyof tTaskListLimit;
  page: string;
};

// Type of task mapped query parts
export type tTaskMappedQueryParts = tTypeMap<tTaskQueryParts>[keyof tTypeMap<tTaskQueryParts>];

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
