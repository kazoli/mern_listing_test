import { tsCollectionData } from "../collections/collectionTypes";

// task query parts interface
export interface tsTaskQueryParts {
  keywords: string;
  searchType: string;
  completion: string;
  sort: string;
  limit: string;
  page: string;
}

// posted task collection interface
export interface tsTaskDataSave {
  _id: string;
  collection_id: string;
  name: string;
  complete: boolean;
  tags: string[];
}

// full task collection interface
export interface tsTaskData extends tsTaskDataSave {
  createdAt: string;
  updatedAt: string;
}

// task state interface
export interface tsTaskState {
  status: "idle" | "loading" | "warning" | "failed";
  highlighted: boolean | string;
  refreshPage: boolean;
  refreshButton: boolean;
  editor: boolean | number;
  resetSearch: boolean;
  message: string;
  isNextPage: boolean;
  collection: null | tsCollectionData;
  data: tsTaskData[];
  queryParts: tsTaskQueryParts;
}
