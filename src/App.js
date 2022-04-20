import { ThemeProvider } from 'styled-components';
import theme from './theme'
import TextBar from './components/TextBar';
import GlobalStyle from './components/GlobalStyle'
import { useEffect, useState } from 'react';
import fetchData from './services/blog';
import PostList from './components/PostList';

function App() {
  const [posts, setPosts] = useState([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getPost = () => {
    setIsLoading(true)

    fetchData()
      .then((newPosts) => {
        setIsLoading(false)
        setPosts(newPosts)
      })
      .catch((error) => {
        setIsLoading(false)
        setHasError(true)
      })
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TextBar>
        <h1>The Blog Post</h1>
      </TextBar>
      {!hasError && !isLoading && <PostList posts={posts}/>}
      {!hasError && isLoading && <h2>Loading posts...</h2>}
      {hasError && <h2>Failed to load posts.</h2>}
    </ThemeProvider>
  );
}

export default App;
