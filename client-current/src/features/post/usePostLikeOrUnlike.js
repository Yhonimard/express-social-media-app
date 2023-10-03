import api from "@/api"
import { GET_POST_LIKE_NAME } from "@/fixtures/api-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"

const usePostLikeOrUnlike = ({ userHasLike, postId }) => {
  const queryClient = useQueryClient()
  const currentUser = useSelector(state => state.auth.user)
  return useMutation(async () => {
    const res = await api.request.likeOrUnlikePost(postId)
    return res
  }, {
    onMutate: async () => {
      const prevData = queryClient.getQueryData([GET_POST_LIKE_NAME, postId])
      await queryClient.cancelQueries([GET_POST_LIKE_NAME, postId])

      if (userHasLike) {
        queryClient.setQueryData([GET_POST_LIKE_NAME, postId], (oldData) => {
          return {
            ...oldData,
            data: oldData.data.filter(i => i.id !== currentUser.id)
          }
        })
      }

      if (!userHasLike) {
        queryClient.setQueryData([GET_POST_LIKE_NAME, postId], (oldData) => {
          return {
            ...oldData,
            data: [...oldData.data, { user: { id: currentUser.id, photoProfile: currentUser.photoProfile, username: currentUser.username } }]
          }
        })
      }


      return {
        prevData
      }
    },
    onError: (err, _var, context) => {
      queryClient.setQueryData([GET_POST_LIKE_NAME, postId], context.prevData)
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_POST_LIKE_NAME])
    }
  })
}

export default usePostLikeOrUnlike