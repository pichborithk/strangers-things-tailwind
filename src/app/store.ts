import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import tokenReducer from './tokenSlice';
import postsReducer from './postsSlice';
import userDataReducer from './userDataSlice';

const store = configureStore({
  reducer: {
    tokenReducer: tokenReducer,
    postsReducer: postsReducer,
    userDataReducer: userDataReducer,
  },
});

export default store;

/* ------------------------- Create Custom Hook To Work With TypeScript ------------------------- */
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
