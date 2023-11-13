import api from "@/api"
import { GET_COMMENT_REPLY_QUERY_NAME } from "@/fixtures/api-query"
import { useInfiniteQuery } from "@tanstack/react-query"

const useGetCommentReply = ({ pid, cid, size }) => {
  return useInfiniteQuery([GET_COMMENT_REPLY_QUERY_NAME, pid, cid], async ({ pageParam = 1 }) => {
    const query = {
      pageNo: pageParam,
      size
    }
    const res = await api.request.getCommentReply({ cid }, query)
    return res
  }, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return pages.length + 1
      else return undefined
    }
  })
}

export default useGetCommentReply