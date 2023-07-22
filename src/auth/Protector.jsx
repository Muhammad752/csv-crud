import { Navigate, Outlet } from 'react-router-dom';
import useUser from './useUser';
import Headers from '../components/Headers/Headers';

const Protector = (props) => {
  if (!props.user) {
    return <Navigate to="/" replace />;
  }
  console.log('from protector');
  console.log(props.location);
  return (
    <>
      {/* <Headers /> */}
      {props.children ? props.children : <Outlet />}
    </>
  );
};

export default Protector;
