import { FormEvent, useEffect, useRef, useState } from 'react';
import { RootContext } from '../types/types';
import { makePost } from '../api/fetchAPI';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useAppDispatch } from '../app/store';
import { getPosts } from '../app/postsSlice';
import { getUserData } from '../app/userDataSlice';
import { PostForm } from '../components';

const NewPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token } = useOutletContext<RootContext>();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const deliverRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const dataObj = location
      ? {
          title,
          description,
          price,
          location,
          willDeliver: deliverRef.current!.checked,
        }
      : { title, description, price, willDeliver: deliverRef.current!.checked };
    try {
      const result = await makePost(dataObj, token);
      if (result && result.error) {
        throw result.error;
      }
      if (result && result.data) {
        console.log(result.data);
        dispatch(getPosts());
        dispatch(getUserData(token));
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTitle('');
      setDescription('');
      setPrice('');
      setLocation('');
    }
  }

  function handleCancel() {
    setTitle('');
    setDescription('');
    setPrice('');
    setLocation('');
    navigate('/');
  }

  useEffect(() => {
    if (!token) return navigate('/');
  }, [token]);

  return (
    <form className='post-form' onSubmit={handleSubmit}>
      <h1>Add New Post</h1>
      <PostForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        price={price}
        setPrice={setPrice}
        location={location}
        setLocation={setLocation}
        deliverRef={deliverRef}
        willDeliver={false}
      />
      <div className='buttons'>
        <button>POST</button>
        <button type='button' onClick={() => handleCancel()} className='cancel'>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewPost;
