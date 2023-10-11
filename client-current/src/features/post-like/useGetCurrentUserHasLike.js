import api from "@/api"
import { GET_POST_LIKE_NAME } from "@/fixtures/api-query"
import { useQuery } from "@tanstack/react-query"

const useGetCurrentUserHasLike = (pid, uid) => {
  return useQuery([GET_POST_LIKE_NAME, pid, uid], async () => {
    const res = await api.request.getCurrentUserHasLike(pid)
    return res
  })
}

export default useGetCurrentUserHasLike