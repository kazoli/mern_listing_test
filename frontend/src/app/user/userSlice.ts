import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, getUser } from './userThunks';
import { userInitialState } from './userInitialStates';
import { cookieManager } from '../general/middlewares';

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    resetUserStatus: (state) => {
      state.status = 'idle';
    },
    logOutUser: (state) => {
      state.status = 'idle';
      state.data = {};
      cookieManager.delete('jwt');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'failed';
        state.data = [];
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
        state.data = [];
      })
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.status = 'failed';
        state.data = [];
        cookieManager.delete('jwt');
      });
  },
});

export const { resetUserStatus, logOutUser } = userSlice.actions;
export default userSlice.reducer;
