import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "./collections/collectionSlice";
import taskReducer from "./tasks/taskSlice";

export const store = configureStore({
  reducer: {
    collections: collectionReducer,
    tasks: taskReducer,
  },
});

// type for useDispatch
export type tsDispatch = typeof store.dispatch;
// type for useSelector
export type tsRootState = ReturnType<typeof store.getState>;