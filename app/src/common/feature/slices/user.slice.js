import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: null,
  nickname: "",
  age: null,
  height: null,
  weight: null,
  gender: null,
  diseaseList: [],
  prescriptionList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUserInfo: (state) => {
      return initialState;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
