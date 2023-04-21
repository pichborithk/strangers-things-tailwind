import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ViewPostContext } from '../types/types';
import { updatePost } from '../api/fetchAPI';
import { useAppDispatch } from '../app/store';
import { getPosts } from '../app/postsSlice';
import { getUserData } from '../app/userDataSlice';
import { PostForm } from '../components';

const EditPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id, post, token, isEditing, setIsEditing } =
    useOutletContext<ViewPostContext>();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const deliverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) return navigate(`/${id}`);

    setTitle(post.title);
    setDescription(post.description);
    setPrice(post.price);
    setLocation(post.location);
  }, []);

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

    const result = await updatePost(id!, token, dataObj);
    if (result) {
      dispatch(getPosts());
      dispatch(getUserData(token));
      setIsEditing(false);
      navigate(`/${id}`);
    }
  }

  function handleCancel() {
    setIsEditing(false);
    navigate('..');
  }

  return (
    <form className='post-form' onSubmit={handleSubmit}>
      <h1>Edit Post</h1>
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
        willDeliver={post.willDeliver}
      />
      <div className='buttons'>
        <button>SAVE</button>
        <button type='button' onClick={() => handleCancel()} className='cancel'>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditPost;
