import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nativeState: "",
  isCamera: false,
  isRead: false,
};

const nativeSlice = createSlice({
  name: "native",
  initialState,
  reducers: {
    setNativeState: (state, action) => {
      state.nativeState = action.payload;
    },
    setCameraState: (state, action) => {
      state.isCamera = action.payload;
    },
    setReadState: (state, action) => {
      state.isRead = action.payload;
    },
  },
});

export const { setNativeState, setCameraState, setReadState } =
  nativeSlice.actions;
export default nativeSlice.reducer;
