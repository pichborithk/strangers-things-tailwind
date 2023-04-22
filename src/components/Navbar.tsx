import { Link } from 'react-router-dom';

import { useAppDispatch } from '../app/store';
import { setToken } from '../app/tokenSlice';
import { clearUserData } from '../app/userDataSlice';
import logo from "../asset/stranger's things.png";

const Navbar = ({ token }: { token: string }) => {
  const dispatch = useAppDispatch();

  function handleSignOut(): void {
    dispatch(setToken(''));
    localStorage.clear();
    dispatch(clearUserData());
  }

  return (
    <nav className='navbar'>
      <img src={logo} alt='logo web site' />
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
