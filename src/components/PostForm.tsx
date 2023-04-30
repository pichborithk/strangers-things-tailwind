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
      <fieldset className='group relative flex w-full flex-col'>
        <label
          htmlFor='title'
          className={`pointer-events-none absolute left-4 top-2 bg-white px-2 transition-all duration-300 ease-in-out focus-within:text-primary group-focus-within:-translate-x-1 group-focus-within:-translate-y-5 group-focus-within:text-base group-focus-within:text-primary  dark:bg-black dark:text-secondary dark:group-focus-within:text-secondary
          ${title && '-translate-x-1 -translate-y-5 text-base text-primary'}`}
        >
          Title
        </label>
        <input
          name='title'
          type='text'
          required
          value={title}
          onChange={event => setTitle(event.target.value)}
          className='rounded-md border border-solid border-slate-500 px-4 py-2 transition-colors duration-300 ease-in-out focus:outline-red-500 dark:bg-black dark:text-secondary dark:focus:outline-secondary'
        />
      </fieldset>
      <fieldset className='group relative flex w-full flex-col'>
        <label
          htmlFor='description'
          className={`pointer-events-none absolute left-4 top-2 bg-white px-2 transition-all duration-300  ease-in-out focus-within:text-primary    
           group-focus-within:-translate-x-1 group-focus-within:-translate-y-5 group-focus-within:text-base group-focus-within:text-primary dark:bg-black dark:text-secondary dark:group-focus-within:text-secondary
          ${
            description &&
            '-translate-x-1 -translate-y-5 text-base text-primary'
          }`}
        >
          Description
        </label>
        <input
          name='description'
          type='text'
          required
          value={description}
          onChange={event => setDescription(event.target.value)}
          className='rounded-md border border-slate-500 px-4 py-2 transition-colors duration-300 ease-in-out focus:outline-red-500 dark:bg-black dark:text-secondary dark:focus:outline-secondary'
        />
      </fieldset>
      <fieldset className='group relative flex w-full flex-col'>
        <label
          htmlFor='price'
          className={`pointer-events-none absolute left-4 top-2 bg-white px-2 transition-all duration-300   ease-in-out focus-within:text-primary    
           group-focus-within:-translate-x-1 group-focus-within:-translate-y-5 group-focus-within:text-base group-focus-within:text-primary dark:bg-black dark:text-secondary dark:group-focus-within:text-secondary
          ${price && '-translate-x-1 -translate-y-5 text-base text-primary'}`}
        >
          Price
        </label>
        <input
          name='price'
          type='text'
          required
          value={price}
          onChange={event => setPrice(event.target.value)}
          className='rounded-md border border-solid border-slate-500 px-4 py-2 transition-colors duration-300 ease-in-out focus:outline-red-500 dark:bg-black dark:text-secondary dark:focus:outline-secondary'
        />
      </fieldset>
      <fieldset className='group relative flex w-full flex-col'>
        <label
          htmlFor='location'
          className={`pointer-events-none absolute left-4 top-2 bg-white px-2 transition-all duration-300   ease-in-out focus-within:text-primary    
           group-focus-within:-translate-x-1 group-focus-within:-translate-y-5 group-focus-within:text-base group-focus-within:text-primary dark:bg-black dark:text-secondary dark:group-focus-within:text-secondary
          ${
            location && '-translate-x-1 -translate-y-5 text-base text-primary'
          }`}
        >
          Location
        </label>
        <input
          name='location'
          type='text'
          value={location}
          onChange={event => setLocation(event.target.value)}
          className='rounded-md border border-solid border-slate-500 px-4 py-2 transition-colors duration-300 ease-in-out focus:outline-red-500 dark:bg-black dark:text-secondary dark:focus:outline-secondary'
        />
      </fieldset>
      <fieldset className='relative flex w-full'>
        <input
          className='peer mr-2 hidden'
          name='deliver'
          id='deliver'
          type='checkbox'
          ref={deliverRef}
          defaultChecked={willDeliver && true}
        />
        <label
          htmlFor='deliver'
          className='flex-1 cursor-pointer select-none rounded-md border-2  border-slate-500 px-4 py-2 peer-checked:border-primary dark:text-secondary'
        >
          Willing to Deliver?
        </label>
        <i className='fa-solid fa-circle-check absolute right-4 top-3 hidden text-checked peer-checked:inline'></i>
      </fieldset>
    </>
  );
};

export default PostForm;
