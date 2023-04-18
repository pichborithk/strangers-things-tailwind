import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../asset/Join.png';
import { registerUser } from '../api/auth';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failMessage, setFailMessage] = useState('');

  async function handleRegister(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      const result = await registerUser({ username, password });
      if (result && result.error) {
        setFailMessage(result.error.message);
        throw result.error;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUsername('');
      setPassword('');
    }
  }

  return (
    <div className='register'>
      <form className='form' onSubmit={handleRegister}>
        <h1>Create An Account</h1>
        <fieldset>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            placeholder='Enter Username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            name='password'
            placeholder='Enter Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </fieldset>
        <div>
          <button>Create Account</button>
          <p>
            Already Have An Account? <Link to='/signin'>Sign in</Link>
          </p>
        </div>
        <span>{failMessage}</span>
      </form>
      <img src={logo} alt='join' />
    </div>
  );
};

export default Registration;
