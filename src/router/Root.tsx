import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';
import { useAppDispatch, useAppSelector } from '../app/store';
import { getPosts } from '../app/postsSlice';
import { clearUserData, getUserData } from '../app/userDataSlice';
import { useEffect } from 'react';

const Root = () => {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.tokenReducer.token);
  const posts = useAppSelector((state) => state.postsReducer.posts);
  const userData = useAppSelector((state) => state.userDataReducer.userData);

  useEffect(() => {
    dispatch(getPosts());
    if (!token) {
      dispatch(clearUserData());
      return;
    } else {
      dispatch(getUserData(token));
    }
  }, [token]);

  return (
    <>
      <Navbar />
      <Outlet context={{ token, posts, userData }} />
    </>
  );
};

export default Root;
