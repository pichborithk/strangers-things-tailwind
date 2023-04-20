import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { SignInProps } from '../types/types';

const SignIn = ({ setToken, token }: SignInProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failMessage, setFailMessage] = useState('');

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const result = await login({ username, password });
      if (result && result.error) {
        setFailMessage(result.error.message);
        throw result.error;
      }
      if (result && result.data) {
        console.log(result.data.message);
        setToken(result.data.token);
        localStorage.setItem('TOKEN', result.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUsername('');
      setPassword('');
    }
  }

  useEffect(() => {
    if (token) return navigate('/');
  }, [token]);

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
        <span>{failMessage}</span>
      </form>
    </div>
  );
};

export default SignIn;
