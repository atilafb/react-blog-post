import Axios from 'axios'
import { useState } from 'react';
import Post from './Post'

function PostList() {
  const [posts, setPosts] = useState([])

  const getPost = () => {
    Axios.get("https://jsonplaceholder.typicode.com/posts?_start=0&_end=20").then((response) => {
      console.log(response.data)
      setPosts(response.data.map((post) =>
        <Post key={post.id} post={post} />
      ))
    })
  }

  return (
    <>
      <button onClick={getPost}>Get Posts</button>
      {posts}
    </>
  );
}


export default PostList;
