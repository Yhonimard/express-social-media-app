import api from '@/api'
import { GET_POST_NAME } from '@/fixtures/api-query'
import globalReducer from '@/redux/globalReducer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

const useCreatePost = () => {
  const queryClient = useQueryClient()

  const dispatch = useDispatch()

  return useMutation(async (data) => {
    const res = await api.request.createPost(data)
    return res
  }, {
    onSuccess: (postData) => {
      queryClient.setQueryData([GET_POST_NAME], (oldData) => {
        const newData = oldData?.pages?.map(p => {
          return { ...p, data: [...p.data, postData.data] }
        })
        return {
          ...oldData,
          pages: newData
        }
      })
      dispatch(globalReducer.action.showNotification({ message: "successfully creating new post", status: "success" }))
    },
    onError: (_err) => {
      const message = _err?.response?.data?.message
      dispatch(globalReducer.action.showNotification({ message, status: "error" }))
    }
  })
}

export default useCreatePost