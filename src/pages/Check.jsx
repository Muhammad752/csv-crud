import useUser from "../auth/useUser";
import { Navigate } from "react-router-dom";

const CheckIfItWorks = () => {
  const user = useUser();
  if (user) {
    <Navigate to="/dataPage" replace />;
  }
  return <Navigate to="/login" replace />;
};

export default CheckIfItWorks;
