import { Navigate, Outlet } from 'react-router-dom';
import useUser from './useUser';
import Headers from '../components/Headers/Headers';

const Protector = ({ user, children }) => {
  console.log(user);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Headers />
      {children ? children : <Outlet />}
    </>
  );
};

export default Protector;
