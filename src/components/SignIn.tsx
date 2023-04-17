import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failMessage, setFailMessage] = useState('');

  return (
    <div className='signin'>
      <form action=''>
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
          <button>
            <Link to='/home'>Sign In</Link>
          </button>
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
