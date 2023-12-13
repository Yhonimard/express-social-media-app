import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Authorized = ({ children }) => {
  const isAuthorized = useSelector(state => state.auth.user.isAuthorized)
  return isAuthorized ? <Navigate to={"/"} /> : children
}

export default Authorized
