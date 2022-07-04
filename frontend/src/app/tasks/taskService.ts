import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { tsTaskData, tsTaskDataSave, tsTaskState } from "./taskTypes";
import { errorHandler } from "../error";

// get tasks through an async thunk of redux toolkit
export const getTasks = createAsyncThunk<
  tsTaskState,
  string,
  { rejectValue: string }
>("tasks/getTasks", async (query, thunkAPI) => {
  try {
    // query string contains value of window.location.search
    const response = await axios.get(`/api/tasks/${query}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorHandler(error));
  }
});

// create a task through an async thunk of redux toolkit
export const createTask = createAsyncThunk<
  tsTaskData,
  tsTaskDataSave,
  { rejectValue: string }
>("tasks/createTask", async (taskData, thunkAPI) => {
  try {
    const response = await axios.post("/api/tasks/", taskData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorHandler(error));
  }
});

// update a task through an async thunk of redux toolkit
export const updateTask = createAsyncThunk<
  tsTaskData,
  tsTaskDataSave,
  { rejectValue: string }
>("tasks/updateTask", async (taskData, thunkAPI) => {
  try {
    const response = await axios.put("/api/tasks/", taskData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorHandler(error));
  }
});

// delete a task through an async thunk of redux toolkit
export const deleteTask = createAsyncThunk<
  tsTaskData,
  tsTaskDataSave["_id"],
  { rejectValue: string }
>("tasks/deleteTask", async (task_id, thunkAPI) => {
  try {
    // query string contains task ID and query string to get collection after deletion
    const response = await axios.delete(`/api/tasks/${task_id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(errorHandler(error));
  }
});
