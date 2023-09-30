import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Unauthorized = ({ children }) => {
  const { isAuthorized } = useSelector((state) => state.auth.data);

  return !isAuthorized ? (
    <Navigate to="/auth?mode=login" />
  ) : (
    <div>{children}</div>
  );
};

export default Unauthorized;
