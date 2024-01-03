import { createContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import io from "socket.io-client"

export const rootContext = createContext({
  socket: null
})

const RootContextProvider = ({ children }) => {
  const currentUser = useSelector(s => s.auth.user)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL, {
      auth: {
        token: currentUser.token
      },
    })
    setSocket(socket)
  }, [currentUser.token])


  return (
    <rootContext.Provider value={{
      socket
    }}>
      {children}
    </rootContext.Provider>
  )
}

export default RootContextProvider