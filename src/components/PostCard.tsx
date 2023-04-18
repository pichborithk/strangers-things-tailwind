import { Link } from 'react-router-dom';
import { PostCardProps } from '../types/types';

const PostCard = ({ post, token, isOwner }: PostCardProps) => {
  return (
    <div className='post-card' key={post._id}>
      <h2>{post.title}</h2>
      <p>{post.__v} view(s)</p>
      <span>{post.description}</span>
      <p>{post.price}</p>
      <p>{post.author.username}</p>
      <p>{post.location}</p>
      {token && (
        <Link to={`/${post._id}`}>{isOwner ? 'View' : 'Send Message'}</Link>
      )}
    </div>
  );
};

export default PostCard;
