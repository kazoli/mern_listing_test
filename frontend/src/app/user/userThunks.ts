import { createAsyncThunk } from '@reduxjs/toolkit';
import { tUserData, tUserDataLogin, tUserDataSave } from './userTypes';
import { errorHandler } from '../general/error';
import axios from 'axios';

// Register user
export const registerUser = createAsyncThunk<tUserData, tUserDataSave, { rejectValue: string }>(
  'user/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/users/register', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  },
);

// Login user
export const loginUser = createAsyncThunk<tUserData, tUserDataLogin, { rejectValue: string }>(
  'user/loginUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/users/login', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  },
);

// Get user
export const getUser = createAsyncThunk<tUserData, void, { rejectValue: string }>(
  'user/getUser',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/users/profile');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  },
);
