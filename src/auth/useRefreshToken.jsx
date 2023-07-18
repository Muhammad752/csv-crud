import { useState } from "react";

const useRefreshToken = () => {
  const [refreshToken, setRefreshTokenInternal] = useState(() => {
    return localStorage.getItem("ipoteka_refresh_token");
  });

  const setRefreshToken = (newToken) => {
    console.log(newToken);
    localStorage.setItem("ipoteka_refresh_token", newToken);
    console.log("refresh token changed");
    setRefreshTokenInternal(newToken);
  };

  return [refreshToken, setRefreshToken];
};

export default useRefreshToken;
