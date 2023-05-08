import { tTypeMap } from '../general/types';

// Type of posted collection data
export type tCollectionDataSave = {
  name: string;
};

// Type of full collection data
export type tCollectionData = tCollectionDataSave & {
  _id: string;
  user_id: string;
  createdAt: string;
  updatedAt: string;
};

// Type of collection list sort
export type tCollectionListSort = {
  default: string;
  nameDESC: string;
  createdDESC: string;
  createdASC: string;
};

// Type of collection list limit
export type tCollectionListLimit = {
  default: string;
  p36: string;
  p60: string;
};

// Type of collection query parts
export type tCollectionQueryParts = {
  keywords: string;
  sort: keyof tCollectionListSort;
  limit: keyof tCollectionListLimit;
  page: string;
};

// Type of collection mapped query parts
export type tCollectionMappedQueryParts =
  tTypeMap<tCollectionQueryParts>[keyof tTypeMap<tCollectionQueryParts>];

// Type of collection state
export type tCollectionState = {
  status: 'idle' | 'loading' | 'warning' | 'failed';
  highlighted: boolean | string;
  refreshPage: boolean;
  refreshButton: boolean;
  editor: boolean | number;
  resetSearch: boolean;
  message: string;
  isNextPage: boolean;
  data: null | tCollectionData[];
  queryParts: tCollectionQueryParts;
};