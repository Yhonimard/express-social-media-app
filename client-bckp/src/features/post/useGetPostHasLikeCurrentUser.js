import api from "@/api"
import { GET_POST_HAS_LIKE_CURRENT_USER_NAME } from "@/fixtures/api-query"
import { useInfiniteQuery } from "@tanstack/react-query"

const useGetPostHasLikeCurrentUser = (uid) => {
  return useInfiniteQuery([GET_POST_HAS_LIKE_CURRENT_USER_NAME, uid], async ({ pageParam = 1 }) => {
    const query = { pageNo: pageParam, size: 6 }
    const res = await api.request.getPostHasLikeCurrentUser(query)
    return res
  }, {
    getNextPageParam: (_lastPage, pages) => {
      if (!_lastPage.isLast) return pages.length + 1
      else return undefined
    }
  })
}

export default useGetPostHasLikeCurrentUser