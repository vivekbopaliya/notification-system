import { configureStore } from "@reduxjs/toolkit";
import notification from "./notification";

export default configureStore({
  reducer: {
    notification: notification,
  },
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof configureStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
