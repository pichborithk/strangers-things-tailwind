import { Dispatch, SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type HomeProps = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};

const Home = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) navigate('/signin');
  // }, [token]);

  return (
    <div className='home'>
      <p>Welcome to Stranger's Things</p>
    </div>
  );
};

export default Home;
