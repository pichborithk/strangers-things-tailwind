import { useState } from 'react';
import { Registration } from './components';

function App() {
  const [token, setToken] = useState('');

  return (
    <>
      <Registration setToken={setToken} />
    </>
  );
}

export default App;
