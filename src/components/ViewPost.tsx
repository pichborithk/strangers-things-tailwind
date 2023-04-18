import { Link, useNavigate, useParams } from 'react-router-dom';
import { Post, ViewPostProps } from '../types/types';
import { useEffect, useState } from 'react';

const ViewPost = ({ posts, token, userData }: ViewPostProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!token) navigate('/');
    setPost(posts.find((post) => post._id === id)!);
  }, [token, id]);

  return (
    <div className='post-view'>
      <div className='post'>
        <h2>{post?.title}</h2>
        <span>{post?.description}</span>
        <p>{post?.price}</p>
        {post?.author._id !== userData?._id && <p>{post?.author.username}</p>}
        {post?.author._id !== userData?._id && <p>{post?.location}</p>}
        <p>{post?.__v} view(s)</p>
        {post?.author._id === userData?._id && (
          <div>
            <button>DELETE</button>
            <Link to={`/${post?._id}/edit`}>EDIT</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPost;
