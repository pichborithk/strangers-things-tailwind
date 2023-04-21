import { useEffect } from 'react';
import {
  EditPost,
  Home,
  Navbar,
  NewPost,
  PostMessages,
  Profile,
  Registration,
  SignIn,
  ViewPost,
} from './components';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/store';
import { getPosts } from './app/postsSlice';
import { clearUserData, getUserData } from './app/userDataSlice';

function App() {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.tokenReducer.token);
  const posts = useAppSelector((state) => state.postsReducer.posts);
  const userData = useAppSelector((state) => state.userDataReducer.userData);

  // async function getPosts(): Promise<void> {
  //   const result = await fetchAllPosts();
  //   setPosts(result);
  // }

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
      <Routes>
        <Route
          index
          element={<Home posts={posts} userData={userData} token={token} />}
        />
        <Route
          path='/profile'
          element={<Profile userData={userData} token={token} />}
        />
        <Route path='/signin' element={<SignIn token={token} />} />
        <Route path='/register' element={<Registration token={token} />} />
        <Route path='/new' element={<NewPost token={token} />} />
        <Route
          path='/:id'
          element={<ViewPost posts={posts} token={token} userData={userData} />}
        >
          <Route index element={<PostMessages />} />
          <Route path='edit' element={<EditPost />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
