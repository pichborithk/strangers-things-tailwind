import { HomeProps } from '../types/types';

const Home = ({ token, userData }: HomeProps) => {
  return (
    <div className='home'>
      <h1>Welcome to Stranger's Things</h1>
      {token && userData && <h2>{`Logged in as ${userData.username}`}</h2>}
    </div>
  );
};

export default Home;
