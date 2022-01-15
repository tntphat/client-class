import { combineReducers } from '@reduxjs/toolkit';

import classesSlice from '../slice/apiSlice/classesSlice';
import userSlice from '../slice/apiSlice/userSlice';
import adminSlice from '../slice/apiSlice/adminSlice';
import notificationSlice from '../slice/apiSlice/notificationSlice';
import modalLoadingSlice from '../slice/appSlice/modalLoadingSlice';

export const rootReducer = combineReducers({
  classes: classesSlice,
  user: userSlice,
  admin: adminSlice,
  notification: notificationSlice,
  modalLoading: modalLoadingSlice,
});
