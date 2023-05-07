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

// Type of collection query parts
export type tCollectionQueryParts = {
  keywords: string;
  sort: string;
  limit: string;
  page: string;
};

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
