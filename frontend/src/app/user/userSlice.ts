import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './userThunks';
import { userInitialState } from './userInitialStates';

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    resetUserState: (state) => {
      state.status = 'idle';
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
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
