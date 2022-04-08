const Post = ({ post }) => {
  
  return (
    <div>
      <h3>{post.title}</h3>
      <h4>{post.body}</h4>
      <ul>
        <li>{post.comments[0].id}</li>
        <li>{post.comments[0].name}</li>
        <li>{post.comments[0].body}</li>
      </ul>
    </div>
  );
}

export default Post;
