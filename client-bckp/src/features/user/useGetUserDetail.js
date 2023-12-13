import api from "@/api"
import { GET_USER_DETAIL_NAME } from "@/fixtures/api-query"
import { useQuery } from "@tanstack/react-query"

const useGetUserDetail = (uid) => {
  return useQuery([GET_USER_DETAIL_NAME, uid], async () => {
    const res = await api.request.getUserDetail(uid)
    return res
  })
}

export default useGetUserDetail