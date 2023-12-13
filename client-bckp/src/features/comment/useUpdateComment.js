import api from "@/api"
import { GET_COMMENT_NAME } from "@/fixtures/api-query"
import globalReducer from "@/redux/globalReducer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

const useUpdateComment = (postId, commentId, toggleModal) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation(async (data) => {
    const res = await api.request.updateComment(postId, commentId, data)
    return res
  }, {
    onMutate: async (newData) => {
      toggleModal()
      const prevData = queryClient.getQueryData([GET_COMMENT_NAME, postId])
      await queryClient.cancelQueries([GET_COMMENT_NAME, postId])

      queryClient.setQueryData([GET_COMMENT_NAME, postId], (oldData) => {
        const newCommentData = oldData?.pages.map(p => {
          const dataWillUpdateIndex = p.data.findIndex(i => i.id === commentId)
          const updatedComment = {
            ...p.data[dataWillUpdateIndex],
            title: newData.title
          }
          const updatedComments = [...p.data]
          updatedComments[dataWillUpdateIndex] = updatedComment
          return {
            ...p,
            data: updatedComments
          }
        })
        return {
          ...oldData,
          pages: newCommentData
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _var, context) => {
      const message = err?.response?.data?.message
      queryClient.setQueryData([GET_COMMENT_NAME, postId], context.prevData)
      toggleModal()
      dispatch(globalReducer.action.showNotification({ message, status: "error" }))

    },
    onSuccess: () => {
      queryClient.invalidateQueries([GET_COMMENT_NAME, postId])
      dispatch(globalReducer.action.showNotification({ message: "success update comment", status: "success" }))
    }
  })
}

export default useUpdateComment