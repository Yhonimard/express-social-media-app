import api from "@/api"
import { FRIEND_QUERY_NAME } from "@/fixtures/api-query"
import globalReducer from "@/redux/globalReducer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

const useConfirmUser = ({ uid }) => {
  const queryClient = useQueryClient()
  const d = useDispatch()
  return useMutation(async (senderId) => {
    const res = await api.request.confirmUser(senderId)
    return res
  }, {
    onMutate: async (senderId) => {
      await queryClient.cancelQueries([FRIEND_QUERY_NAME, uid])
      const prevReqFriendsData = queryClient.getQueryData([FRIEND_QUERY_NAME, uid])

      queryClient.setQueryData([FRIEND_QUERY_NAME, uid], (oldData) => {
        console.log(oldData)
        const newPagesData = oldData.pages.map(p => ({
          ...p,
          data: p.data.filter(f => f.id !== senderId)
        }))
        return {
          ...oldData,
          pages: newPagesData
        }
      })

      return {
        prevReqFriendsData
      }
    },
    onError: (err, _var, ctx) => {
      const msg = err?.response?.data?.message
      queryClient.setQueryData([FRIEND_QUERY_NAME, uid], ctx.prevReqFriendsData)
      d(globalReducer.action.showNotification({ message: msg || "something went wrong, try again to confirm this user", status: "error" }))
    },
    onSettled: () => {
      queryClient.invalidateQueries([FRIEND_QUERY_NAME, uid])
    },
    onSuccess: () => {
      d(globalReducer.action.showNotification({ message: "success confirm user" }))
    }
  })
}

export default useConfirmUser
