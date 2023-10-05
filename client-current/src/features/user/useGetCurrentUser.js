import { useQuery } from "@tanstack/react-query"
import { GET_USER_NAME } from "@/fixtures/api-query"
import api from "@/api"

const useGetCurrentUser = async () => {
  return useQuery([GET_USER_NAME], async () => {
    const res = await api.request.getCurrentUser()
    return res
  })
}

export default useGetCurrentUser