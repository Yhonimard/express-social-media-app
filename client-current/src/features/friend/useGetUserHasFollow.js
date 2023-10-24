import api from "@/api"
import { FRIEND_QUERY_NAME } from "@/fixtures/api-query"
import { LoadingOverlay } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"

const useGetUserHasFollow = ({ currUserId, receiverId }) => {
  return useQuery([FRIEND_QUERY_NAME, currUserId, receiverId], async () => {
    const res = await api.request.getUserHasFollow(receiverId)
    return res
  })
}



export default useGetUserHasFollow

