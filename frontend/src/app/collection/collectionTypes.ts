import { tTypeMap } from '../general/types';

// Type of full collection data validation limits
export type tCollectionFormLabels = {
  name: string;
};

// Type of full collection data validation limits
export type tCollectionValidationLimits = {
  minName: number;
  maxName: number;
};

// Type of collection data errors
export type tCollectionDataErrors = {
  name: string;
};

// Type of collection data
export type tCollectionDataSave = {
  _id: string;
  name: string;
};

// Type of full collection data
export type tCollectionData = tCollectionDataSave & {
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
  status: 'idle' | 'loading' | 'failed';
  highlighted: boolean | string;
  refreshPage: boolean;
  refreshButton: boolean;
  editor: boolean | number;
  resetSearch: boolean;
  isNextPage: boolean;
  data: null | tCollectionData[];
  queryParts: tCollectionQueryParts;
};
