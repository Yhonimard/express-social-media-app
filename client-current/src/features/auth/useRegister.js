import api from "@/api"
import globalReducer from "@/redux/globalReducer"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const useRegister = (resetField) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return useMutation(async (data) => {
    const res = await api.request.register(data)
    return res
  }, {
    onMutate: (_var) => {
      const { username } = _var
      dispatch(globalReducer.action.showLoadingOverlay(true))
      dispatch(globalReducer.action.showNotification({ message: `hi ${username}, please wait for your account to be register`, status: "info" }))
    },
    onSuccess: (data, _var) => {
      const { username } = _var
      dispatch(globalReducer.action.showNotification({ message: `hi ${username}, your account has been registered, please login first`, status: "success" }))
      navigate("?mode=login")
      dispatch(globalReducer.action.showLoadingOverlay(false))
      resetField()
    },
    onError: (err) => {
      const message = err?.response?.data?.message
      dispatch(globalReducer.action.showNotification({ message, status: "error" }))
      dispatch(globalReducer.action.showLoadingOverlay(false))
    }
  })
}

export default useRegister