import { tCollectionListLimit, tCollectionListSort, tCollectionState } from './collectionTypes';

// Initial state of collection slice
export const collectionInitialState: tCollectionState = {
  status: 'idle',
  highlighted: false,
  refreshPage: false,
  refreshButton: false,
  editor: false,
  resetSearch: false,
  data: null,
  message: '',
  isNextPage: false,
  queryParts: {
    keywords: '',
    sort: 'default',
    limit: 'default',
    page: '',
  },
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
