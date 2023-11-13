import api from "@/api"
import { GET_USER_HAS_LIKE_COMMENT_QUERY_NAME } from "@/fixtures/api-query"
import { useQuery } from "@tanstack/react-query"

const useGetCurrentUserHasLikeComment = ({ uid, cid }) => {
  return useQuery([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid, cid], async () => {
    const res = await api.request.getCurrentUserHasLikeComment({ cid })
    return res
  }, {

  })
}

export default useGetCurrentUserHasLikeComment