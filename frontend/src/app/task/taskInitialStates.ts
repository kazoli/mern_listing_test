import {
  tTaskState,
  tTaskListSearchType,
  tTaskListCompletion,
  tTaskListLimit,
  tTaskListSort,
  tTaskFormLabels,
  tTaskValidationLimits,
} from './taskTypes';

// Form label names to task form and validations
export const taskFormLabels: tTaskFormLabels = {
  name: 'Task name',
  tags: 'Tags',
};

// Validation limits to task fields
export const taskValidationLimits: tTaskValidationLimits = {
  minName: 3,
  maxName: 200,
  minTag: 2,
  maxTag: 30,
  totalTag: 3,
};

// Task list sorting options
export const taskListSearchType: tTaskListSearchType = {
  default: 'Search in name and tags',
  name: 'Search in name only',
  tags: 'Search in tags only',
};

// Task list completion options
export const taskListCompletion: tTaskListCompletion = {
  default: 'All statuses',
  complete: 'Complete tasks only',
  incomplete: 'Incomplete tasks only',
};

// Task list sorting options
export const taskListSort: tTaskListSort = {
  default: 'Name (A-Z)',
  nameDESC: 'Name (Z-A)',
  createdDESC: 'Recently created at front',
  createdASC: 'Formerly created at front',
};

// Task list limit options
export const taskListLimit: tTaskListLimit = {
  default: '12 / page',
  p36: '36 / page',
  p60: '60 / page',
};

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
    searchType: 'default',
    completion: 'default',
    sort: 'default',
    limit: 'default',
    page: '',
  },
};
