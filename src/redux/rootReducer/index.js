import { combineReducers } from '@reduxjs/toolkit';

import classesSlice from '../slice/apiSlice/classesSlice';

export const rootReducer = combineReducers({
  classesSlice,
});
