import api from "@/api"
import { FRIEND_QUERY_NAME } from "@/fixtures/api-query"
import globalReducer from "@/redux/globalReducer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

const useUnfollowUser = ({ currUserid, receiverId }) => {
  const query = useQueryClient()
  const d = useDispatch()
  return useMutation(async () => {
    await api.request.unfollowUser(receiverId)
  }, {
    onMutate: async () => {
      await query.cancelQueries([FRIEND_QUERY_NAME, currUserid, receiverId])
      const prevData = query.getQueryData([FRIEND_QUERY_NAME, currUserid, receiverId])

      query.setQueryData([FRIEND_QUERY_NAME, currUserid, receiverId], (oldData) => {
        return {
          hasFollow: false
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _var, ctx) => {
      const msg = err?.response?.data?.message
      query.setQueryData([FRIEND_QUERY_NAME, currUserid, receiverId], ctx.prevData)
      d.apply(globalReducer.action.showNotification({ message: msg || "something went wrong, please try again to unfollow user" }))
    },
    onSettled: () => {
      query.invalidateQueries([FRIEND_QUERY_NAME, currUserid, receiverId])
    },
    onSuccess: () => {
      d(globalReducer.action.showNotification({ message: "success unfollowing user" }))
    }

  })
}

export default useUnfollowUser