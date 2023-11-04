import api from "@/api"
import { SEARCH_POST_QUERY_NAME } from "@/fixtures/api-query"
import { useInfiniteQuery } from "@tanstack/react-query"

const useSearchPost = (value) => {
  return useInfiniteQuery([SEARCH_POST_QUERY_NAME, value], async ({ pageParam = 1 }) => {
    const query = {
      search: value,
      pageNo: pageParam,
      size: 4
    }
    const res = await api.request.searchPost(query)
    return res
  }, {
    getNextPageParam: (data, pages) => {
      if (!data.isLast) return pages.length + 1
      else return undefined
    },
    keepPreviousData: true,
    staleTime: 1000
  })
}

export default useSearchPost