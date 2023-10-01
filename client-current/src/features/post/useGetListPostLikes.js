import api from '@/api'
import { GET_POST_LIKE_NAME } from '@/fixtures/api-query'
import { useQuery } from '@tanstack/react-query'

const useGetListPostLikes = ({ postId }) => {
  return useQuery([GET_POST_LIKE_NAME, postId], async () => {
    const res = await api.request.getPostLikeList(postId)
    return res
  })
}

export default useGetListPostLikes