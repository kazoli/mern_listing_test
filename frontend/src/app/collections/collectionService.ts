import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  tsCollectionData,
  tsCollectionDataSave,
  tsCollectionState,
} from "./collectionTypes";
import { errorHandler } from "../error";

// get collections through an async thunk of redux toolkit
export const getCollections = createAsyncThunk<
  tsCollectionState,
  string,
  { rejectValue: string }
>("collections/getCollections", async (query, thunkAPI) => {
  try {
    // query string contains value of window.location.search
    const response = await axios.get(`/api/collections/${query}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorHandler(error));
  }
});

// create a collection through an async thunk of redux toolkit
export const createCollection = createAsyncThunk<
  tsCollectionData,
  tsCollectionDataSave,
  { rejectValue: string }
>("collections/createCollection", async (collectionData, thunkAPI) => {
  try {
    const response = await axios.post("/api/collections/", collectionData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorHandler(error));
  }
});

// update a collection through an async thunk of redux toolkit
export const updateCollection = createAsyncThunk<
  tsCollectionData,
  tsCollectionDataSave,
  { rejectValue: string }
>("collections/updateCollection", async (collectionData, thunkAPI) => {
  try {
    const response = await axios.put("/api/collections/", collectionData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorHandler(error));
  }
});

// delete a collection through an async thunk of redux toolkit
export const deleteCollection = createAsyncThunk<
  tsCollectionData,
  tsCollectionDataSave["_id"],
  { rejectValue: string }
>("collections/deleteCollection", async (collection_id, thunkAPI) => {
  try {
    // query string contains collection ID and query string to get collection after deletion
    const response = await axios.delete(`/api/collections/${collection_id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorHandler(error));
  }
});
