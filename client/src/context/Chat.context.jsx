import chat from "@/config/chat"
import { createContext, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
export const chatContext = createContext({
  chatsQuery: {},
  setIsLoading: () => { },
  isLoading: false,
  openMessageLayout: (user) => { },
  scrollIntoEndMessage: () => { }
})


const ChatContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const currentUser = useSelector(s => s.auth.user)
  const chatQuery = chat.query.GetUserChats({ userId: currentUser.id })
  const dispatch = useDispatch()


  const openMessageLayout = useCallback((user) => {
    dispatch(chat.reducer.action.openMessageLayout(user))
  }, [dispatch])



  const isLoadings = chatQuery.isLoading || isLoading

  const scrollIntoEndMessage = () => {
    const element = document.getElementById('bottom-msg')
    if (element) element.scrollIntoView()
  }


  return (
    <>
      <chatContext.Provider value={{
        chatsQuery: chatQuery,
        setIsLoading,
        openMessageLayout,
        isLoading: isLoadings,
        scrollIntoEndMessage
      }}>
        {!isLoadings && children}
      </chatContext.Provider>
    </>
  )
}


export default ChatContextProvider