import { Link, useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { PostCard } from '../components';
import { useEffect, useState } from 'react';

const Home = () => {
  const { token, posts, userData } = useOutletContext<RootContext>();
  const [keyword, setKeyword] = useState('');
  const [postsFiltered, setPostsFiltered] = useState(posts);

  useEffect(() => {
    if (!posts) return;
    const newPosts = posts.filter(
      post =>
        post.title.toLowerCase().includes(keyword.toLocaleLowerCase()) ||
        keyword === ''
    );
    newPosts.sort((prevPost, nextPost) => {
      const prevPostDate = new Date(prevPost.updatedAt);
      const nextPostDate = new Date(nextPost.updatedAt);
      return nextPostDate.getTime() - prevPostDate.getTime();
    });
    setPostsFiltered(newPosts);
  }, [keyword, posts]);

  // useEffect(() => {
  //   console.log(postsFiltered);
  // }, [postsFiltered]);

  return (
    <div>
      <form className='mx-auto flex max-w-6xl items-center gap-4 text-xl'>
        <input
          placeholder='Search'
          value={keyword}
          onChange={event => setKeyword(event.target.value)}
          className='flex-1 border-2 border-slate-400 px-4 py-2 focus:border-dashed focus:border-primary focus:outline-none'
        />
        {token && (
          <Link
            to='/new'
            className='border-2 border-primary px-4 py-2 text-primary hover:bg-primary hover:text-secondary'
          >
            New Post
          </Link>
        )}
      </form>
      <div className='mx-auto mt-4 flex max-w-6xl flex-col gap-2'>
        {postsFiltered.map(post => (
          <PostCard
            post={post}
            token={token}
            isOwner={post.author._id === userData._id}
            key={post._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
