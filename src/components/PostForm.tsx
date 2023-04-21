import { PostFromProps } from '../types/types';

const PostForm = (props: PostFromProps) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    location,
    setLocation,
    deliverRef,
    willDeliver,
  } = props;

  return (
    <>
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
          defaultChecked={willDeliver && true}
        />
        <label htmlFor='deliver'>Willing to Deliver?</label>
      </fieldset>
    </>
  );
};

export default PostForm;
