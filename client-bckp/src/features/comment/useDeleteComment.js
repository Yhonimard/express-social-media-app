import api from "@/api"
import { GET_COMMENT_NAME } from "@/fixtures/api-query"
import globalReducer from "@/redux/globalReducer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

const useDeleteComment = (postId, commentId) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  return useMutation(async () => {
    const res = await api.request.deleteComment(postId, commentId)
    return res
  }, {
    onMutate: async () => {
      await queryClient.cancelQueries([GET_COMMENT_NAME, postId])
      const prevData = queryClient.getQueryData([GET_COMMENT_NAME, postId])

      queryClient.setQueryData([GET_COMMENT_NAME, postId], (oldData) => {
        const newPagesData = oldData.pages.map(p => {
          return {
            ...p,
            data: p.data.filter(i => i.id !== commentId)
          }
        })
        return {
          ...oldData,
          pages: newPagesData
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _var, context) => {
      const message = err?.response?.data?.message
      queryClient.setQueryData([GET_COMMENT_NAME, postId], context.prevData)
      dispatch(globalReducer.action.showNotification({ message, status: "error" }))
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_COMMENT_NAME, postId])
    },
    onSuccess: () => {
      dispatch(globalReducer.action.showNotification({ message: "success delete this comment", status: "success" }))
    }
  })
}

export default useDeleteComment