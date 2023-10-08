import api from "@/api"
import { GET_USER_PROFILE_NAME } from "@/fixtures/api-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useUpdateCurrentUserProfile = (uid) => {
  const queryClient = useQueryClient()
  return useMutation(async (data) => {
    const res = await api.request.updateCurrentUserProfile(data)
    return res
  }, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries([GET_USER_PROFILE_NAME, uid])
      const prevData = queryClient.getQueryData([GET_USER_PROFILE_NAME, uid])

      queryClient.setQueryData([GET_USER_PROFILE_NAME, uid], (oldData) => {
        return {
          ...oldData,
          data: {
            ...oldData.data,
            bio: newData.bio,
            birthday: newData.birthday,
            phone: newData.phone
          }
        }
      })

      return {
        prevData
      }
    },
    onError: (err, _var, context) => {
      queryClient.setQueryData([GET_USER_PROFILE_NAME, uid], context.prevData)
    },
    onSettled: () => {
      queryClient.invalidateQueries([GET_USER_PROFILE_NAME, uid])
    }
  })
}

export default useUpdateCurrentUserProfile