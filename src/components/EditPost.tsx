import { useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { EditPostContext } from '../types/types';

const EditPost = () => {
  const navigate = useNavigate();
  const { post } = useOutletContext<EditPostContext>();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const deliverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!post) {
      navigate('/');
      return;
    }
    setTitle(post.title);
    setDescription(post.description);
    setPrice(post.price);
    setLocation(post.location);
  }, []);

  return (
    <form
      className='post-form'
      // onSubmit={handleSubmit}
    >
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
          defaultChecked={post?.willDeliver ? true : false}
        />
        <label htmlFor='deliver'>Willing to Deliver?</label>
      </fieldset>
      <button>SAVE</button>
    </form>
  );
};

export default EditPost;
