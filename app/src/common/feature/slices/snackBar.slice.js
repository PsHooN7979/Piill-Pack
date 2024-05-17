import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snackbars: [],
};

const snackBarSlice = createSlice({
  name: 'snackBar',
  initialState,
  reducers: {
    addSnackBar: (state, action) => {
      state.snackbars.push(action.payload);
    },
    removeSnackBar: (state, action) => {
      state.snackbars = state.snackbars.filter((snackBar) => snackBar.id !== action.payload);
    },
  },
});

export const { addSnackBar, removeSnackBar } = snackBarSlice.actions;

export default snackBarSlice.reducer;
