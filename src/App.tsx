import { useState } from 'react';
import { Home, Registration, SignIn } from './components';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  const [token, setToken] = useState('');

  return (
    <>
      <Routes>
        <Route path='/' element={<Home token={token} />} />
        <Route path='/signin' element={<SignIn />} />
        <Route
          path='/register'
          element={<Registration setToken={setToken} />}
        />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
