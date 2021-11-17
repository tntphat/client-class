import { combineReducers } from '@reduxjs/toolkit';

import classesSlice from '../slice/apiSlice/classesSlice';
import userSlice from '../slice/apiSlice/userSlice';

export const rootReducer = combineReducers({
  classes: classesSlice,
  user: userSlice,
});
