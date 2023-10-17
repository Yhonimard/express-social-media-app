import api from "@/api"
import { GET_POST_HAS_LIKE_CURRENT_USER_NAME } from "@/fixtures/api-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useUnlikePostHasLikeUser = (pid, uid) => {
  const queryClient = useQueryClient()
  return useMutation(async () => {
    const res = await api.request.unlikePostByCurrentUser(pid)
    return res.data
  }, {
    onMutate: async () => {
      await queryClient.cancelQueries([GET_POST_HAS_LIKE_CURRENT_USER_NAME, uid])
      const prevData = queryClient.getQueryData([GET_POST_HAS_LIKE_CURRENT_USER_NAME, uid], (oldData) => {
        const newPagesData = oldData.pages.map((p) => ({
          ...p,
          data: p.data.filter(p => p.id !== pid)
        }))
        return {
          ...oldData,
          pages: newPagesData
        }
      })

      return {
        prevData
      }
    },
    onError: (_err, _var, ctx) => {
      queryClient.setQueryData([GET_POST_HAS_LIKE_CURRENT_USER_NAME, uid], ctx.prevData)
    },
    onSettled: () => {
      queryClient.invalidateQueries(GET_POST_HAS_LIKE_CURRENT_USER_NAME, uid)
    }
  })
}

export default useUnlikePostHasLikeUser