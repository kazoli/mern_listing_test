import { tCollectionState } from './collectionTypes';

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
    sort: '',
    limit: '',
    page: '',
  },
};
