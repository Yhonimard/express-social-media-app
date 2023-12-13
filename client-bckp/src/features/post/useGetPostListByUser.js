import api from "@/api"
import { GET_POST_NAME } from "@/fixtures/api-query"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"

const useGetPostListByUser = () => {
  const currentUser = useSelector(state => state.auth.user)
  return useInfiniteQuery([GET_POST_NAME, currentUser.id], async ({ pageParam = 1 }) => {
    const res = await api.request.getPostByUser(pageParam)
    return res
  }, {
    getNextPageParam: (_lastPage, pages) => {
      if (!_lastPage.isLast) return pages.length + 1
      else return undefined
    }
  })
}

export default useGetPostListByUser
