import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { Message, RootContext } from '../types/types';
import { useEffect, useState } from 'react';
import { deletePost } from '../api/fetchAPI';
import { useAppDispatch } from '../app/store';
import { getPosts } from '../app/postsSlice';
import { getUserData } from '../app/userDataSlice';

const ViewPost = () => {
  const { token, posts, userData } = useOutletContext<RootContext>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const post = posts.find(post => post._id === id)!;

  useEffect(() => {
    if (!post) return;
    if (post.author._id === userData._id) {
      const newMessagesList = userData.posts.find(
        userPost => userPost._id === id
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
        <div>
          <h2 className='post-title'>{post.title}</h2>
          <span>{post.description}</span>
          {post.author._id === userData._id ? (
            <div className='buttons'>
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
          ) : (
            <p>0 view(s)</p>
          )}
        </div>
        <div className='right-side'>
          <h2>{post.price}</h2>
          {post.author._id !== userData._id ? (
            <>
              <p>
                {post.willDeliver ? 'Deliver' : 'Pick up'}{' '}
                {post.willDeliver && (
                  <i className='fa-solid fa-circle-check'></i>
                )}
              </p>
              <p>{post.location}</p>
            </>
          ) : (
            <>
              <p>
                {post.willDeliver ? 'Deliver' : 'Pick up'}{' '}
                {post.willDeliver && (
                  <i className='fa-solid fa-circle-check'></i>
                )}
              </p>
              <p>0 view(s)</p>
            </>
          )}
        </div>
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
