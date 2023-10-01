import api from "@/api"
import { GET_POST_NAME } from "@/fixtures/api-query"
import globalReducer from "@/redux/globalReducer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"

const useUpdatePost = (postId, single = false) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth.user)
  return useMutation(async (data) => {
    const res = await api.request.updatePostByPostId(postId, data)
    return res
  }, {
    onMutate: async (updatedData) => {
      dispatch(globalReducer.action.showLoadingOverlay(true))
      if (single) {
        const prevData = queryClient.getQueryData([GET_POST_NAME, postId])
        await queryClient.cancelQueries([GET_POST_NAME, postId])
        queryClient.setQueryData([GET_POST_NAME, postId], (oldData) => {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              title: updatedData.title,
              content: updatedData.content,
            }
          }
        })

        return prevData
      }


      if (!single) {
        const prevData = queryClient.getQueryData([GET_POST_NAME])
        await queryClient.cancelQueries([GET_POST_NAME])
        queryClient.setQueryData([GET_POST_NAME], (oldData) => {
          const updatedPages = oldData.pages.map(p => {
            const dataWillUpdateIndex = p.data.findIndex(i => i.id === postId)
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
      }
    },
    onError: (err, _var, context) => {
      if (!single) queryClient.setQueryData([GET_POST_NAME], context.prevData)
      if (single) queryClient.setQueryData([GET_POST_NAME, postId], context.prevData)

      const message = err?.response.data.message || `hi ${currentUser.username}, something went wrong please try again to update this post`
      dispatch(globalReducer.action.showLoadingOverlay(false))
      dispatch(globalReducer.action.showNotification({ message, status: "error" }))

    },
    onSettled: () => {
      if (!single) queryClient.invalidateQueries([GET_POST_NAME])
      if (single) queryClient.invalidateQueries([GET_POST_NAME, postId])
    },
    onSuccess: () => {
      dispatch(globalReducer.action.showLoadingOverlay(false))
      dispatch(globalReducer.action.showNotification({ message: `hi ${currentUser.username}, successfully update post`, status: "success" }))
    }
  })
}
export default useUpdatePost