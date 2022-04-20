import Container from "./Container";
import Card from "./Card";

const Post = ({ post }) => {
  
  return (
    <Container>
      <Card>
        <h3>Title: {post.title}</h3>
        <p><strong>Body: </strong>{post.body}</p>
      </Card>
      <Card>
        <ul>
          <li><strong>Username: </strong>{post.user.name}</li>
          <li><strong>Comment Title: </strong>{post.comments[0].name}</li>
          <li><strong>Comment Body: </strong>{post.comments[0].body}</li>
        </ul>
      </Card>
    </Container>
  );
}

export default Post;
