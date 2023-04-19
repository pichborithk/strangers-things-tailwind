import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Message, ViewPostProps } from '../types/types';
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
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const post = posts ? posts.find((post) => post._id === id) : undefined;

  useEffect(() => {
    if (!token || !posts || !userData) return navigate('/');
    if (post?.author._id === userData?._id) {
      const newMessagesList = userData!.posts!.find(
        (userPost) => userPost._id === id
      )!.messages;
      setMessagesList(newMessagesList);
    }
  }, [token, id]);

  async function handleDelete() {
    const result = await deletePost(id!, token!);
    if (result) {
      getPosts();
      getUserData(token!);
      navigate('/');
    }
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
      <Outlet context={{ token, id, post, messagesList, userData }} />
    </div>
  );
};

export default ViewPost;
