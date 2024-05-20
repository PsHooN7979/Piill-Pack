import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.token = action.payload.token;
    },
    clearAuth: (state) => {
      state.isAuth = false;
      state.token = null;
    },
  },
});

export const { setIsAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
