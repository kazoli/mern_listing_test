import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  tCollectionMappedQueryParts,
  tCollectionQueryParts,
  tCollectionState,
} from './collectionTypes';
import {
  createCollection,
  deleteCollection,
  getCollections,
  updateCollection,
} from './collectionThunks';
import { collectionInitialState } from './collectionInitialStates';
import { buildUrl } from '../general/middlewares';
import { toast } from 'react-toastify';

const collectionSlice = createSlice({
  name: 'collections',
  initialState: collectionInitialState,
  reducers: {
    collectionBuildURL: (state) => {
      state.status = 'idle';
      buildUrl<tCollectionQueryParts>(state.queryParts);
    },
    collectionRefreshPage: (state) => {
      state.status = 'idle';
      state.refreshButton = false;
      state.refreshPage = true;
    },
    collectionToogleEditor: (state, action: PayloadAction<tCollectionState['editor']>) => {
      state.status = 'idle';
      state.editor = action.payload;
    },
    collectionToogleHighlighted: (
      state,
      action: PayloadAction<tCollectionState['highlighted']>,
    ) => {
      state.status = 'idle';
      state.highlighted = action.payload;
    },
    collectionUpdateQueryParts: (
      state,
      action: PayloadAction<{
        queryPart: keyof tCollectionQueryParts;
        value: tCollectionMappedQueryParts;
        refreshPage: tCollectionState['refreshPage'];
      }>,
    ) => {
      state.status = 'idle';
      (state.queryParts[action.payload.queryPart] as tCollectionMappedQueryParts) =
        action.payload.value;
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
      .addCase(getCollections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        state.status = 'idle';
        state.refreshPage = false;
        state.data = action.payload.data;
        state.resetSearch = action.payload.queryParts.keywords.length > 0;
        state.isNextPage = action.payload.isNextPage;
        state.queryParts.keywords = action.payload.queryParts.keywords;
        state.queryParts.sort = action.payload.queryParts.sort;
        state.queryParts.limit = action.payload.queryParts.limit;
        state.queryParts.page = action.payload.queryParts.page;
        if (action.payload.message) {
          toast.warn(action.payload.message);
        }
      })
      .addCase(getCollections.rejected, (state) => {
        state.status = 'failed';
        state.refreshPage = false;
        state.data = [];
      })

      .addCase(createCollection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.status = 'idle';
        state.refreshButton = true;
        state.editor = false;
        state.highlighted = action.payload._id;
        state.data = state.data ? [action.payload, ...state.data] : [action.payload];
        toast.success(
          'Collection successfully created. To reorder your collections, click on the refresh button.',
        );
      })
      .addCase(createCollection.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(updateCollection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.status = 'idle';
        state.refreshButton = true;
        state.editor = false;
        // if data would be null
        if (state.data) {
          state.data = state.data.map((collection) =>
            collection._id === action.payload._id ? action.payload : collection,
          );
        } else {
          state.data = [action.payload];
        }
        toast.success(
          'Successful update. To reorder your collections, click on the refresh button.',
        );
      })
      .addCase(updateCollection.rejected, (state, action) => {
        state.status = 'failed';
      })

      .addCase(deleteCollection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.status = 'idle';
        state.refreshButton = true;
        state.editor = false;
        // if data would be null
        if (state.data) {
          state.data = state.data.filter((collection) => collection._id !== action.payload._id);
          if (state.data.length) {
            toast.success(
              'Successful deletion. To reorder your collections, click on the refresh button.',
            );
          } else {
            state.refreshPage = true;
            toast.success('Successful deletion.');
          }
        }
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const {
  collectionBuildURL,
  collectionRefreshPage,
  collectionToogleEditor,
  collectionToogleHighlighted,
  collectionUpdateQueryParts,
} = collectionSlice.actions;
export default collectionSlice.reducer;
