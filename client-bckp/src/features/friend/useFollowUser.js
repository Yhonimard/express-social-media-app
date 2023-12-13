import api from "@/api"
import { FRIEND_QUERY_NAME } from "@/fixtures/api-query"
import globalReducer from "@/redux/globalReducer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

const useFollowUser = ({ currUserId, receiverId }) => {
  const query = useQueryClient()
  const d = useDispatch()
  return useMutation(async () => {
    const res = await api.request.followUser(receiverId)
    return res
  }, {
    onMutate: async () => {
      await query.cancelQueries([FRIEND_QUERY_NAME, currUserId, receiverId])
      const prevData = query.getQueryData([FRIEND_QUERY_NAME, currUserId, receiverId])

      query.setQueryData([FRIEND_QUERY_NAME, currUserId, receiverId], (oldData) => {
        return {
          ...oldData,
          hasFollow: true,
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _var, ctx) => {
      const message = err?.response?.data?.message

      d(globalReducer.action.showNotification({ message: message || "something went wrong, please follow again", status: "error" }))
      query.setQueryData([FRIEND_QUERY_NAME, currUserId, receiverId], ctx.prevData)
    },
    onSettled: () => {
      query.invalidateQueries([FRIEND_QUERY_NAME, currUserId, receiverId])
    },
    onSuccess: () => {
      d(globalReducer.action.showNotification({ message: "success following this user" }))
    }
  })
}

export default useFollowUser