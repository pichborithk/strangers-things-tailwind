import { Link } from 'react-router-dom';
import { NavbarProps } from '../types/types';

const Navbar = ({ isLogin, setIsLogin, setToken }: NavbarProps) => {
  function handleSignOut(): void {
    setIsLogin(false);
    setToken(null);
    localStorage.clear();
  }

  return (
    <nav className='navbar'>
      <p>Stranger's Things</p>
      <div className='nav-link'>
        <Link to='/'>Home</Link>
        <Link to='/posts'>Posts</Link>
        {isLogin ? (
          <>
            <Link to='/profile'>Profile</Link>
            <Link to='/' onClick={handleSignOut}>
              Sign Out
            </Link>
          </>
        ) : (
          <Link to='/signin'>Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
