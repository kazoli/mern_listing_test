import { tTaskState } from './taskTypes';

// Initial state of task slice
export const taskInitialState: tTaskState = {
  status: 'idle',
  highlighted: false,
  refreshPage: false,
  refreshButton: false,
  editor: false,
  resetSearch: false,
  collection: null,
  data: [],
  message: '',
  isNextPage: false,
  queryParts: {
    keywords: '',
    searchType: '',
    completion: '',
    sort: '',
    limit: '',
    page: '',
  },
};
