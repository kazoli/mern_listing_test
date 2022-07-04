import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createCollection,
  deleteCollection,
  getCollections,
  updateCollection,
} from "./collectionService";
import { tsCollectionQueryParts, tsCollectionState } from "./collectionTypes";

const initialState: tsCollectionState = {
  status: "idle",
  highlighted: false,
  refreshPage: false,
  refreshButton: false,
  editor: false,
  resetSearch: false,
  data: null,
  message: "",
  isNextPage: false,
  queryParts: {
    keywords: "",
    sort: "",
    limit: "",
    page: "",
  },
};

const collectionSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    resetCollectionState: (state) => {
      state.status = "idle";
      state.message = "";
    },
    buildURL: (state) => {
      //query elements array
      let query: string[] = [];
      // build query based on queryParts
      let key: keyof tsCollectionQueryParts;
      for (key in state.queryParts) {
        if (state.queryParts[key].length) {
          query.push(`${key}=${state.queryParts[key]}`);
        }
      }
      // join the query elments into a string or get empty
      const queryString: string = query.length
        ? encodeURI("?" + query.join("&"))
        : "";
      // change old URL with the new one in the browser
      window.history.pushState(
        {},
        "",
        window.location.origin + window.location.pathname + queryString
      );
    },
    refreshPage: (state) => {
      state.refreshButton = false;
      state.refreshPage = true;
    },
    toogleEditor: (
      state,
      action: PayloadAction<tsCollectionState["editor"]>
    ) => {
      state.editor = action.payload;
    },
    toogleHighlighted: (
      state,
      action: PayloadAction<tsCollectionState["highlighted"]>
    ) => {
      state.highlighted = action.payload;
    },
    updateCollectionQueryParts: (
      state,
      action: PayloadAction<{
        queryPart: keyof tsCollectionQueryParts;
        value: string;
        refreshPage: tsCollectionState["refreshPage"];
      }>
    ) => {
      state.queryParts[action.payload.queryPart] = action.payload.value;
      state.refreshPage = action.payload.refreshPage;
      if (action.payload.refreshPage) {
        // hide refresh button
        state.refreshButton = false;
        // if page selector was the trigger to not set default the page number
        if (action.payload.queryPart !== "page") {
          // set page default to avoid redirect first page message from server
          state.queryParts.page = "";
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollections.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        state.status = action.payload.message ? "warning" : "idle";
        state.refreshPage = false;
        state.data = action.payload.data;
        state.resetSearch = action.payload.queryParts.keywords.length > 0;
        state.message = action.payload.message;
        state.isNextPage = action.payload.isNextPage;
        state.queryParts.keywords = action.payload.queryParts.keywords;
        state.queryParts.sort = action.payload.queryParts.sort;
        state.queryParts.limit = action.payload.queryParts.limit;
        state.queryParts.page = action.payload.queryParts.page;
      })
      .addCase(getCollections.rejected, (state, action) => {
        state.status = "failed";
        state.data = [];
        state.message = action.payload ? action.payload : "Unknown error";
      })
      .addCase(createCollection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.status = "idle";
        state.refreshButton = true;
        state.editor = false;
        state.highlighted = action.payload._id;
        //if collection would be null
        state.data = state.data
          ? [action.payload, ...state.data]
          : [action.payload];
        state.message =
          "Collection successfully created. To reorder your collections, click on the blue refresh button below.";
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload ? action.payload : "Unknown error";
      })
      .addCase(updateCollection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.status = "idle";
        state.refreshButton = true;
        state.editor = false;
        // if collection would be null
        if (state.data) {
          state.data = state.data.map((collection) =>
            collection._id === action.payload._id ? action.payload : collection
          );
        } else {
          state.data = [action.payload];
        }
        state.message =
          "Successful update. To reorder your collections, click on the blue refresh button below.";
      })
      .addCase(updateCollection.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload ? action.payload : "Unknown error";
      })
      .addCase(deleteCollection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.status = "idle";
        state.refreshButton = true;
        state.editor = false;
        // if collection would be null
        if (state.data) {
          state.data = state.data.filter(
            (collection) => collection._id !== action.payload._id
          );
          if (!state.data.length) {
            state.refreshPage = true;
            state.message = "Successful deletion.";
          } else {
            state.message =
              "Successful deletion. To reorder your collections, click on the blue refresh button below.";
          }
        }
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload ? action.payload : "Unknown error";
      });
  },
});

export const {
  resetCollectionState,
  buildURL,
  refreshPage,
  toogleHighlighted,
  toogleEditor,
  updateCollectionQueryParts,
} = collectionSlice.actions;
export default collectionSlice.reducer;
