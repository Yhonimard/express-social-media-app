import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

const useReplyComment = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  return useMutation(async () => {

  }, {
    onMutate: () => { },
    onError: () => { },
    onSettled: () => { },
    onSuccess: () => { }
  })
}

export default useReplyComment