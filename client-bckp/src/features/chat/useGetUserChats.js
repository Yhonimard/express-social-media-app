import api from "@/api"
import { GET_CURRENT_USER_CHATS_QUERY_NAME } from "@/fixtures/api-query"
import { useQuery } from "@tanstack/react-query"

const useGetUserChats = ({ cuid }) => {
  return useQuery([GET_CURRENT_USER_CHATS_QUERY_NAME, cuid], async () => {
    const res = await api.request.getUserChats()
    return res
  })
}

export default useGetUserChats