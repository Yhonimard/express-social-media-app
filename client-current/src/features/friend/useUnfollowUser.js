import api from "@/api"
import { FRIEND_QUERY_NAME, GET_CURRENT_USER_FOLLOWING } from "@/fixtures/api-query"
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
      const prevUserReqData = query.getQueryData([FRIEND_QUERY_NAME, currUserid, receiverId])

      await query.cancelQueries([GET_CURRENT_USER_FOLLOWING, currUserid])
      const prevUserFollowingData = query.getQueryData([GET_CURRENT_USER_FOLLOWING, currUserid])

      query.setQueryData([FRIEND_QUERY_NAME, currUserid, receiverId], () => {
        return {
          hasFollow: false
        }
      })

      query.setQueryData([GET_CURRENT_USER_FOLLOWING, currUserid], (oldData) => {
        const newPagesData = oldData.pages.map(p => ({
          ...p,
          data: p.data.filter(f => f.id !== receiverId)
        }))

        return {
          ...oldData,
          pages: newPagesData
        }
      })

      return {
        prevUserReqData,
        prevUserFollowingData
      }
    },
    onError: (err, _var, ctx) => {
      const msg = err?.response?.data?.message
      query.setQueryData([FRIEND_QUERY_NAME, currUserid, receiverId], ctx.prevUserReqData)
      d(globalReducer.action.showNotification({ message: msg || "something went wrong, please try again to unfollow user" }))
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
