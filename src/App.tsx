import { useState } from 'react';
import { Home, Navbar, Posts, Registration, SignIn } from './components';
import { Navigate, Route, Routes } from 'react-router-dom';

const initialToken = localStorage.getItem('TOKEN');

function App() {
  const [token, setToken] = useState<string | null>(initialToken);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Navbar isLogin={isLogin} />
      <Routes>
        <Route index element={<Home token={token} setToken={setToken} />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/signin' element={<SignIn setToken={setToken} />} />
        <Route path='/register' element={<Registration />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
