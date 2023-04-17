import logo from '../asset/Join.png';

const Registration = () => {
  return (
    <div className='register'>
      <form className='form'>
        <h1>Create An Account</h1>
        <fieldset>
          <label htmlFor='username'>Username</label>

          <input type='text' name='username' placeholder='Enter Username' />
        </fieldset>
        <fieldset>
          <label htmlFor='password'>Password</label>
          <input type='text' name='password' placeholder='Enter Password' />
        </fieldset>
        <div>
          <button>Create Account</button>
          <p>
            Already Have An Account? <a href='#'>Sign in</a>
          </p>
        </div>
      </form>
      <img src={logo} alt='join' />
    </div>
  );
};

export default Registration;
