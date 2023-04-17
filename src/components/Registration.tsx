import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../asset/Join.png';
import { registerUser } from '../api/auth';

type RegistrationProps = {
  setToken: Dispatch<SetStateAction<string>>;
};

const Registration = ({ setToken }: RegistrationProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    registerUser({ username, password });
    setUsername('');
    setPassword('');
  }

  return (
    <div className='register'>
      <form className='form' onSubmit={handleSubmit}>
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
        <span></span>
      </form>
      <img src={logo} alt='join' />
    </div>
  );
};

export default Registration;
