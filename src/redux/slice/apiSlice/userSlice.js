import { apiUser, apiAuth } from '../../../services/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const doCreateUser = createAsyncThunk('user@post/createUser', async (params) => {
  const result = await apiAuth.register(params);
  return result.data;
});

export const doLogin = createAsyncThunk('user@post/login', async (params) => {
  const result = await apiAuth.login(params);
  return result.data;
});

export const doAuthSocial = createAsyncThunk('user@post/authSocial', async (params) => {
  const result = await apiAuth.socialLogin(params);
  return result.data;
});

export const doGetInforUser = createAsyncThunk('user@get/getInforUser', async () => {
  const result = await apiUser.getInforUser();
  return result.data;
});

const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

const slice = createSlice({
  name: 'user@',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //create user
    builder.addCase(doCreateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(doCreateUser.fulfilled, (state, action) => {
      // state.user = action.payload.content.user;
      state.isLoading = false;
    });
    builder.addCase(doCreateUser.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    //login
    builder.addCase(doLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(doLogin.fulfilled, (state, action) => {
      // state.user = action.payload.content.user;
      state.isLoading = false;
    });
    builder.addCase(doLogin.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    //authSocial
    builder.addCase(doAuthSocial.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(doAuthSocial.fulfilled, (state, action) => {
      // state.user = action.payload.content.user;
      state.isLoading = false;
    });
    builder.addCase(doAuthSocial.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    //GetInforUser
    builder.addCase(doGetInforUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(doGetInforUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(doGetInforUser.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});
const { reducer: userReducer } = slice;

export default userReducer;
