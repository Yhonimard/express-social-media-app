import api from "@/api"
import { GET_COMMENT_REPLY_QUERY_NAME } from "@/fixtures/api-query"
import globalReducer from "@/redux/globalReducer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

const useUpdateCommentReply = ({ parentCommentId, replyCommentId, pid }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation(async ({ title }) => {
    const res = await api.request.updateCommentReply({ parentCommentId, title, replyCommentId, postId: pid })
    return res
  }, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries([GET_COMMENT_REPLY_QUERY_NAME, pid, parentCommentId])
      const prevData = queryClient.getQueryData([GET_COMMENT_REPLY_QUERY_NAME, pid, parentCommentId])

      queryClient.setQueryData([GET_COMMENT_REPLY_QUERY_NAME, pid, parentCommentId], oldData => {

        const newPages = oldData.pages.map(p => {
          const replyCommentIndex = p.data.findIndex(cr => cr.id === replyCommentId)

          const updatedComment = {
            ...p.data[replyCommentIndex],
            title: newData.title
          }

          const updatedReplyComments = [...p.data]
          updatedReplyComments[replyCommentIndex] = updatedComment
          return {
            ...p,
            data: updatedReplyComments
          }
        })

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
      queryClient.setQueryData([GET_COMMENT_REPLY_QUERY_NAME, pid, parentCommentId], ctx.prevData)
      dispatch(globalReducer.action.showNotification({ message: msg, status: "error" }))
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_COMMENT_REPLY_QUERY_NAME, pid, parentCommentId])
    },
    onSuccess: () => {
      dispatch(globalReducer.action.showNotification({ message: "success update comment" }))
    }

  })
}

export default useUpdateCommentReply