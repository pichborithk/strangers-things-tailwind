import { useEffect, useState } from 'react';
import { Home, Navbar, Posts, Registration, SignIn } from './components';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Post } from './types/types';
import { fetchAllPosts } from './api/auth';

const initialToken = localStorage.getItem('TOKEN');

function App() {
  const [token, setToken] = useState<string | null>(initialToken);
  const [isLogin, setIsLogin] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  async function getPosts(): Promise<void> {
    const result = await fetchAllPosts();
    setPosts(result);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} setToken={setToken} />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/posts' element={<Posts posts={posts} />} />
        <Route
          path='/signin'
          element={<SignIn setToken={setToken} setIsLogin={setIsLogin} />}
        />
        <Route path='/register' element={<Registration />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
