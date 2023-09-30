import api from "@/api"
import { USE_GET_ALL_COMMENT_BY_POST_ID_NAME } from "@/fixtures/request-api"
import global from "@/redux/global"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
const useCreateComment = (postId) => {
  const user = useSelector(state => state.auth.data)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  return useMutation(async (data) => {
    const res = await api.request.post(`/post/${postId}/comment`, data)
    return res.data
  }, {
    onMutate: async (newCommentData) => {
      dispatch(global.action.showBackdrop(true))
      await queryClient.cancelQueries([USE_GET_ALL_COMMENT_BY_POST_ID_NAME, postId])

      const previousComment = queryClient.getQueryData([USE_GET_ALL_COMMENT_BY_POST_ID_NAME, postId])

      queryClient.setQueryData([USE_GET_ALL_COMMENT_BY_POST_ID_NAME, postId], (oldData) => {

        const newData = oldData?.pages.map(p => {
          return {
            ...p,
            data: [...p.data, { ...newCommentData, id: Date.now(), author: { user: user?.username, photoProfile: user?.photoProfile, id: user?.id } }]
          }
        })
        
        return {
          ...oldData,
          pages: newData
        }
      })

      return { previousComment }
    },
    onError: (err, _var, context) => {
      queryClient.setQueryData([USE_GET_ALL_COMMENT_BY_POST_ID_NAME, postId], context.previousComment)
      dispatch(global.action.showBackdrop(false))
      dispatch(global.action.showNotification({ message: err?.response?.data?.message || "something went wrong, please try again to creating comment", status: "error" }))
    },
    onSettled: () => {
      queryClient.invalidateQueries([USE_GET_ALL_COMMENT_BY_POST_ID_NAME, postId])
    },
    onSuccess: () => {
      dispatch(global.action.showBackdrop(false))
      dispatch(global.action.showNotification({ message: "success create comment", status: "success" }))
    }
  },
  )
}
export default useCreateComment