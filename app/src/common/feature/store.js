import { configureStore } from "@reduxjs/toolkit";
import nativeSlice from "./slices/native.slice";
import authSlice from "./slices/auth.slice";

const store = configureStore({
  reducer: { native: nativeSlice },
  auth: { auth: authSlice },
});

export default store;
