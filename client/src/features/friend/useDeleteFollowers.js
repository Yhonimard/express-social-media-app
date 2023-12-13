import api from "@/api"
import { GET_CURRENT_USER_FOLLOWERS_QUERY_NAME } from "@/fixtures/api-query"
import globalReducer from "@/redux/globalReducer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

const useDeleteFollowers = ({ uid, senderId }) => {
  const query = useQueryClient()
  const dispatch = useDispatch()
  return useMutation(async () => {
    const res = await api.request.deleteFollowers({ senderId })
    return res
  }, {
    onMutate: async () => {
      await query.cancelQueries([GET_CURRENT_USER_FOLLOWERS_QUERY_NAME, uid])
      const prevFollowersData = query.getQueryData([GET_CURRENT_USER_FOLLOWERS_QUERY_NAME, uid])

      query.setQueryData([GET_CURRENT_USER_FOLLOWERS_QUERY_NAME, uid], oldData => {
        const newPagesData = oldData.pages.map(p => ({
          ...p,
          data: p.data.filter(f => f.user.id !== senderId)
        }))
        return {
          ...oldData,
          pages: newPagesData
        }
      })

      return {
        prevFollowersData
      }
    },
    onError: (err, _var, ctx) => {
      query.setQueryData([GET_CURRENT_USER_FOLLOWERS_QUERY_NAME, uid], ctx.prevFollowersData)
    },
    onSettled: () => {
      query.invalidateQueries([GET_CURRENT_USER_FOLLOWERS_QUERY_NAME, uid])
    },
    onSuccess: () => {
      dispatch(globalReducer.action.showNotification({ message: "success delete followers"}))
    }
  })
}

export default useDeleteFollowers