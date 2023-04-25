import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

import logo from '../asset/Join.png';
import { registerUser } from '../api/fetchAPI';
import { useAppDispatch, useAppSelector } from '../app/store';
import { setNotification } from '../app/tokenSlice';
import { RootContext } from '../types/types';

const SignUp = () => {
  const { token } = useOutletContext<RootContext>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const notification = useAppSelector(state => state.tokenReducer.notification);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  async function handleRegister(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (password !== confirmPassword) {
      dispatch(setNotification('Password do not match'));
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      return;
    }

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
      setConfirmPassword('');
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
            autoComplete='off'
            type='text'
            name='username'
            placeholder='Enter Username'
            value={username}
            onChange={event => setUsername(event.target.value)}
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor='password'>Password</label>
          <input
            type={hidePassword ? 'password' : 'text'}
            name='password'
            placeholder='Enter Password'
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
          <i
            className={`fa-solid  ${hidePassword ? 'fa-eye-slash' : 'fa-eye'} ${
              !(password || confirmPassword) && 'hidden'
            }`}
            onClick={() => setHidePassword(!hidePassword)}
          ></i>
        </fieldset>
        <fieldset>
          <label htmlFor='confirm-password'>Password Confirmation</label>
          <input
            type={hidePassword ? 'password' : 'text'}
            name='confirm-password'
            placeholder='Re-enter Password'
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            required
          />
          <i
            className={`fa-solid  ${hidePassword ? 'fa-eye-slash' : 'fa-eye'} ${
              !(password || confirmPassword) && 'hidden'
            }`}
            onClick={() => setHidePassword(!hidePassword)}
          ></i>
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

export default SignUp;
