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

const fetchUser = (userId) => {
  return api.get(`/users/${userId}`)
  .then((resUsers) => {
    return resUsers.data
  })
}

const fetchUsers = (posts) => {
  const uniqueUsers = new Set(posts.map((post) => {
    return post.userId
  }))

  const promises = Array.from(uniqueUsers).map((userId) => {
    return fetchUser(userId)
  })

  return Promise.all(promises)
  .then((users) => {
    return posts.map((post) => {
      const user = users.find(user => user.id === post.userId)
      return {...post, user}
    })
  })
}


const fetchData = () => arrayOfPages(TOTAL_POSTS, PAGE_SIZE).map(
  (maxPageLength, index) => () => {
    return api.get('/posts', {
      params: {
        _start: index * PAGE_SIZE,
        _limit: maxPageLength,
      }
    })
      .then(posts => posts.data)
      .then((page) => {
        return page.map((post) => {
          return api.get(`/posts/${post.id}/comments`)
            .then((resComments) => {
              return { ...post, comments: resComments.data }
            })
        })
      })
      .then(res => Promise.all(res))
  }
).reduce(
  (chain, listPostFn) => chain.then((acc) => listPostFn().then((res) => [...acc, ...res])),
  Promise.resolve([]))
  .then((allPosts) => fetchUsers(allPosts))


export default fetchData;
