import { Link, useNavigate, useParams } from 'react-router-dom';
import { Post, ViewPostProps } from '../types/types';
import { FormEvent, useEffect, useState } from 'react';
import { deletePost, postMessage } from '../api/auth';

const ViewPost = ({
  posts,
  token,
  userData,
  getPosts,
  getUserData,
}: ViewPostProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) navigate('/');
    setPost(posts.find((post) => post._id === id)!);
  }, [token, id]);

  async function handleDelete() {
    const result = await deletePost(id!, token!);
    if (result) {
      getPosts();
      getUserData(token!);
      navigate('/');
    }
  }

  async function handleSubmitMessage(event: FormEvent) {
    event.preventDefault();
    const result = await postMessage(id!, token!, message);
    console.log(result);
  }

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
            <button onClick={() => handleDelete()} type='button'>
              DELETE
            </button>
            <Link to={`/${post?._id}/edit`}>EDIT</Link>
          </div>
        )}
      </div>
      {post?.author._id !== userData?._id && (
        <form className='messages-form' onSubmit={handleSubmitMessage}>
          <fieldset>
            <input
              placeholder='Write a comment'
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
            {message && (
              <button>
                <i className='fa-sharp fa-solid fa-share fa-rotate-180'></i>
              </button>
            )}
          </fieldset>
        </form>
      )}
    </div>
  );
};

export default ViewPost;
