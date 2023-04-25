import { Link } from 'react-router-dom';

import { useAppDispatch } from '../app/store';
import { setToken } from '../app/tokenSlice';
import { clearUserData } from '../app/userDataSlice';
import logo from "../asset/stranger's things.png";
import { NavbarProps } from '../types/types';

const Navbar = ({ token, openUser, setOpenUser, userData }: NavbarProps) => {
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
            <p
              onClick={event => {
                event.stopPropagation();
                setOpenUser(!openUser);
              }}
            >
              {userData.username.slice(0, 1).toUpperCase()}
            </p>
            <Link
              to='/'
              onClick={handleSignOut}
              className={openUser ? 'signout active' : 'signout'}
            >
              SIGN OUT
            </Link>
          </>
        ) : (
          <>
            <Link to='/signin'>SIGN IN</Link>
            <Link to='/register' className='signup'>
              SIGN UP
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
