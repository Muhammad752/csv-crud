import { Navigate, Outlet } from "react-router-dom";
import useUser from "./useUser";

const Protector = ({ children }) => {
  const user = useUser;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
};

export default Protector;
