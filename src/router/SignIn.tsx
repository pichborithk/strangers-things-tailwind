import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/store';
import { login, setNotification } from '../app/tokenSlice';
import { RootContext } from '../types/types';

const SignIn = () => {
  const { token } = useOutletContext<RootContext>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const notification = useAppSelector(state => state.tokenReducer.notification);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

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
    <div className='signin mx-auto flex h-screen max-w-6xl items-center justify-center'>
      <form
        onSubmit={handleSignIn}
        className='flex w-1/2 flex-col items-center justify-evenly gap-12 rounded-2xl border border-solid border-red-100 px-20 py-12 text-xl text-red-500 shadow-md'
      >
        <h1>Sign In</h1>
        <fieldset className='flex w-full flex-col'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            placeholder='Enter Username'
            value={username}
            onChange={event => setUsername(event.target.value)}
            required
            className='rounded-md border border-solid border-slate-300 px-4 py-2 focus:outline-red-500'
          />
        </fieldset>
        <fieldset className='flex w-full flex-col'>
          <label htmlFor='password'>Password</label>
          <input
            type={hidePassword ? 'password' : 'text'}
            name='password'
            placeholder='Enter Password'
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
            className='rounded-md border border-solid border-slate-300 px-4 py-2 focus:outline-red-500'
          />
          <i
            className={`fa-solid  ${hidePassword ? 'fa-eye-slash' : 'fa-eye'} ${
              !password && 'hidden'
            }`}
            onClick={() => setHidePassword(!hidePassword)}
          ></i>
        </fieldset>
        <div className='w-3/4 text-center'>
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
