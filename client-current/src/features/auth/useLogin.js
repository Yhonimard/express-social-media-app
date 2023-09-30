import api from "@/api"
import authReducer from "@/redux/authReducer"
import globalReducer from "@/redux/globalReducer"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const useLogin = (resetField) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return useMutation(async (data) => {
    const res = await api.request.login(data)
    return res
  }, {
    onMutate: (_var) => {
      dispatch(globalReducer.action.showLoadingOverlay(true))
      const { username } = _var
      dispatch(globalReducer.action.showNotification({ message: `hi ${username} please waiting`, status: "info" }))
    },
    onSuccess: ({ data }, _var) => {
      dispatch(authReducer.action.setUserAuthentication(data))
      const { username } = _var
      resetField()
      dispatch(globalReducer.action.showNotification({ message: `hi ${username}, login success`, status: "success" }))
      navigate("/")
      dispatch(globalReducer.action.showLoadingOverlay(false))
    },
    onError: (err, _var) => {
      const message = err?.response?.data?.message
      dispatch(globalReducer.action.showNotification({ message, status: "error" }))
      dispatch(globalReducer.action.showLoadingOverlay(false))
    }
  })
}

export default useLogin