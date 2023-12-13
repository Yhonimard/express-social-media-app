import api from "@/api"
import auth from "@/config/auth/auth"
import globalReducer from "@/redux/globalReducer"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return useMutation(async (data) => {
    const res = await api.request.login(data)
    return res
  }, {
    onMutate: (_var) => {
      dispatch(globalReducer.action.showLoadingOverlay())
      const { username } = _var
      dispatch(globalReducer.action.showNotification({ message: `hi ${username} please waiting`, status: "info" }))
    },
    onSuccess: (data, _var) => {
      dispatch(auth.reducer.action.setUserAuth(data))
      const { username } = _var
      dispatch(globalReducer.action.showNotification({ message: `hi ${username}, login success` }))
      navigate("/")
      dispatch(globalReducer.action.closeLoadingOverlay())
    },
    onError: (err,) => {
      const message = err?.response?.data?.message
      dispatch(globalReducer.action.showNotification({ message, status: "error" }))
      dispatch(globalReducer.action.closeLoadingOverlay())
    }
  })
}



const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return useMutation(async (data) => {
    const res = await api.request.register(data)
    return res
  }, {
    onMutate: (_var) => {
      const { username } = _var
      dispatch(globalReducer.action.showLoadingOverlay())
      dispatch(globalReducer.action.showNotification({ message: `hi ${username}, please wait for your account to be register` }))
    },
    onSuccess: (data, _var) => {
      const { username } = _var
      dispatch(globalReducer.action.showNotification({ message: `hi ${username}, your account has been registered, please login first`, status: "success" }))
      navigate("?mode=login")
      dispatch(globalReducer.action.closeLoadingOverlay())
    },
    onError: (err) => {
      const message = err?.response?.data?.message
      dispatch(globalReducer.action.showNotification({ message, status: "error" }))
      dispatch(globalReducer.action.closeLoadingOverlay())
    }
  })
}


export default {
  Login,
  Register
}
