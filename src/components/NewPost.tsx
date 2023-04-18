const NewPost = () => {
  return (
    <form className='post-form'>
      <h1>Add New Post</h1>
      <fieldset className='input-fieldset'>
        <label htmlFor='title'>Title</label>
        <input name='title' type='text' required />
      </fieldset>
      <fieldset className='input-fieldset'>
        <label htmlFor='description'>Description</label>
        <input name='description' type='text' required />
      </fieldset>
      <fieldset className='input-fieldset'>
        <label htmlFor='price'>Price</label>
        <input name='price' type='text' required />
      </fieldset>
      <fieldset className='input-fieldset'>
        <label htmlFor='location'>Location</label>
        <input name='location' type='text' required />
      </fieldset>
      <fieldset>
        <input className='check-box' name='deliver' type='checkbox' />
        <label htmlFor='deliver'>Willing to Deliver?</label>
      </fieldset>
      <button>POST</button>
    </form>
  );
};

export default NewPost;
