import { useNavigate } from 'react-router-dom';
import { ProfileProps } from '../types/types';
import { useEffect } from 'react';

const Profile = ({ token, userData }: ProfileProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userData) navigate('/');
  }, [token, userData]);

  return (
    <div className='profile'>
      <h1>Welcome {userData?.username}</h1>
      {userData?.posts.map((post) => (
        <div className='user-post' key={post._id}>
          <h2>{post.title}</h2>
          <span>{post.description}</span>
          <p>{post.price}</p>
          <p>{post.messages.length} message(s)</p>
          <p>{post.__v} view(s)</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
