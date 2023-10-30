import api from "@/api"
import { GET_CURRENT_USER_FOLLOWING } from "@/fixtures/api-query"
import { useInfiniteQuery } from "@tanstack/react-query"
const useGetCurrentUserFollowing = (uid) => {
  return useInfiniteQuery([GET_CURRENT_USER_FOLLOWING, uid], async ({ pageParam = 1 }) => {
    const query = {
      pageNo: pageParam,
      size: 6
    }
    const res = await api.request.getCurrentUserFollowing(query)
    return res
  }, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return pages.length + 1
      else return undefined
    }
  })
}

export default useGetCurrentUserFollowing
