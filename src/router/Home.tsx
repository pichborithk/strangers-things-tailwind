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
    <div className='home'>
      <form>
        <input
          placeholder='Search'
          value={keyword}
          onChange={event => setKeyword(event.target.value)}
        />
        {token && <Link to='/new'>New Post</Link>}
      </form>
      <div className='posts'>
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
