import api from "@/api"
import { GET_COMMENT_REPLY_QUERY_NAME } from "@/fixtures/api-query"
import globalReducer from "@/redux/globalReducer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

const useDeleteCommentReply = ({ parentCommentId, postId, replyCommentId }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  return useMutation(async () => {
    await api.request.deleteCommentReply({ parentCommentId, postId, replyCommentId })
  }, {
    onMutate: async () => {

      await queryClient.cancelQueries([GET_COMMENT_REPLY_QUERY_NAME, postId, parentCommentId])
      const prevData = await queryClient.getQueryData([GET_COMMENT_REPLY_QUERY_NAME, postId, parentCommentId])

      queryClient.setQueryData([GET_COMMENT_REPLY_QUERY_NAME, postId, parentCommentId], oldData => {
        const newPages = oldData.pages.map(p => ({
          ...p,
          data: p.data.filter(p => p.id !== replyCommentId)
        }))

        return {
          ...oldData,
          pages: newPages
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _var, ctx) => {
      const msg = err?.response?.data?.message
      queryClient.setQueryData([GET_COMMENT_REPLY_QUERY_NAME, postId, parentCommentId], ctx.prevData)
      dispatch(globalReducer.action.showNotification({ message: msg, status: "error" }))
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_COMMENT_REPLY_QUERY_NAME, postId, parentCommentId])
    },
    onSuccess: () => {
      dispatch(globalReducer.action.showNotification({ message: "success delete comment" }))
    }
  })
}

export default useDeleteCommentReply