import api from "@/api"
import message from "@/config/message"
import { rootContext } from "@/context/Root.context"
import { GET_CURRENT_USER_CHATS_QUERY_NAME } from "@/fixtures/api-query"
import { SEND_MESSAGE_E_NAME } from "@/fixtures/socket"
import { createId } from "@paralleldrive/cuid2"
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import moment from "moment"
import { useContext } from "react"
import { useDispatch } from "react-redux"

const GetUserChats = ({ userId }) => {
  return useInfiniteQuery([GET_CURRENT_USER_CHATS_QUERY_NAME, userId], async ({ pageParam = 1 }) => {
    const query = {
      pageNo: pageParam,
      size: 5
    }
    const res = await api.request.getUserChats(query)
    return res
  }, {
    getNextPageParam: (data, pages) => {
      if (!data.isLast) return pages.length + 1
      else return undefined
    }
  })
}

const CreateChat = ({ currentUserId, userId }) => {
  const queryClient = useQueryClient()
  return useMutation(async () => {
    await api.request.createChat(userId)
  }, {
    onMutate: async () => {
      await queryClient.cancelQueries([GET_CURRENT_USER_CHATS_QUERY_NAME, currentUserId])
      const prevChatData = queryClient.getQueryData([GET_CURRENT_USER_CHATS_QUERY_NAME, currentUserId])

      queryClient.setQueriesData([GET_CURRENT_USER_CHATS_QUERY_NAME, currentUserId], () => {
      })
      return {
        prevChatData
      }
    },
    onError: () => { },
    onSettled: () => {
      queryClient.invalidateQueries([GET_CURRENT_USER_CHATS_QUERY_NAME, currentUserId])
    }
  })
}

const SendMessage = ({ userId, currentUserId }) => {
  const queryClient = useQueryClient()
  const { socket } = useContext(rootContext)
  const newMsgId = createId()
  const dispatch = useDispatch()
  return useMutation(async (data) => {
    return await api.request.sendMessage({ receiverId: userId, text: data.text, render_id: newMsgId })
  }, {
    onMutate: async (newData) => {

      const newMsg = {
        render_id: newMsgId,
        text: newData.text,
        media: newData.media,
        created_at: moment().format('DD/MM/YYYY'),
        sender_id: currentUserId,
        receiver_id: userId
      }

      socket.emit(SEND_MESSAGE_E_NAME, newMsg)

      dispatch(message.reducer.action.addNewMsg(newMsg))
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_CURRENT_USER_CHATS_QUERY_NAME, currentUserId])
    },
  })

}


export default {
  GetUserChats,
  CreateChat,
  SendMessage
}
