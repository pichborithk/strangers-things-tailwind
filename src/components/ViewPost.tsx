import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Message, ViewPostProps } from '../types/types';
import { useEffect, useState } from 'react';
import { deletePost } from '../api/auth';
import { useAppDispatch } from '../app/store';
import { getPosts } from '../app/postsSlice';
import { getUserData } from '../app/userDataSlice';

const ViewPost = ({ posts, token, userData }: ViewPostProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const post = posts.find((post) => post._id === id)!;

  useEffect(() => {
    if (!post) return;
    if (post.author._id === userData._id) {
      const newMessagesList = userData.posts.find(
        (userPost) => userPost._id === id
      )!.messages;
      setMessagesList(newMessagesList);
    }
  }, [post]);

  useEffect(() => {
    if (!token) return navigate('/signin');
  }, []);

  if (!posts || !userData || !post) return <></>;

  async function handleDelete() {
    const result = await deletePost(id!, token);
    if (result) {
      dispatch(getPosts());
      dispatch(getUserData(token));
      navigate('/');
    }
  }

  function handleEdit() {
    setIsEditing(true);
    navigate(`/${post._id}/edit`);
  }

  return (
    <div className='post-view'>
      <div className='post'>
        <h2>{post.title}</h2>
        <span>{post.description}</span>
        <p>{post.price}</p>
        {post.author._id !== userData._id && <p>{post.author.username}</p>}
        {post.author._id !== userData._id && <p>{post.location}</p>}
        <p>{post.__v} view(s)</p>
        {post.author._id === userData._id && (
          <div>
            <button
              onClick={() => handleDelete()}
              type='button'
              className='delete-btn'
            >
              DELETE
            </button>
            <button
              onClick={() => handleEdit()}
              className={isEditing ? 'edit-btn active' : 'edit-btn'}
              disabled={isEditing}
            >
              {isEditing ? 'EDITING' : 'EDIT'}
            </button>
          </div>
        )}
      </div>
      <Outlet
        context={{
          token,
          id,
          post,
          messagesList,
          userData,
          isEditing,
          setIsEditing,
        }}
      />
    </div>
  );
};

export default ViewPost;
