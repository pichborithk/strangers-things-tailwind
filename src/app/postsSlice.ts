import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/types';
import { fetchAllPosts } from '../api/auth';

type InitialState = {
  loading: boolean;
  posts: Post[];
};

const initialState: InitialState = {
  loading: false,
  posts: [],
};

const getPosts = createAsyncThunk('posts/getPosts', fetchAllPosts);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      }
    );

    builder.addCase(getPosts.rejected, (state) => {
      state.loading = false;
      state.posts = [];
    });
  },
});

export { getPosts };
export default postsSlice.reducer;
