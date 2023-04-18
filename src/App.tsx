import { useState } from 'react';
import { Home, Registration, SignIn } from './components';
import { Navigate, Route, Routes } from 'react-router-dom';

const initialToken = localStorage.getItem('TOKEN')
  ? localStorage.getItem('TOKEN')!
  : '';

function App() {
  const [token, setToken] = useState(initialToken);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home token={token} />} />
        <Route path='/signin' element={<SignIn setToken={setToken} />} />
        <Route path='/register' element={<Registration />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
