import { useEffect, useState } from 'react';
import {
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
import { Post, UserData } from './types/types';
import { fetchAllPosts, fetchUserData } from './api/auth';

const initialToken = localStorage.getItem('TOKEN');

function App() {
  const [token, setToken] = useState<string | null>(initialToken);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

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
      setUserData(null);
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
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
