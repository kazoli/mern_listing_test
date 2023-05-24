import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, getUser, updateUser, deleteUser } from './userThunks';
import { userInitialState } from './userInitialStates';
import { cookieManager } from '../general/middlewares';
import { toast } from 'react-toastify';

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    resetUserStatus: (state) => {
      state.status = 'idle';
    },
    logOutUser: (state) => {
      state.status = 'idle';
      state.data = userInitialState.data;
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
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'failed';
        state.data = userInitialState.data;
      })

      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
        state.data = userInitialState.data;
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
        state.data = userInitialState.data;
        cookieManager.delete('jwt');
      })

      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
        toast.success('Your profile has been successfully updated');
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = 'idle';
        state.data = userInitialState.data;
        cookieManager.delete('jwt');
        toast.success('Your profile has been successfully deleted');
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { resetUserStatus, logOutUser } = userSlice.actions;
export default userSlice.reducer;
