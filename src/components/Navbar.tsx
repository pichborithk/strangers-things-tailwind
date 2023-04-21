import { Link } from 'react-router-dom';

import { useAppDispatch } from '../app/store';
import { setToken } from '../app/tokenSlice';
import { clearUserData } from '../app/userDataSlice';

const Navbar = ({ token }: { token: string }) => {
  const dispatch = useAppDispatch();

  function handleSignOut(): void {
    dispatch(setToken(''));
    localStorage.clear();
    dispatch(clearUserData());
  }

  return (
    <nav className='navbar'>
      <p>Stranger's Things</p>
      <div className='nav-link'>
        <Link to='/'>HOME</Link>
        {token ? (
          <>
            <Link to='/profile'>PROFILE</Link>
            <Link to='/' onClick={handleSignOut}>
              SIGN OUT
            </Link>
          </>
        ) : (
          <>
            <Link to='/register'>SIGN UP</Link>
            <Link to='/signin'>SIGN IN</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
