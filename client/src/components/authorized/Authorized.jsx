/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Authorized = ({ children }) => {
  const { isAuthorized } = useSelector((state) => state.auth.data);
  return isAuthorized ? <Navigate to={`/`} /> : <main>{children}</main>;
};

export default Authorized;
