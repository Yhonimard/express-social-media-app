import { useMutation } from "@tanstack/react-query"
import api from "@/api"
import { useDispatch } from "react-redux"
import global from "@/redux/global"
import auth from "@/redux/auth"

const useLogin = () => {
  const dispatch = useDispatch()
  return useMutation(async (data) => {
    const res = await api.request.post("/auth/login", data)
    return res.data
  }, {
    onMutate: () => {
      dispatch(global.action.showBackdrop(true))
    },
    onSuccess: ({ data }) => {
      dispatch(auth.action.setUser(data))
      dispatch(global.action.showNotification({ message: "login success", status: "success" }))
      dispatch(global.action.showBackdrop(false))
    },
    onError: ({ response: { data } }) => {
      dispatch(global.action.showBackdrop(false))
      dispatch(global.action.showNotification({ message: data?.message || "something went wrong, please try to login again", status: "error" }))
    }
  })

}
export default useLogin