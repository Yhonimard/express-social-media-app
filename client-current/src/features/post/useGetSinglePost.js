import api from "@/api"
import { GET_POST_NAME } from "@/fixtures/api-query"
import { useQuery } from "@tanstack/react-query"

const useGetSinglePost = (postId) => {
  return useQuery([GET_POST_NAME, postId], async () => { 
    const res = await api.request.getSinglePost(postId)
    return res
  })
}

export default useGetSinglePost