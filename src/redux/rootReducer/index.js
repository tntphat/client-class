import { combineReducers } from '@reduxjs/toolkit';

import classesSlice from '../slice/apiSlice/classesSlice';
import userSlice from '../slice/apiSlice/userSlice';
import adminSlice from '../slice/apiSlice/adminSlice';
import gaSlice from '../slice/appSlice/gaSlice';

export const rootReducer = combineReducers({
  classes: classesSlice,
  user: userSlice,
  admin: adminSlice,
  ga: gaSlice,
});
