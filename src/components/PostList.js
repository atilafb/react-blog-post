import Post from './Post'

function PostList({ posts }) {
  return (
    posts.map((post) => {
      return <Post key={post.id} post={post} />
    })
  );
}


export default PostList;
