import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/api"
import { useDispatch } from "react-redux"
import { USE_GET_ALL_POST_NAME } from "@/fixtures/request-api"
import global from "@/redux/global"

const useDeletePost = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  return useMutation(async ({ postId }) => {
    const res = await api.request.delete(`/post/${postId}`)
    return res.data
  }, {
    onMutate: async (postData) => {
      const postId = postData?.postId
      await queryClient.cancelQueries([USE_GET_ALL_POST_NAME])
      const previousPost = queryClient.getQueryData([USE_GET_ALL_POST_NAME])

      queryClient.setQueryData([USE_GET_ALL_POST_NAME], (oldData) => {
        const newData = oldData?.pages?.map(p => {
          return {
            ...p,
            data: p.data.filter(i => i.id !== postId)
          }
        })
        return {
          ...oldData,
          pages: newData
        }
      })
      return {
        previousPost
      }
    },
    onError: (err, _newData, context) => {
      queryClient.setQueryData([USE_GET_ALL_POST_NAME], context.previousPost)
      dispatch(global.action.showNotification({ message: err?.response?.data?.message || "something went wrong, please try again to deleting the post", status: "error" }))
    },
    onSettled: () => {
      queryClient.invalidateQueries([USE_GET_ALL_POST_NAME])
    },
    onSuccess: () => {
      dispatch(global.action.showNotification({ message: "success when deleting post", status: "success" }))
    }
  })
}

export default useDeletePost