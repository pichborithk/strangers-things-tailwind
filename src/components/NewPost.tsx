import { FormEvent, useEffect, useRef, useState } from 'react';
import { NewPostProps } from '../types/types';
import { makePost } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/store';
import { getPosts } from '../app/postsSlice';
import { getUserData } from '../app/userDataSlice';

const NewPost = ({ token }: NewPostProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!token) return navigate('/');
  }, [token]);

  return (
    <form className='post-form' onSubmit={handleSubmit}>
      <h1>Add New Post</h1>
      <fieldset className='input-fieldset'>
        <label htmlFor='title' className={title ? 'focus' : ''}>
          Title
        </label>
        <input
          name='title'
          type='text'
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </fieldset>
      <fieldset className='input-fieldset'>
        <label htmlFor='description' className={description ? 'focus' : ''}>
          Description
        </label>
        <input
          name='description'
          type='text'
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </fieldset>
      <fieldset className='input-fieldset'>
        <label htmlFor='price' className={price ? 'focus' : ''}>
          Price
        </label>
        <input
          name='price'
          type='text'
          required
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </fieldset>
      <fieldset className='input-fieldset'>
        <label htmlFor='location' className={location ? 'focus' : ''}>
          Location
        </label>
        <input
          name='location'
          type='text'
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </fieldset>
      <fieldset>
        <input
          className='check-box'
          name='deliver'
          type='checkbox'
          ref={deliverRef}
        />
        <label htmlFor='deliver'>Willing to Deliver?</label>
      </fieldset>
      <button>POST</button>
    </form>
  );
};

export default NewPost;
