import api from "@/api"
import { GET_COMMENT_NAME } from "@/fixtures/api-query"
import { useInfiniteQuery } from "@tanstack/react-query"

const useGetCommentHasCommentedCurrentUser = (uid) => {
  return useInfiniteQuery([GET_COMMENT_NAME, uid], async ({ pageParam = 1 }) => {
    const query = {
      pageNo: pageParam,
      size: 6
    }
    const res = await api.request.getCommentHasCommentedCurrentUser(query)
    return res
  }, {
    getNextPageParam: (_lastPage, pages) => {
      if (!_lastPage.isLast) return pages.length + 1
      else return undefined
    }
  })
}

export default useGetCommentHasCommentedCurrentUser