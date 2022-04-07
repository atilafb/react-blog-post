import api from '../services/api'

const totalPosts = 95
const pageSize = 20

const arrayOfPages = (total, size) => {
  const totalPages = total / size;
  const fullPages = Math.floor(totalPages)
  const partialPage = (totalPages - fullPages) * size

  return [
    ...new Array(fullPages).fill(size),
    partialPage
  ].filter(Boolean);
}

const fetchData = () => arrayOfPages(totalPosts, pageSize).map(
  (maxPageLength, index) => () => {
    return api.get(`/posts?`, {
      params: {
        _start: index * pageSize,
        _limit: maxPageLength,
      }
    })
      .then(res => res.data)
      .catch((error) => {
        throw new Error(`Failed loading posts on page ${index + 1}`)
      })
  }
).reduce(
  (chain, listPostFn) => chain.then((acc) => listPostFn().then((res) => [...acc, ...res])),
  Promise.resolve([]));

  
export default fetchData;
