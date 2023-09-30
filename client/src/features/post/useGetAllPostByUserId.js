import api from "@/api"
import { USE_GET_ALL_POST_BY_USER_ID_NAME } from "@/fixtures/request-api"
import { useInfiniteQuery } from "@tanstack/react-query"

const useGetAllPostByUserId = () => {
  return useInfiniteQuery([USE_GET_ALL_POST_BY_USER_ID_NAME], async ({ pageParam = 1 }) => {
    const res = await api.request.get("/user/post", {
      params: {
        pageNo: pageParam,
        size: 4
      }
    })
    return res.data
  }, {
    getNextPageParam: (_lastPage, pages) => {
      if (!_lastPage?.isLast) return pages.length + 1
      else return undefined
    }
  }
  )
}

export default useGetAllPostByUserId