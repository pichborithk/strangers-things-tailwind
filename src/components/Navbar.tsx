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
    <header className='absolute top-0 w-full bg-white'>
      <section className='mx-auto flex max-w-6xl items-center justify-between p-2'>
        <img src={logo} alt='logo web site' className='max-h-20' />
        <nav className='nav-link  flex gap-6 text-2xl font-bold text-red-500'>
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
        </nav>
      </section>
    </header>
  );
};

export default Navbar;
