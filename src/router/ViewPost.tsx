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
    <div className='mx-auto flex max-w-4xl flex-col items-center gap-4'>
      <div className='flex w-full justify-between rounded-md border border-slate-200 bg-white px-12 py-8 shadow-lg transition-colors duration-300 ease-in-out dark:border-slate-700 dark:bg-black dark:text-secondary'>
        <div className='w-1/2'>
          <h2 className='text-2xl text-primary'>{post.title}</h2>
          <span className='font-jura font-bold text-slate-400'>
            {post.description}
          </span>
          {post.author._id === userData._id ? (
            <div className='mt-2'>
              <button
                onClick={() => handleDelete()}
                type='button'
                className='mr-2 rounded-md border-2 border-black px-2 py-1 text-sm hover:bg-black hover:text-secondary dark:border-secondary dark:hover:bg-secondary dark:hover:text-black'
              >
                DELETE
              </button>
              <button
                onClick={() => handleEdit()}
                className={`rounded-md border-2 border-primary px-2 py-1 text-sm text-primary hover:bg-primary hover:text-secondary ${
                  isEditing ? 'bg-primary text-secondary' : ''
                }`}
                disabled={isEditing}
              >
                {isEditing ? 'EDITING' : 'EDIT'}
              </button>
            </div>
          ) : (
            <p className='mt-2'>0 view(s)</p>
          )}
        </div>
        <div className='flex flex-col items-end justify-between'>
          <h2 className='text-2xl'>{post.price}</h2>
          {post.author._id !== userData._id ? (
            <>
              <p>
                {post.willDeliver ? 'Deliver' : 'Pick up'}{' '}
                {post.willDeliver && (
                  <i className='fa-solid fa-circle-check text-checked'></i>
                )}
              </p>
              <p className='font-jura font-bold text-slate-400'>
                {post.location}
              </p>
            </>
          ) : (
            <>
              <p>
                {post.willDeliver ? 'Deliver' : 'Pick up'}{' '}
                {post.willDeliver && (
                  <i className='fa-solid fa-circle-check text-checked'></i>
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
