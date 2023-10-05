import api from "@/api"
import { GET_POST_NAME } from "@/fixtures/api-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useDeletePostByUser = (uid) => {
  const queryClient = useQueryClient()
  return useMutation(async (pid) => {
    const res = await api.request.deletePostByUser(pid)
    return res
  }, {
    onMutate: async (pid) => {
      await queryClient.cancelQueries([GET_POST_NAME, uid])
      const prevData = queryClient.invalidateQueries([GET_POST_NAME, uid])

      queryClient.setQueryData([GET_POST_NAME, uid], (oldData) => {
        const newPagesData = oldData?.pages.map(p => ({
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
      queryClient.setQueryData([GET_POST_NAME, uid], ctx.prevData)
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_POST_NAME, uid])
    }
  })
}

export default useDeletePostByUser