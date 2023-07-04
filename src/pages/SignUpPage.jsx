import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import useToken from "../auth/useToken";
import "./SignUpPage.scss";

export default function SignUpPage() {
  const emptyUser = {
    emailValue: "",
    fnameValue: "",
    lnameValue: "",
    telNum: "",
    passValue: [],
    confirmPassValue: "",
  };
  const [token, setToken] = useToken();
  const [isLoading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(emptyUser);
  const [regUser, setRegUser] = useState(emptyUser);

  const navigate = useNavigate("");

  return (
    <>
      <form
        className="flex min-h-full flex-1 flex-row justify-center items-center h-screen"
        onSubmit={async (e) => {
          e.preventDefault();
          if (regUser.passValue !== regUser.confirmPassValue) {
            setErrMessage({
              ...errMessage,
              confirmPassValue: "Passwords must match",
            });
            return 0;
          }
          setLoading(true);
          try {
            const res = await axios.post(
              process.env.REACT_APP_PROXY2 + "/api/auth/register",
              {
                email: regUser.emailValue,
                password: regUser.passValue,
                firstName: regUser.fnameValue,
                lastName: regUser.lnameValue,
                username: regUser.telNum,
              }
            );
            console.log(res);
            if (res) {
              setLoading(false);
            }
            if (res.status === 200) {
              alert("Please verify your number at telegram bot");
            }
            setRegUser(emptyUser);
            window.location.href = "https://t.me/Test_r_bbbot";
          } catch (e) {
            setLoading(false);
            alert(e.message);
            setRegUser(emptyUser);
          }
        }}
      >
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-30 w-auto"
            src={process.env.PUBLIC_URL + "/images/ipoteka_bank-logo.jpg"}
            alt="Your Company"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 p-4 pt-0">
            Register new account
          </h2>
          <div className="space-y-4" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={regUser.emailValue}
                  onChange={(event) =>
                    setRegUser({ ...regUser, emailValue: event.target.value })
                  }
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500 text-sm">{errMessage.emailValue}</p>
              </div>
            </div>

            <div className="flex justify-between">
              <div style={{ width: "48%" }}>
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="fname"
                    name="fname"
                    type="fname"
                    value={regUser.fnameValue}
                    minLength={3}
                    maxLength={25}
                    onChange={(event) =>
                      setRegUser({ ...regUser, fnameValue: event.target.value })
                    }
                    autoComplete="fname"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 focus-visible:outline-none"
                  />
                </div>
              </div>

              <div style={{ width: "48%" }}>
                <label
                  htmlFor="lname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lname"
                    name="lname"
                    type="lname"
                    value={regUser.lnameValue}
                    minLength={3}
                    maxLength={25}
                    onChange={(event) =>
                      setRegUser({ ...regUser, lnameValue: event.target.value })
                    }
                    autoComplete="lname"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 focus-visible:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="telNum"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Telephone Number
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="telNum"
                  name="telNum"
                  type="tel"
                  title="Phone number must start with +998 and must contain 12 numbers"
                  maxLength={13}
                  value={regUser.telNum}
                  onChange={(event) => {
                    setRegUser({ ...regUser, telNum: event.target.value });
                  }}
                  autoComplete="new-telNum"
                  required
                  pattern="^\+998\d{9}$"
                  placeholder="+998 xx xxx xx xx"
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  title="Password should contain at least 8 chars. at least 1 uppercase letter, at least 1 lowercase letter and at least 1 number"
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
                  value={regUser.passValue}
                  onChange={(event) => {
                    setRegUser({ ...regUser, passValue: event.target.value });
                  }}
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errMessage.passValue.forEach((misMatch) => {
                  <p className="text-red-500 text-sm">{misMatch}</p>;
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm your password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={regUser.confirmPassValue}
                  onChange={(event) => {
                    setRegUser({
                      ...regUser,
                      confirmPassValue: event.target.value,
                    });
                    if (regUser.passValue !== regUser.confirmPassValue) {
                      console.log("no match");
                      event.target.setCustomValidity("Passwords don't match!");
                    }
                  }}
                  onBlur={(event) => {
                    if (regUser.passValue === regUser.confirmPassValue) {
                      console.log("match");
                      event.target.setCustomValidity("");
                    }
                  }}
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500 text-sm">
                  {errMessage.confirmPassValue}
                </p>
              </div>
            </div>

            <div className="register_signUp_links">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6 disabled:bg-slate-300"
              >
                Sign up
                {isLoading && <Loading />}
              </button>
              <div className="text-sm mt-4 text-center">
                <Link
                  to="/"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Or login to your account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
