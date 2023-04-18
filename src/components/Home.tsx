import { Link } from 'react-router-dom';
import { HomeProps } from '../types/types';
import PostCard from './PostCard';

const Home = ({ posts, token, userData }: HomeProps) => {
  return (
    <div className='home'>
      <form>
        <input placeholder='Search' />
        <Link to='/new'>New Post</Link>
      </form>
      <div className='posts'>
        {posts.map((post) =>
          post.author._id === userData?._id ? (
            <PostCard post={post} token={token} isOwner={true} />
          ) : (
            <PostCard post={post} token={token} isOwner={false} />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
