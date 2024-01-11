import api from "@/api"
import chat from "@/config/chat"
import { rootContext } from "@/context/Root.context"
import { GET_CURRENT_USER_CHATS_QUERY_NAME, GET_MESSAGE_QUERY_NAME } from "@/fixtures/api-query"
import { SEND_MESSAGE_E_NAME } from "@/fixtures/socket"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { uniqueId } from "lodash"
import moment from "moment"
import { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"

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

const GetMessages = ({ currentUserId, userId }) => {
  return useQuery([GET_MESSAGE_QUERY_NAME, currentUserId, userId], async () => {
    const res = await api.request.getMessages(userId)
    return res
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

      queryClient.setQueriesData([GET_CURRENT_USER_CHATS_QUERY_NAME, currentUserId], oldData => {
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
  const dispatch = useDispatch()
  return useMutation(async (data) => {
    await api.request.sendMessage({ receiverId: userId, text: data.text })
  }, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries([GET_MESSAGE_QUERY_NAME, currentUserId, userId])

      const prevMsgData = queryClient.getQueryData([GET_MESSAGE_QUERY_NAME, currentUserId, userId])

      queryClient.setQueryData([GET_MESSAGE_QUERY_NAME, currentUserId, userId], oldData => {
        const newPages = oldData.pages.map(p => {
          const newMsg = {
            id: Date.now(),
            created_at: moment().format("DD/MM/YYYY"),
            text: newData.text,
            media: newData.media,
            sender_id: currentUserId,
            receiver_id: userId
          }

          socket.emit(SEND_MESSAGE_E_NAME, newMsg)

          return {
            ...p,
            data: [newMsg, ...p.data]
          }
        })

        return {
          ...oldData,
          pages: newPages
        }
      })

      return {
        prevMsgData
      }
    },
    onError: (err, _var, ctx) => {
      queryClient.setQueryData([GET_MESSAGE_QUERY_NAME, currentUserId, userId])

    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_MESSAGE_QUERY_NAME, currentUserId, userId])
      queryClient.invalidateQueries([GET_CURRENT_USER_CHATS_QUERY_NAME, currentUserId])
    },
  })

}


export default {
  GetUserChats,
  GetMessages,
  CreateChat,
  SendMessage
}