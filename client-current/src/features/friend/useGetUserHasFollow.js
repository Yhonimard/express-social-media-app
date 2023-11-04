import api from "@/api"
import { FRIEND_QUERY_NAME } from "@/fixtures/api-query"
import { useQuery } from "@tanstack/react-query"

const useGetUserHasFollow = ({ currUserId, receiverId }) => {
  return useQuery([FRIEND_QUERY_NAME, currUserId, receiverId], async () => {
    const res = await api.request.getUserHasFollow(receiverId)
    return res
  }, {})
}

export default useGetUserHasFollow

