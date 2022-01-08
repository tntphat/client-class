import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiAdmin } from '../../../services/apiAdmin';

export const doCreateAdmin = createAsyncThunk('admin@post/create', async (params) => {
  const result = await apiAdmin.create(params);
  return result.data;
});

export const doLoginAdmin = createAsyncThunk('admin@post/login', async (params) => {
  const result = await apiAdmin.login(params);
  return result.data;
});

export const doGetInforAdmin = createAsyncThunk('admin@get/getInforAdmin', async () => {
  const result = await apiAdmin.getInforAdmin();
  return result.data;
});

export const doGetAllAdmins = createAsyncThunk('admin@get/getAllAdmins', async () => {
  const result = await apiAdmin.getAllAdmins();
  return result.data;
});

export const doGetAllUsers = createAsyncThunk('admin@get/getAllUsers', async () => {
  const result = await apiAdmin.getAllUsers();
  return result.data;
});

export const doBanUser = createAsyncThunk('admin@get/banUser', async (params) => {
  const result = !params.isBanned
    ? await apiAdmin.banUser(params.id)
    : await apiAdmin.unBanUser(params.id);

  return result.data;
});

export const doGetAllClasses = createAsyncThunk('admin@get/getAllClasses', async () => {
  const result = await apiAdmin.getAllClasses();
  return result.data;
});

const initialState = {
  isLoading: false,
  admin: null,
  admins: [],
  users: [],
  classes: [],
  error: null,
};

const slice = createSlice({
  name: 'admin@',
  initialState: initialState,
  reducers: {
    doClearErrors(state, action) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //create
    builder.addCase(doCreateAdmin.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(doCreateAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.admins = [...state.admins, action.payload];
    });
    builder.addCase(doCreateAdmin.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    //login
    builder.addCase(doLoginAdmin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(doLoginAdmin.fulfilled, (state, action) => {
      // state.user = action.payload.content.user;
      state.isLoading = false;
    });
    builder.addCase(doLoginAdmin.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    //GetInforUser
    builder.addCase(doGetInforAdmin.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(doGetInforAdmin.fulfilled, (state, action) => {
      state.admin = action.payload;
      state.isLoading = false;
    });
    builder.addCase(doGetInforAdmin.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    //GetAllAdmins
    builder.addCase(doGetAllAdmins.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(doGetAllAdmins.fulfilled, (state, action) => {
      state.admins = action.payload;
      state.isLoading = false;
    });
    builder.addCase(doGetAllAdmins.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    //GetAllUsers
    builder.addCase(doGetAllUsers.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(doGetAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(doGetAllUsers.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    //BanUser
    builder.addCase(doBanUser.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(doBanUser.fulfilled, (state, action) => {
      let count = 0;
      for (let i = 0; i < state.users.length; ++i) {
        if (count === action.payload.length) break;
        const ind = action.payload.findIndex((user) => user.id === state.users[i].id);
        if (ind > -1) {
          ++count;
          state.users[i] = action.payload[ind];
        }
      }
      state.users = [...state.users];
      state.isLoading = false;
    });
    builder.addCase(doBanUser.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    //GetAllClasses
    builder.addCase(doGetAllClasses.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(doGetAllClasses.fulfilled, (state, action) => {
      state.classes = action.payload;
      state.isLoading = false;
    });
    builder.addCase(doGetAllClasses.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});
const { reducer: userReducer, actions } = slice;

export default userReducer;

export const { doClearErrors } = actions;
