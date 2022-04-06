import { useEffect, useState } from 'react';
import fetchData from '../services/request';
import Post from './Post'

function PostList() {
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
    <>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />
      })}
    </>
  );
}


export default PostList;
