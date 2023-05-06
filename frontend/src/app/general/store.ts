import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../users/userSlice';
import collectionReducer from '../collections/collectionSlice';
import taskReducer from '../tasks/taskSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    collections: collectionReducer,
    tasks: taskReducer,
  },
});

export type tAppDispatch = typeof store.dispatch;
export type tRootState = ReturnType<typeof store.getState>;
export type tAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  tRootState,
  unknown,
  Action<string>
>;
