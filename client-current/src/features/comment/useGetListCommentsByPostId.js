import api from '@/api'
import { GET_COMMENT_NAME } from '@/fixtures/api-query'
import { useInfiniteQuery } from '@tanstack/react-query'

const useGetListCommentByPostId = (postId, { size }) => {
  return useInfiniteQuery([GET_COMMENT_NAME, postId], async ({ pageParam = 1 }) => {
    const res = await api.request.getAllCommentByPostId(postId, pageParam, size)
    return res
  }, {
    getNextPageParam: (_lastPage, pages) => {
      if (!_lastPage?.isLast) return pages.length + 1
      else return undefined
    }
  })
}

export default useGetListCommentByPostId   