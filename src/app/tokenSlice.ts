import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TokenFetch } from '../types/types';
import { fetchTokenLogin } from '../api/fetchAPI';

type InitialState = {
  loading: boolean;
  notification: string;
  token: string;
};

const initialState: InitialState = {
  loading: false,
  notification: '',
  token: localStorage.getItem('TOKEN') ? localStorage.getItem('TOKEN')! : '',
};

const login = createAsyncThunk('token/login', fetchTokenLogin);

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setNotification(state, action: PayloadAction<string>) {
      state.notification = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
    });

    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<TokenFetch | void>) => {
        state.loading = false;
        state.notification = action.payload!.success
          ? action.payload!.data!.message
          : action.payload!.error!.message;
        state.token = action.payload!.success
          ? action.payload!.data!.token
          : '';
      }
    );

    builder.addCase(login.rejected, state => {
      state.loading = false;
      state.notification = 'Something wrong wrong, Please try again!!!';
      state.token = '';
    });
  },
});

export const { setToken, setNotification } = tokenSlice.actions;
export { login };
export default tokenSlice.reducer;
