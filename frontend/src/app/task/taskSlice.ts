import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tTaskMappedQueryParts, tTaskQueryParts, tTaskState } from './taskTypes';
import { taskInitialState } from './taskInitialStates';
import { createTask, deleteTask, getTasks, updateTask } from './taskThunks';
import { buildUrl, scrollToElement } from '../general/middlewares';
import { toast } from 'react-toastify';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: taskInitialState,
  reducers: {
    taskReset: () => taskInitialState,
    taskBuildURL: (state) => {
      state.status = 'idle';
      buildUrl<tTaskQueryParts>(state.queryParts);
    },
    taskRefreshPage: (state) => {
      state.status = 'idle';
      state.refreshButton = false;
      state.refreshPage = true;
    },
    taskToogleEditor: (state, action: PayloadAction<tTaskState['editor']>) => {
      state.status = 'idle';
      state.editor = action.payload;
    },
    taskToogleHighlighted: (state, action: PayloadAction<tTaskState['highlighted']>) => {
      state.status = 'idle';
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
      state.status = 'idle';
      (state.queryParts[action.payload.queryPart] as tTaskMappedQueryParts) = action.payload.value;
      state.refreshPage = action.payload.refreshPage;
      if (action.payload.refreshPage) {
        // hide refresh button
        state.refreshButton = false;
        // if page selector was the trigger to not set default the page number
        if (action.payload.queryPart === 'page') {
          // scroll up to top paginator container if bottom was the triggerer
          scrollToElement('smooth', 'nearest', '.paginator-container');
        } else {
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
        state.status = 'idle';
        state.refreshPage = false;
        state.collection = action.payload.collection;
        state.data = action.payload.data;
        state.resetSearch = action.payload.queryParts.keywords.length > 0;
        state.isNextPage = action.payload.isNextPage;
        state.queryParts.keywords = action.payload.queryParts.keywords;
        state.queryParts.searchType = action.payload.queryParts.searchType;
        state.queryParts.completion = action.payload.queryParts.completion;
        state.queryParts.sort = action.payload.queryParts.sort;
        state.queryParts.limit = action.payload.queryParts.limit;
        state.queryParts.page = action.payload.queryParts.page;
        if (action.payload.message) {
          toast.warn(action.payload.message);
        }
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.refreshPage = false;
        state.data = [];
      })

      .addCase(createTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = 'idle';
        state.refreshButton = true;
        state.editor = false;
        state.highlighted = action.payload._id;
        state.data = state.data ? [action.payload, ...state.data] : [action.payload];
        toast.success(
          'Task successfully created. To reorder your tasks, click on the refresh button.',
        );
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed';
      })

      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'idle';
        state.refreshButton = true;
        state.editor = false;
        // if data would be null
        if (state.data) {
          state.data = state.data.map((task) =>
            task._id === action.payload._id ? action.payload : task,
          );
        } else {
          state.data = [action.payload];
        }
        toast.success('Successful update. To reorder your tasks, click on the refresh button.');
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
      })

      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'idle';
        state.refreshButton = true;
        state.editor = false;
        // if data would be null
        if (state.data) {
          state.data = state.data.filter((task) => task._id !== action.payload._id);
          if (state.data.length) {
            toast.success(
              'Successful deletion. To reorder your tasks, click on the refresh button.',
            );
          } else {
            state.refreshPage = true;
            toast.success('Successful deletion.');
          }
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const {
  taskReset,
  taskBuildURL,
  taskRefreshPage,
  taskToogleEditor,
  taskToogleHighlighted,
  taskUpdateQueryParts,
} = taskSlice.actions;
export default taskSlice.reducer;
