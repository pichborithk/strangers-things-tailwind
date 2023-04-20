import { useNavigate } from 'react-router-dom';
import { ProfileProps } from '../types/types';
import { useEffect } from 'react';

const Profile = ({ token, userData }: ProfileProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/signin');
  }, []);

  if (!userData) return <></>;

  return (
    <div className='profile'>
      <h1>Welcome {userData.username}</h1>
      <div className='active-posts'>
        {userData.posts.map((post) => {
          if (post.active)
            return (
              <div
                className='user-post'
                key={post._id}
                onClick={() => navigate(`/${post._id}`)}
              >
                <h2>{post.title}</h2>
                <span>{post.description}</span>
                <p>{post.price}</p>
                <p>{post.messages.length} message(s)</p>
                <p>{post.__v} view(s)</p>
              </div>
            );
        })}
      </div>
      <div className='inactive-posts'>
        {userData.posts.map((post) => {
          if (!post.active)
            return (
              <div className='user-post' key={post._id}>
                <h2>{post.title}</h2>
                <span>{post.description}</span>
                <p>{post.price}</p>
                <p>{post.messages.length} message(s)</p>
                <p>{post.__v} view(s)</p>
              </div>
            );
        })}
      </div>
      <div className='user-messages'>
        {userData.messages.map((msg) => (
          <div
            key={msg._id}
            className='message'
            onClick={() => navigate(`/${msg.post?._id}`)}
          >
            {msg.fromUser._id === userData._id ? (
              <h2>To: {msg.post?.author.username}</h2>
            ) : (
              <h2>From: {msg.fromUser.username}</h2>
            )}
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
