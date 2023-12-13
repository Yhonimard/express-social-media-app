import LoadingOverlay from "@/components/loadingOverlay/LoadingOverlay"
import chat from "@/config/chat"
import { createContext, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const chatContext = createContext({
  chatsQuery: {},
  setIsLoading: () => { },
  isLoading: false,
  openMessageLayout: (user) => { },
  getMessages: (userId) => ({
    data: { pages: null },
    fetchNextPage: null,
    hasNextPage: null,
    isFetchingNextPage: null,
  }),
  sendMessage: (userId) => { }
})


const ChatContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const currentUser = useSelector(s => s.auth.user)
  const chatQuery = chat.query.GetUserChats({ userId: currentUser.id })
  const dispatch = useDispatch()


  const openMessageLayout = useCallback((user) => {
    console.log(user);
    dispatch(chat.reducer.action.openMessageLayout(user))
  }, [dispatch])


  const getMessages = useCallback((userId) => {
    const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } = chat.query.GetMessages({ currentUserId: currentUser.id, userId, size: 6 })
    return {
      data,
      isLoading,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage

    }
  }, [currentUser.id])

  const sendMessage = useCallback((userId) => {
    const { mutate } = chat.query.SendMessage({ userId, currentUserId: currentUser.id })
    return mutate
  }, [currentUser.id])

  const isLoadings = chatQuery.isLoading || isLoading

  return (
    <>
      <chatContext.Provider value={{
        chatsQuery: chatQuery,
        setIsLoading,
        openMessageLayout,
        isLoading: isLoadings,
        getMessages,
        sendMessage
      }}>
        {isLoadings && <LoadingOverlay />}
        {!isLoadings && children}
      </chatContext.Provider>
    </>
  )
}


export default ChatContextProvider