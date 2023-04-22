import { Link } from 'react-router-dom';
import { PostCardProps } from '../types/types';

const PostCard = ({ post, token, isOwner }: PostCardProps) => {
  return (
    <div className='post-card'>
      <div>
        <h2 className='post-title'>{post.title}</h2>
        <span>{post.description}</span>
        <p>
          By: {post.author.username}{' '}
          {isOwner && <i className='fa-solid fa-circle-check'></i>}
        </p>

        <p>{post.__v} view(s)</p>
      </div>
      <div className='right-side'>
        <h2>{post.price}</h2>
        <p>{post.location}</p>
        {token && (
          <Link to={`/${post._id}`}>{isOwner ? 'View' : 'Send Message'}</Link>
        )}
      </div>
    </div>
  );
};

export default PostCard;
