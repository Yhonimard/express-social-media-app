import chat from "@/config/chat"
import { createContext, useCallback, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
export const chatContext = createContext({
  chatsQuery: {},
  setIsLoading: () => { },
  isLoading: false,
  openMessageLayout: (user) => { },
  msgEndRef: null,
  scrollToBottomMsg: () => { },
})


const ChatContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const currentUser = useSelector(s => s.auth.user)
  const chatQuery = chat.query.GetUserChats({ userId: currentUser.id })
  const dispatch = useDispatch()
  const msgEndRef = useRef()

  const scrollToBottomMsg = () => {
    setTimeout(() => {
      msgEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })
    }, 500);
  }

  const openMessageLayout = useCallback((user) => {
    dispatch(chat.reducer.action.openMessageLayout(user))
  }, [dispatch])

  const isLoadings = chatQuery.isLoading || isLoading

  return (
    <>
      <chatContext.Provider value={{
        chatsQuery: chatQuery,
        setIsLoading,
        openMessageLayout,
        isLoading: isLoadings,
        msgEndRef,
        scrollToBottomMsg
      }}>
        {!isLoadings && children}
      </chatContext.Provider>
    </>
  )
}


export default ChatContextProvider
