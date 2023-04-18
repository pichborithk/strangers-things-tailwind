import { useEffect, useState } from 'react';
import { Home, Navbar, Posts, Registration, SignIn } from './components';
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

  async function getUserData(token: string) {
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
        <Route index element={<Home token={token} userData={userData} />} />
        <Route path='/posts' element={<Posts posts={posts} />} />
        <Route
          path='/signin'
          element={<SignIn setToken={setToken} token={token} />}
        />
        <Route path='/register' element={<Registration />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
