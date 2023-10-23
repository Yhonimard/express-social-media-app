import api from "@/api"
import { GET_POST_BY_USER_ID_NAME } from "@/fixtures/api-query"
import { useInfiniteQuery } from "@tanstack/react-query"

const useGetPostByUserId = (uid) => {
  return useInfiniteQuery([GET_POST_BY_USER_ID_NAME, uid], async ({ pageParam = 1 }) => {
    const query = {
      pageNo: pageParam,
      size: 4
    }
    const res = await api.request.getPostByUserId(uid, query)
    return res
  }, {
    getNextPageParam: (_lastPage, pages) => {
      if (!_lastPage.isLast) return pages.length + 1
      else return undefined
    }
  })
}

export default useGetPostByUserId