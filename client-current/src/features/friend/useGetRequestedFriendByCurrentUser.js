import api from "@/api"
import { FRIEND_QUERY_NAME } from "@/fixtures/api-query"
import { useInfiniteQuery } from "@tanstack/react-query"

const useGetRequestedFriendByCurrentUser = (uid, { size }) => {
  return useInfiniteQuery([FRIEND_QUERY_NAME, uid], async ({ pageParam = 1 }) => {
    const query = {
      pageNo: pageParam,
      size
    }
    const res = await api.request.getRequestedFriendByCurrentUser(query)
    return res
  }, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return pages.length + 1
      else return undefined
    }
  })
}

export default useGetRequestedFriendByCurrentUser
