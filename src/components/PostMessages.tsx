import { FormEvent, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { postMessage } from '../api/auth';
import { PostMessagesContext } from '../types/types';

const PostMessages = () => {
  const { token, id, post, messagesList, userData } =
    useOutletContext<PostMessagesContext>();
  const [message, setMessage] = useState('');

  async function handleSubmitMessage(event: FormEvent) {
    event.preventDefault();
    const result = await postMessage(id!, token, message);
    if (result) setMessage('');
  }

  return (
    <>
      {post.author._id === userData._id &&
        (messagesList.length ? (
          <h2>Messages For You</h2>
        ) : (
          <h2>There Is No Message</h2>
        ))}
      {messagesList &&
        messagesList.map((msg) => (
          <div key={msg._id} className='message'>
            <h2>From: {msg.fromUser.username}</h2>
            <p>{msg.content}</p>
          </div>
        ))}
      {post.author._id !== userData._id && (
        <form className='messages-form' onSubmit={handleSubmitMessage}>
          <fieldset>
            <input
              placeholder='Send a message'
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
            {message && (
              <button>
                <i className='fa-sharp fa-solid fa-share fa-rotate-180'></i>
              </button>
            )}
          </fieldset>
        </form>
      )}
    </>
  );
};

export default PostMessages;
