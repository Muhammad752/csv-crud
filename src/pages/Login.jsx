import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../components/Loading";
import useToken from "../auth/useToken";
import axios from "axios";

export default function Login({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useToken("");
  const emptyLogin = {
    telNum: "",
    passValue: "",
  };
  const [loginData, setLoginData] = useState(emptyLogin);
  if (user) return <Navigate to="/dataPage" replace />;
  return (
    <>
      {loading && <Loading />}
      <div className="flex min-h-full flex-1 flex-row justify-center items-center h-screen">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-30 w-auto"
            src={process.env.PUBLIC_URL + "/images/ipoteka_bank-logo.jpg"}
            alt="Your Company"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 p-4">
            Sign in to your account
          </h2>
          <div className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="telNum"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2">
                <input
                  id="telNum"
                  name="telNum"
                  type="tel"
                  value={loginData.telNum}
                  onChange={(event) => {
                    setLoginData({ ...loginData, telNum: event.target.value });
                  }}
                  placeholder="998 xx xxx xx xx"
                  autoComplete="new-telNum"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="/forgotPassword"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={loginData.passValue}
                  onChange={(e) => {
                    setLoginData({ ...loginData, passValue: e.target.value });
                  }}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={async (e) => {
                  try {
                    setLoading(true);
                    const res = await axios.post(
                      process.env.REACT_APP_PROXY2 + "/api/auth/access/token",
                      {
                        phoneNumber: loginData.telNum,
                        password: loginData.passValue,
                      }
                    );
                    const { access_token } = res.data;
                    console.log(access_token);
                    setToken(access_token);
                    console.log(loginData);
                    window.location.reload();
                  } catch (e) {
                    setLoading(false);
                    alert(e.message);
                  }
                  setLoading(false);
                }}
              >
                Sign in
              </button>
              <div className="text-sm mt-4 text-center">
                <Link
                  to="/signUp"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Or register new user
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
