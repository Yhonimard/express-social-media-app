import api from "@/api"
import { USE_GET_ALL_COMMENT_BY_POST_ID_NAME } from "@/fixtures/request-api"
import { useInfiniteQuery } from "@tanstack/react-query"
const useGetAllCommentPostId = (postId, size) => {
  return useInfiniteQuery([USE_GET_ALL_COMMENT_BY_POST_ID_NAME, postId], async ({ pageParam = 1 }) => {
    const res = await api.request.get(`/post/${postId}/comment?pageNo=${pageParam}&size=${size}`)
    return res.data
  },
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < _lastPage?.totalPages) {
          return pages.length + 1
        } else return undefined
      }
    }
  )


}

export default useGetAllCommentPostId