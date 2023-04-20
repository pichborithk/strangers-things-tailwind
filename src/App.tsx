import { useEffect, useState } from 'react';
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
import { Post } from './types/types';
import { fetchAllPosts, fetchUserData } from './api/auth';
import { UserData } from './types/classes';

const initialToken: string = localStorage.getItem('TOKEN')
  ? localStorage.getItem('TOKEN')!
  : '';

export const initialUserData = new UserData();

function App() {
  const [token, setToken] = useState(initialToken);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userData, setUserData] = useState(initialUserData);

  async function getPosts(): Promise<void> {
    const result = await fetchAllPosts();
    setPosts(result);
  }

  async function getUserData(token: string): Promise<void> {
    const result = await fetchUserData(token);
    setUserData(result);
  }

  useEffect(() => {
    getPosts();
    if (!token) {
      setUserData(initialUserData);
      return;
    } else {
      getUserData(token);
    }
  }, [token]);

  return (
    <>
      <Navbar token={token} setToken={setToken} setUserData={setUserData} />
      <Routes>
        <Route
          index
          element={<Home posts={posts} userData={userData} token={token} />}
        />
        <Route
          path='/profile'
          element={<Profile token={token} userData={userData} />}
        />
        <Route
          path='/signin'
          element={<SignIn setToken={setToken} token={token} />}
        />
        <Route path='/register' element={<Registration />} />
        <Route
          path='/new'
          element={
            <NewPost
              token={token}
              getPosts={getPosts}
              getUserData={getUserData}
            />
          }
        />
        <Route
          path='/:id'
          element={
            <ViewPost
              posts={posts}
              token={token}
              userData={userData}
              getPosts={getPosts}
              getUserData={getUserData}
            />
          }
        >
          <Route index element={<PostMessages />} />
          <Route
            path='edit'
            element={<EditPost getPosts={getPosts} getUserData={getUserData} />}
          />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
