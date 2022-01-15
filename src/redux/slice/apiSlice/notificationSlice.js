import { apiNotification } from '../../../services/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const doGetNotifications = createAsyncThunk(
  'notification@get/getNotifications',
  async () => {
    const result = await apiNotification.getNotifications();
    return result.data;
  },
);

export const doMarkReadedAll = createAsyncThunk('notification@put/markReadedAll', async (param) => {
  const result = await apiNotification.markReadedAll();
  return result.data;
});

const initialState = {
  isLoading: false,
  listNotifications: [],
  error: null,
};

const slice = createSlice({
  name: 'notification@',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get notifications
    builder.addCase(doGetNotifications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(doGetNotifications.fulfilled, (state, action) => {
      state.listNotifications = action.payload.notifications;
      state.isLoading = false;
    });
    builder.addCase(doGetNotifications.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    //add class
    builder.addCase(doMarkReadedAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(doMarkReadedAll.fulfilled, (state, action) => {
      state.listNotifications = state.listNotifications.map(({ readed, ...rest }) => ({
        readed: true,
        ...rest,
      }));
      state.isLoading = false;
    });
    builder.addCase(doMarkReadedAll.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});
const { reducer: notificationReducer } = slice;

export default notificationReducer;
