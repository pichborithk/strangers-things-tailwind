import { Link } from 'react-router-dom';

type NavbarProps = {
  isLogin: boolean;
};

const Navbar = ({ isLogin }: NavbarProps) => {
  return (
    <nav className='navbar'>
      <p>Stranger's Things</p>
      <div className='nav-link'>
        <Link to='/'>Home</Link>
        <Link to='/posts'>Posts</Link>
        {isLogin ? (
          <>
            <Link to='/profile'>Profile</Link>
            <Link to='/'></Link>
          </>
        ) : (
          <Link to='/signin'>Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
