import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const Unauthorized = ({ children }) => {
  const isAuthorized = useSelector(state => state.auth.user.isAuthorized)
  return !isAuthorized ? <Navigate to={"/auth?mode=login"} /> : children
}

export default Unauthorized

