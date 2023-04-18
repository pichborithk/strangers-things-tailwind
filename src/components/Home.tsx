import { HomeProps } from '../types/types';

const Home = ({ isLogin }: HomeProps) => {
  return (
    <div className='home'>
      <p>Welcome to Stranger's Things</p>
    </div>
  );
};

export default Home;
