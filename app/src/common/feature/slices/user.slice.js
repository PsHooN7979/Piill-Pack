import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  age: null,
  gender: null,
  weight: null,
  height: null,
  nickname: '',
};

const userSlice = createSlice({
  name: 'user',
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
