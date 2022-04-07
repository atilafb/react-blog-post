import './App.css';
import { useEffect, useState } from 'react';
import fetchData from './services/request';
import PostList from './components/PostList';

function App() {
  const [posts, setPosts] = useState([])

  const getPost = () => {
    fetchData()
      .then((response) => {
        setPosts(response)
      })
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <PostList posts={posts}/>
  );
}

export default App;
