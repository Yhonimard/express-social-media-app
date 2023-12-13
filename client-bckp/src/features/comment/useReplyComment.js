import api from "@/api"
import { GET_COMMENT_REPLY_QUERY_NAME } from "@/fixtures/api-query"
import globalReducer from "@/redux/globalReducer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux"

const useReplyComment = ({ pcid, pid }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const currentUser = useSelector(s => s.auth.user)
  return useMutation(async (data) => {
    const res = await api.request.replyComment({ pcid, pid }, data)
    return res
  }, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries([GET_COMMENT_REPLY_QUERY_NAME, pid, pcid])
      const prevData = queryClient.getQueryData([GET_COMMENT_REPLY_QUERY_NAME, pid, pcid])

      queryClient.setQueryData([GET_COMMENT_REPLY_QUERY_NAME, pid, pcid], oldData => {
        const data = {
          id: Date.now(),
          createdAt: moment(new Date()).format("DD MMMM, YYYY"),
          title: newData.title,
          author: {
            id: currentUser.id,
            username: currentUser.username,
            photoProfile: currentUser.photoProfile
          }
        }
        const newPages = oldData.pages.map(p => ({
          ...p,
          data: [...p.data, data]
        }))

        return {
          ...oldData,
          pages: newPages
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _var, ctx) => {
      const msg = err?.response?.data?.message
      queryClient.setQueryData([GET_COMMENT_REPLY_QUERY_NAME, pid, pcid], ctx.prevData)
      dispatch(globalReducer.action.showNotification({ message: msg, status: "error" }))

    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_COMMENT_REPLY_QUERY_NAME, pid, pcid])
    },
    onSuccess: () => {
      dispatch(globalReducer.action.showNotification({ message: "success reply comment" }))
    }
  })
}

export default useReplyComment