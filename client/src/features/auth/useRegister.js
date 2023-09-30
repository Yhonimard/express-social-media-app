import api from "@/api"
import auth from "@/redux/auth"
import global from "@/redux/global"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

const useRegister = () => {
  const dispatch = useDispatch()
  return useMutation(async (data) => {
    const formData = new FormData()
    formData.append("username", data.username)
    formData.append("password", data.confirmPassword)
    formData.append("photoProfile", data.photoProfile)
    const res = await api.request.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    return res.data
  }, {
    onMutate: () => {
      dispatch(global.action.showBackdrop(true))
    },
    onSuccess: (userData) => {
      dispatch(auth.action.setUser(userData?.data))
      dispatch(global.action.showBackdrop(false))
      dispatch(global.action.showNotification({ message: "register success", status: "success" }))
    },
    onError: ({ response: { data } }) => {
      dispatch(global.action.showBackdrop(false))
      dispatch(global.action.showNotification({ message: data?.message || "something went wrong, please try to register again", status: "error" }))
    }
  })
}

export default useRegister