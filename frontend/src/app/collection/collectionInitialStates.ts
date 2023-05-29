import {
  tCollectionFormLabels,
  tCollectionListLimit,
  tCollectionListSort,
  tCollectionState,
  tCollectionValidationLimits,
} from './collectionTypes';

// Form label names to collection form and validations
export const collectionFormLabels: tCollectionFormLabels = {
  name: 'Collection name',
};

// Validation limits to collection fields
export const collectionValidationLimits: tCollectionValidationLimits = {
  minName: 3,
  maxName: 50,
};

// Collection list sorting options
export const collectionListSort: tCollectionListSort = {
  default: 'Name (A-Z)',
  nameDESC: 'Name (Z-A)',
  createdDESC: 'Recently created at front',
  createdASC: 'Formerly created at front',
};

// Collection list limit options
export const collectionListLimit: tCollectionListLimit = {
  default: '12 / page',
  p36: '36 / page',
  p60: '60 / page',
};

// Initial state of collection slice
export const collectionInitialState: tCollectionState = {
  status: 'idle',
  highlighted: false,
  refreshPage: false,
  refreshButton: false,
  editor: false,
  resetSearch: false,
  data: null,
  isNextPage: false,
  queryParts: {
    keywords: '',
    sort: 'default',
    limit: 'default',
    page: '',
  },
};
