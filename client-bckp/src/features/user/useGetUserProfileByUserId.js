import api from "@/api"
import { GET_USER_PROFILE_BY_UID } from "@/fixtures/api-query"
import { useQuery } from "@tanstack/react-query"

const useGetUserProfileByUserId = (uid) => {
  return useQuery([GET_USER_PROFILE_BY_UID, uid], async () => {
    const res = await api.request.getUserProfileByUserId(uid)
    return res
  })
}

export default useGetUserProfileByUserId