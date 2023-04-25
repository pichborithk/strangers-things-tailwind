import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserData } from '../api/fetchAPI';
import { UserData } from '../types/types';

const initialUserData = {
  _id: '',
  username: '',
  posts: [],
  messages: [],
};

type InitialState = {
  loading: boolean;
  userData: UserData;
};

const initialState: InitialState = {
  loading: false,
  userData: initialUserData,
};

const getUserData = createAsyncThunk('userData/getUserData', fetchUserData);

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    clearUserData(state) {
      state.userData = initialUserData;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserData.pending, state => {
      state.loading = true;
    });

    builder.addCase(
      getUserData.fulfilled,
      (state, action: PayloadAction<UserData | void>) => {
        state.loading = false;
        state.userData = action.payload ? action.payload : initialUserData;
      }
    );

    builder.addCase(getUserData.rejected, state => {
      state.loading = false;
      state.userData = initialUserData;
    });
  },
});

export const { clearUserData } = userDataSlice.actions;
export { getUserData };
export default userDataSlice.reducer;
