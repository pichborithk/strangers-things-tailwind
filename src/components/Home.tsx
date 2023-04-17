import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type HomeProps = {
  token: string;
};

const Home = ({ token }: HomeProps) => {
  const navigate = useNavigate();
  console.log(token);

  useEffect(() => {
    if (!token) navigate('/signin');
  }, []);

  return <div>Home</div>;
};

export default Home;
