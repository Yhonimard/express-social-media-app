import api from "@/api"
import { GET_USER_PROFILE_NAME } from "@/fixtures/api-query"
import { useQuery } from "@tanstack/react-query"

const useGetCurrentUserProfile = () => {
  return useQuery([GET_USER_PROFILE_NAME], async () => {
    const res = await api.request.getCurrentUserProfile()
    return res.data
  })
}

export default useGetCurrentUserProfile