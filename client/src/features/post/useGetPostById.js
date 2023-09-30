import api from "@/api"
import { USE_GET_POST_BY_ID_NAME } from "@/fixtures/request-api"
import { useQuery } from "@tanstack/react-query"

const useGetPostById = (postId) => {
  return useQuery([USE_GET_POST_BY_ID_NAME, postId], async () => {
    const res = await api.request.get(`/post/${postId}`)
    return res.data
  })
}

export default useGetPostById