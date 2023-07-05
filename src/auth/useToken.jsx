import { useState } from "react";

const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem("ipoteka_token");
  });

  const setToken = (newToken) => {
    console.log(newToken);
    localStorage.setItem("ipoteka_token", newToken);
    setTokenInternal(newToken);
  };

  return [token, setToken];
};

export default useToken;
