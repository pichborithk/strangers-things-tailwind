import { Dispatch, SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type HomeProps = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};

const Home = ({ token, setToken }: HomeProps) => {
  const navigate = useNavigate();
  console.log(token);

  useEffect(() => {
    if (!token) navigate('/signin');
  }, [token]);

  return (
    <div className='home'>
      <p>{token}</p>
      <button
        onClick={() => {
          setToken(null);
          localStorage.clear();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Home;
