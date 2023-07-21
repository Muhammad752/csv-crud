import { Navigate, Outlet } from 'react-router-dom';
import useUser from './useUser';

const Protector = ({ user, children }) => {
  console.log(user);
  // const user = useUser();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

export default Protector;
