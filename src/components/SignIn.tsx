import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/store';
import { login, setNotification } from '../app/tokenSlice';
import { SignInProps } from '../types/types';

const SignIn = ({ token }: SignInProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const notification = useAppSelector(
    (state) => state.tokenReducer.notification
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(login({ username, password }));

    setUsername('');
    setPassword('');
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem('TOKEN', token);
      dispatch(setNotification(''));
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    dispatch(setNotification(''));
  }, []);

  return (
    <div className='signin'>
      <form onSubmit={handleSignIn}>
        <h1>Sign In</h1>
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
          <button>Sign In</button>
          <p>
            Forget <a>Username / Password</a>?
          </p>
          <p>
            Don't have an account? <Link to='/register'>Join Us</Link>
          </p>
        </div>
        <span>{notification}</span>
      </form>
    </div>
  );
};

export default SignIn;
