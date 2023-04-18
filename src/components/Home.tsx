import { HomeProps } from '../types/types';

const Home = ({ posts }: HomeProps) => {
  return (
    <div className='posts'>
      {posts.map((post) => (
        <div className='post' key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.__v} view(s)</p>
          <span>{post.description}</span>
          <p>{post.price}</p>
          <p>{post.author.username}</p>
          <p>{post.location}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
