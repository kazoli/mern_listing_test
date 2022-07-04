// collection query parts interface
export interface tsCollectionQueryParts {
  keywords: string;
  sort: string;
  limit: string;
  page: string;
}

// posted collection interface
export interface tsCollectionDataSave {
  _id: string;
  name: string;
}

// full collection interface
export interface tsCollectionData extends tsCollectionDataSave {
  createdAt: string;
  updatedAt: string;
}

// collection state interface
export interface tsCollectionState {
  status: "idle" | "loading" | "warning" | "failed";
  highlighted: boolean | string;
  refreshPage: boolean;
  refreshButton: boolean;
  editor: boolean | number;
  resetSearch: boolean;
  message: string;
  isNextPage: boolean;
  data: null | tsCollectionData[];
  queryParts: tsCollectionQueryParts;
}