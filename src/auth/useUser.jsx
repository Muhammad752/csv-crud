import { useState, useEffect } from "react";
import useToken from "./useToken";

const useUser = () => {
  const [token] = useToken();

  const getPayload = (token) => {
    const encodedPayload = token.split(".")[1];
    return JSON.parse(atob(encodedPayload));
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getPayload(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayload(token));
    }
  }, [token]);
if(user)
  return user;
  console.log("Not connected");
};

export default useUser;
