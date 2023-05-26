import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tTaskMappedQueryParts, tTaskQueryParts, tTaskState } from './taskTypes';
import { taskInitialState } from './taskInitialStates';
import { createTask, deleteTask, getTasks, updateTask } from './taskThunks';
import { buildUrl } from '../general/middlewares';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: taskInitialState,
  reducers: {
    taskResetState: (state) => {
      state.status = 'idle';
      state.message = '';
    },
    taskBuildURL: (state) => {
      buildUrl<tTaskQueryParts>(state.queryParts);
    },
    taskRefreshPage: (state) => {
      state.refreshButton = false;
      state.refreshPage = true;
    },
    taskToogleEditor: (state, action: PayloadAction<tTaskState['editor']>) => {
      state.editor = action.payload;
    },
    taskToogleHighlighted: (state, action: PayloadAction<tTaskState['highlighted']>) => {
      state.highlighted = action.payload;
    },
    taskUpdateQueryParts: (
      state,
      action: PayloadAction<{
        queryPart: keyof tTaskQueryParts;
        value: tTaskMappedQueryParts;
        refreshPage: tTaskState['refreshPage'];
      }>,
    ) => {
      (state.queryParts[action.payload.queryPart] as tTaskMappedQueryParts) = action.payload.value;
      state.refreshPage = action.payload.refreshPage;
      if (action.payload.refreshPage) {
        // hide refresh button
        state.refreshButton = false;
        // if page selector was the trigger to not set default the page number
        if (action.payload.queryPart !== 'page') {
          // set page default to avoid redirect first page message from server
          state.queryParts.page = '';
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = action.payload.message ? 'warning' : 'idle';
        state.refreshPage = false;
        state.collection = action.payload.collection;
        state.data = action.payload.data;
        state.resetSearch = action.payload.queryParts.keywords.length > 0;
        state.message = action.payload.message;
        state.isNextPage = action.payload.isNextPage;
        state.queryParts.keywords = action.payload.queryParts.keywords;
        state.queryParts.searchType = action.payload.queryParts.searchType;
        state.queryParts.completion = action.payload.queryParts.completion;
        state.queryParts.sort = action.payload.queryParts.sort;
        state.queryParts.limit = action.payload.queryParts.limit;
        state.queryParts.page = action.payload.queryParts.page;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.refreshPage = false;
        state.data = [];
        state.message = action.payload ? action.payload : 'Unknown error';
      })
      .addCase(createTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = 'idle';
        state.refreshButton = true;
        state.editor = false;
        state.highlighted = action.payload._id;
        //if collection would be null
        state.data = state.data ? [action.payload, ...state.data] : [action.payload];
        state.message =
          'Task successfully created. To reorder your tasks, click on the blue refresh button below.';
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload ? action.payload : 'Unknown error';
      })
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'idle';
        state.refreshButton = true;
        state.editor = false;
        // if collection would be null
        if (state.data) {
          state.data = state.data.map((task) =>
            task._id === action.payload._id ? action.payload : task,
          );
        } else {
          state.data = [action.payload];
        }
        state.message =
          'Successful update. To reorder your tasks, click on the blue refresh button below.';
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload ? action.payload : 'Unknown error';
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'idle';
        state.refreshButton = true;
        state.editor = false;
        // if collection would be null
        if (state.data) {
          state.data = state.data.filter((task) => task._id !== action.payload._id);
          if (!state.data.length) {
            state.refreshPage = true;
            state.message = 'Successful deletion.';
          } else {
            state.message =
              'Successful deletion. To reorder your tasks, click on the blue refresh button below.';
          }
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload ? action.payload : 'Unknown error';
      });
  },
});

export const {
  taskResetState,
  taskBuildURL,
  taskRefreshPage,
  taskToogleEditor,
  taskToogleHighlighted,
  taskUpdateQueryParts,
} = taskSlice.actions;
export default taskSlice.reducer;
