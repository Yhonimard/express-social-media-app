import { useInfiniteQuery } from "@tanstack/react-query"
import { GET_CURRENT_USER_FOLLOWERS_QUERY_NAME } from "@/fixtures/api-query"
import api from "@/api"

const useGetCurrentUserFollowers = ({ uid }) => {
  return useInfiniteQuery([GET_CURRENT_USER_FOLLOWERS_QUERY_NAME, uid], async ({ pageParam = 1 }) => {
    const res = await api.request.getCurrentUserFollowers({ size: 4, pageNo: pageParam })
    return res
  }, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return pages.length + 1
      else return undefined
    }
  }
  )
}

export default useGetCurrentUserFollowers
