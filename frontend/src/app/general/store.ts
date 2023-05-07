import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../user/userSlice';
import collectionReducer from '../collection/collectionSlice';
import taskReducer from '../task/taskSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
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
