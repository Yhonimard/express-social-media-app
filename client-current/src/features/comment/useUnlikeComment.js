import api from '@/api'
import { GET_USER_HAS_LIKE_COMMENT_QUERY_NAME } from '@/fixtures/api-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUnlikeComment = ({ cid, uid }) => {
  const queryClient = useQueryClient()
  return useMutation(async () => {
    await api.request.unlikeComment({ cid })
  }, {
    onMutate: async () => {
      await queryClient.cancelQueries([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid])
      const prevData = queryClient.getQueryData([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid])

      queryClient.setQueryData([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid], oldData => {
        return {
          hasLike: false
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _ctx, ctx) => {
      queryClient.setQueryData([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid], ctx.prevData)
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_USER_HAS_LIKE_COMMENT_QUERY_NAME, uid])
    }

  })
}

export default useUnlikeComment