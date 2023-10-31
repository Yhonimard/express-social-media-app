import api from "@/api"
import { FRIEND_QUERY_NAME } from "@/fixtures/api-query"
import globalReducer from "@/redux/globalReducer"
import { useQueryClient, useMutation, QueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"


const useUnconfirmUser = ({ uid, senderId }) => {
  const qc = useQueryClient()
  const d = useDispatch()
  return useMutation(async () => {
    const res = await api.request.unconfirmUser(senderId)
    return res
  }, {
    onMutate: async () => {
      await qc.cancelQueries([FRIEND_QUERY_NAME, uid])
      const prevReqFrienddata = await qc.getQueryData([FRIEND_QUERY_NAME, uid])

      qc.setQueryData([FRIEND_QUERY_NAME, uid], (oldData) => {

        return {
          ...oldData,
          pages: oldData.pages.map(p => ({
            ...p,
            data: p.data.filter(f => f.id !== senderId)
          }))
        }

      })

      return {
        prevReqFrienddata
      }
    },
    onError: (err, _var, ctx) => {
      const msg = err?.response?.data?.message
      qc.setQueryData([FRIEND_QUERY_NAME, uid], ctx.prevReqFrienddata)
      d(globalReducer.action.showNotification({ message: msg || "something went wrong, please try again", status: "error" }))
    },
    onSettled: () => {
      qc.invalidateQueries([FRIEND_QUERY_NAME, uid])
    },
    onSuccess: () => {
      d(globalReducer.action.showNotification({ message: "succes unfollow user", status: "default" }))

    }
  })
}

export default useUnconfirmUser
