import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const modalLoadingSlice = createSlice({
  name: 'ga@',
  initialState: initialState,
  reducers: {
    doPushIsLoadingModal(state, action) {
      state.isLoading = action.payload;
    },
  },
});

const { actions, reducer: modalLoadingReducer } = modalLoadingSlice;
export const { doPushIsLoadingModal } = actions;
export default modalLoadingReducer;
