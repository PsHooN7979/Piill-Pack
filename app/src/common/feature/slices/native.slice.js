import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nativeState: "",
};

const nativeSlice = createSlice({
  name: "native",
  initialState,
  reducers: {
    setNativeState: (state, action) => {
      state.nativeState = action.payload;
    },
  },
});

export const { setNativeState } = nativeSlice.actions;
export default nativeSlice.reducer;
