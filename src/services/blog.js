import api from './api'

const TOTAL_POSTS = 95
const PAGE_SIZE = 20

const arrayOfPages = (total, size) => {
  const totalPages = total / size;
  const fullPages = Math.floor(totalPages)
  const partialPage = (totalPages - fullPages) * size

  return [
    ...new Array(fullPages).fill(size),
    partialPage
  ].filter(Boolean);
}

const fetchUser = async (userId) => {
  const users = await api.get(`/users/${userId}`)
  return users.data
}

const fetchUsers = (posts) => {
  const uniqueUsers = new Set(posts.map((post) => {
    return post.userId
  }))

  const userPromises = Array.from(uniqueUsers).map((userId) => {
    return fetchUser(userId)
  })

  return Promise.all(userPromises)
  .then((users) => {
    return posts.map((post) => {
      const user = users.find(user => user.id === post.userId)
      return {...post, user}
    })
  })
}

const fetchPosts = async ({ start, limit }) => {
  const posts = await api.get('/posts', {
    params: {
      _start: start,
      _limit: limit
    }
  });
  return posts.data;
}

const fetchPostsComments = (posts) => {
  const commentsPromises = posts.map((post) => {
    return api.get(`/posts/${post.id}/comments`)
      .then(({ data: comments }) => {
        return { ...post, comments }
      })
  })
  return Promise.all(commentsPromises)
}

const fetchData = () => arrayOfPages(TOTAL_POSTS, PAGE_SIZE).map(
  (maxPageLength, index) => () => {
    return fetchPosts({
      start: index * PAGE_SIZE,
      limit: maxPageLength
    })
      .then(posts => fetchPostsComments(posts))
  }
).reduce(
  (chain, listPostFn) => chain.then((acc) => listPostFn().then((res) => [...acc, ...res])),
  Promise.resolve([]))
  .then((allPosts) => fetchUsers(allPosts))

  
export default fetchData;
