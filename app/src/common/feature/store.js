import { configureStore } from "@reduxjs/toolkit";
import { thunk } from 'redux-thunk';
import nativeSlice from "../../domains/_scanner/features/slices/native.slice";
import authSlice from "./slices/auth.slice";
import snackBarSlice from "./slices/snackBar.slice";
import userSlice from "./slices/user.slice";
import prescSlice from "../../domains/prescription/slices/presc.slice";

const store = configureStore({
  reducer: { 
    native: nativeSlice,
    auth: authSlice,
    snackBar: snackBarSlice,
    user: userSlice,
    prescriptions: prescSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export default store;
