import api from '@/api'
import { GET_POST_NAME } from '@/fixtures/api-query'
import { useInfiniteQuery } from '@tanstack/react-query'

const useGetAllPost = () => {
  return useInfiniteQuery([GET_POST_NAME], async ({ pageParam = 1 }) => {
    const res = await api.request.getAllPost(pageParam)
    return res
  },
    {
      getNextPageParam: (_lastPage, pages) => {
        if (!_lastPage?.isLast) return pages.length + 1
        else return undefined
      }
    })
}

export default useGetAllPost