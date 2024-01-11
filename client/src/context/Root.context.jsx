import global from "@/config/global"
import { SOCKET_USER_IS_ONLINE_GET } from "@/fixtures/socket"
import { createContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import io from "socket.io-client"

export const rootContext = createContext({
  socket: null
})

const RootContextProvider = ({ children }) => {
  const currentUser = useSelector(s => s.auth.user)
  const dispatch = useDispatch()
  const socket = io(import.meta.env.VITE_API_BASE_URL, {
    auth: {
      token: currentUser.token
    },
  })

  useEffect(() => {
    socket.on(SOCKET_USER_IS_ONLINE_GET, (data) => {
      dispatch(global.reducer.action.setUsersOnline(data))
    })
  }, [socket, dispatch])

  return (
    <rootContext.Provider value={{
      socket
    }}>
      {children}
    </rootContext.Provider>
  )
}

export default RootContextProvider