import './App.css';
import { useEffect, useState } from 'react';
import fetchData from './services/blog';
import PostList from './components/PostList';

function App() {
  const [posts, setPosts] = useState([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState()

  const getPost = () => {
    setIsLoading(true)

    fetchData()
      .then((newPosts) => {
        setIsLoading(false)
        setPosts(newPosts)
      })
      .catch((error) => {
        setHasError(true)
      })
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <>
      {!hasError && !isLoading && <PostList posts={posts}/>}
      {hasError && <h2>Failed to load posts.</h2>}
      {isLoading && <h2>Loading posts...</h2>}
    </>
  );
}

export default App;
