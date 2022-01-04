import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ga: null,
};

export const gaSlice = createSlice({
  name: 'ga@',
  initialState: initialState,
  reducers: {
    doPushGa(state, action) {
      state.ga = action.payload;
    },
  },
});

const { actions, reducer: gaReducer } = gaSlice;
export const { doPushGa } = actions;
export default gaReducer;
