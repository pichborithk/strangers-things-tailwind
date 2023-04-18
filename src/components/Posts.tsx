import { PostsProps } from '../types/types';

const Posts = ({ posts }: PostsProps) => {
  console.log(posts);
  return (
    <div className='posts'>
      {posts.map((post) => (
        <div className='post' key={post._id}>
          <h2>{post.title}</h2>
          <span>{post.description}</span>
          <p>{post.price}</p>
          <p>{post.author.username}</p>
          <p>{post.location}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
