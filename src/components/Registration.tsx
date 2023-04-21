import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../asset/Join.png';
import { registerUser } from '../api/auth';
import { useAppDispatch, useAppSelector } from '../app/store';
import { setNotification } from '../app/tokenSlice';
import { RegistrationProps } from '../types/types';

const Registration = ({ token }: RegistrationProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const notification = useAppSelector(
    (state) => state.tokenReducer.notification
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      const result = await registerUser({ username, password });
      if (result && result.error) {
        dispatch(setNotification(result.error.message));
        throw result.error;
      }
      dispatch(setNotification(result!.data!.message));
    } catch (error) {
      console.error('Catch handle register', error);
    } finally {
      setUsername('');
      setPassword('');
    }
  }

  useEffect(() => {
    dispatch(setNotification(''));
    if (token) {
      navigate('/');
    }
  }, []);

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
        <span>{notification}</span>
      </form>
      <img src={logo} alt='join' />
    </div>
  );
};

export default Registration;
