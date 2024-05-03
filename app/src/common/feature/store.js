import { configureStore } from "@reduxjs/toolkit";
import nativeSlice from "./slices/native.slice";

const store = configureStore({
  reducer: { native: nativeSlice },
});

export default store;
