import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div>
      <button>
        <Link to='/home'>Sign In</Link>
      </button>
      <button>
        <Link to='/register'>Join Us</Link>
      </button>
    </div>
  );
};

export default SignIn;
