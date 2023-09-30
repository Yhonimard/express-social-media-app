import api from '@/api'
import { USE_GET_ALL_POST_NAME, USE_GET_POST_BY_ID_NAME } from '@/fixtures/request-api'
import global from '@/redux/global'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

const useUpdatePost = ({ postId, single }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  return useMutation(async (data) => {
    const res = await api.request.patch(`/post/${postId}`, data)
    return res.data
  }, {
    onMutate: async (newData) => {
      dispatch(global.action.showBackdrop(true))
      if (single) {
        await queryClient.cancelQueries([USE_GET_POST_BY_ID_NAME, postId])
        const previousPost = queryClient.getQueryData([USE_GET_POST_BY_ID_NAME, postId])

        queryClient.setQueryData([USE_GET_POST_BY_ID_NAME, postId], (oldData) => {
          const updatedData = oldData.data = {
            ...oldData.data,
            title: newData.title,
            content: newData.content
          }
          return {
            ...oldData,
            data: updatedData
          }
        })
        return {
          previousPost
        }
      }

      if (!single) {

        await queryClient.cancelQueries([USE_GET_ALL_POST_NAME])

        const previousPost = queryClient.getQueryData([USE_GET_ALL_POST_NAME])

        queryClient.setQueryData([USE_GET_ALL_POST_NAME], (oldData) => {

          const dataUpdate = oldData?.pages.map(p => {
            const indexWillUpdate = p?.data.findIndex(post => post.id === postId)

            const updatedPost = {
              ...p.data[indexWillUpdate],
              title: newData.title,
              content: newData.content
            }
            const updatedPosts = [...p.data]
            updatedPosts[indexWillUpdate] = updatedPost

            return {
              ...p,
              data: updatedPosts
            }
          })

          return {
            ...oldData,
            pages: dataUpdate
          }
        })
        return {
          previousPost
        }
      }

    },
    onError: (err, _var, context) => {
      dispatch(global.action.showBackdrop(false))
      dispatch(global.action.showNotification({ message: err?.response?.data?.message || "something went wrong please try again to update post", status: "error" }))
      if (single) queryClient.setQueryData([USE_GET_POST_BY_ID_NAME, postId], context.previousPost)
      if (!single) queryClient.setQueryData([USE_GET_ALL_POST_NAME], context.previousPost)
    },

    onSettled: () => {
      if (single) queryClient.invalidateQueries([USE_GET_POST_BY_ID_NAME, postId])
      if (!single) queryClient.invalidateQueries([USE_GET_ALL_POST_NAME])
    },
    onSuccess: () => {
      dispatch(global.action.showBackdrop(false))
      dispatch(global.action.showNotification({ message: "success update post", status: "success" }))
    }

  })
}

export default useUpdatePost