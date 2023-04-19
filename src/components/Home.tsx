import { Link } from 'react-router-dom';
import { HomeProps } from '../types/types';
import PostCard from './PostCard';

const Home = ({ posts, token, userData }: HomeProps) => {
  return (
    <div className='home'>
      <form>
        <input placeholder='Search' />
        {token && <Link to='/new'>New Post</Link>}
      </form>
      <div className='posts'>
        {posts.map((post) =>
          post.author._id === userData?._id ? (
            <PostCard post={post} token={token} isOwner={true} key={post._id} />
          ) : (
            <PostCard
              post={post}
              token={token}
              isOwner={false}
              key={post._id}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
