import { useSelector } from "react-redux"

const useGetUserIsOnline = (user_id) => {
  const users = useSelector(s => s.global.usersOnline)
  const isOnline = users.some(u => u === user_id)
  return isOnline
}

export default useGetUserIsOnline