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
  Promise.resolve([]));


export default fetchData;
