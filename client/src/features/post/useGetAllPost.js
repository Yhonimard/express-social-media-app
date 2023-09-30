import api from "@/api"
import { USE_GET_ALL_POST_NAME } from "@/fixtures/request-api"
import { useInfiniteQuery } from "@tanstack/react-query"

const useGetAllPost = () => {
  return useInfiniteQuery([USE_GET_ALL_POST_NAME], async ({ pageParam = 1 }) => {
    const res = await api.request.get(`/post?pageNo=${pageParam}&size=4`, {
    })
    return res.data
  },
    {
      getNextPageParam: (_lastPage, pages) => {
        if (!_lastPage.isLast) {
          return pages.length + 1
        } else {
          return undefined
        }
      },

    }
  )
}
export default useGetAllPost
