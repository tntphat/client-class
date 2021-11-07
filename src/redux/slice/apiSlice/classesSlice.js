import { apiClasses } from '../../../services/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const doGetClasses = createAsyncThunk('classes@get/GetClasses', async () => {
  const result = await apiClasses.getClasses();
  return result.data;
});

const initialState = {
  isLoading: false,
  listClasses: [],
  error: null,
};

const slice = createSlice({
  name: 'classes@',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get general
    builder.addCase(doGetClasses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(doGetClasses.fulfilled, (state, action) => {
      state.listClasses = action.payload;
      state.isLoading = false;
    });
    builder.addCase(doGetClasses.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});
const { reducer: classesReducer } = slice;

export default classesReducer;
