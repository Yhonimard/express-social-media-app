import api from "@/api"
import { USE_GET_POST_LIKES_NAME } from "@/fixtures/request-api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"

const useLikeOrUnlikePostList = ({ postId }) => {
  const queryClient = useQueryClient()
  const user = useSelector(state => state?.auth?.data)
  return useMutation(async () => {
    const res = await api.request.post(`/post/${postId}/like`)
    return res.data
  }, {
    onMutate: async (hasLike) => {
      await queryClient.cancelQueries([USE_GET_POST_LIKES_NAME, postId])
      const prevLikes = queryClient.getQueryData([USE_GET_POST_LIKES_NAME, postId])


      if (hasLike) {
        queryClient.setQueryData([USE_GET_POST_LIKES_NAME, postId], (oldData) => {
          return {
            ...oldData,
            data: oldData?.data?.filter(l => l?.user?.id !== user?.id)
          }
        })
      }

      if (!hasLike) {
        queryClient.setQueryData([USE_GET_POST_LIKES_NAME, postId], (oldData) => {
          return {
            ...oldData,
            data: [...oldData.data, { user: { id: user?.id, photoProfile: user?.photoProfile, username: user?.username } }]
          }
        })
      }
      return {
        prevLikes
      }
    },
    onError: (err, _var, context) => {
      queryClient.setQueryData([USE_GET_POST_LIKES_NAME, postId], context.prevLikes)

    },
    onSettled: () => {
      queryClient.invalidateQueries([USE_GET_POST_LIKES_NAME, postId])
    }
  })
}

export default useLikeOrUnlikePostList  