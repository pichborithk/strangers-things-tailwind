import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';
import { useAppDispatch, useAppSelector } from '../app/store';
import { getPosts } from '../app/postsSlice';
import { clearUserData, getUserData } from '../app/userDataSlice';
import { useEffect, useState } from 'react';

const Root = () => {
  const dispatch = useAppDispatch();

  const token = useAppSelector(state => state.tokenReducer.token);
  const posts = useAppSelector(state => state.postsReducer.posts);
  const userData = useAppSelector(state => state.userDataReducer.userData);

  const [openUser, setOpenUser] = useState(false);

  useEffect(() => {
    dispatch(getPosts());
    if (!token) {
      dispatch(clearUserData());
      return;
    } else {
      dispatch(getUserData(token));
    }
  }, [token]);

  function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }

  return (
    <main onClick={() => setOpenUser(false)} className='min-h-screen py-28'>
      <Navbar
        token={token}
        openUser={openUser}
        setOpenUser={setOpenUser}
        userData={userData}
      />
      <Outlet context={{ token, posts, userData }} />
      <div
        onClick={toggleDarkMode}
        className='fixed bottom-[5%] right-[5%] z-10 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-4xl text-secondary transition-colors duration-500 ease-in-out hover:scale-110 dark:bg-secondary'
      >
        <i
          className={`fa-solid fa-sharp fa-sun absolute opacity-0 transition-all duration-1000 ease-in-out dark:rotate-[720deg]  dark:text-primary dark:opacity-100`}
        ></i>
        <i
          className={`fa-solid fa-moon absolute transition-all duration-1000 ease-in-out dark:rotate-[720deg]  dark:text-primary dark:opacity-0`}
        ></i>
      </div>
    </main>
  );
};

export default Root;
