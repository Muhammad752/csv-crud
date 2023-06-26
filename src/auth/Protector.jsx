import { Navigate, Outlet } from "react-router-dom";

const Protector = ({ children }) => {
  const user = true;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
};

export default Protector;
