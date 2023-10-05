import api from "@/api"
import { GET_POST_NAME } from "@/fixtures/api-query"
import globalReducer from "@/redux/globalReducer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"

const useUpdatePostByUser = (id, postId) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth.user)
  return useMutation(async (data) => {
    const res = await api.request.updatePostByUser(postId, data)
    return res
  }, {
    onMutate: async (updatedData) => {
      dispatch(globalReducer.action.showLoadingOverlay(true))

      const prevData = queryClient.getQueryData([GET_POST_NAME, id])
      await queryClient.cancelQueries([GET_POST_NAME, id])
      queryClient.setQueryData([GET_POST_NAME, id], (oldData) => {
        const updatedPages = oldData?.pages.map(p => {
          const dataWillUpdateIndex = p.data.findIndex(i => i.id === id)
          const updatedPost = {
            ...p.data[dataWillUpdateIndex],
            title: updatedData.title,
            content: updatedData.content
          }

          const updatedPosts = [...p.data]
          updatedPosts[dataWillUpdateIndex] = updatedPost
          return {
            ...p,
            data: updatedPosts
          }
        })

        return {
          ...oldData,
          pages: updatedPages
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _var, context) => {
      queryClient.setQueryData([GET_POST_NAME, id], context.prevData)

      const message = err?.response.data.message || `hi ${currentUser.username}, something went wrong please try again to update this post`
      dispatch(globalReducer.action.showLoadingOverlay(false))
      dispatch(globalReducer.action.showNotification({ message, status: "error" }))

    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_POST_NAME, id])
    },
    onSuccess: () => {
      dispatch(globalReducer.action.showLoadingOverlay(false))
      dispatch(globalReducer.action.showNotification({ message: `hi ${currentUser.username}, successfully update post`, status: "success" }))
    }
  })
}
export default useUpdatePostByUser