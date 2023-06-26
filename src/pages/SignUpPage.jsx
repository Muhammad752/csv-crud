import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useToken from "../auth/useToken";
import "./SignUpPage.scss";

export default function SignUpPage() {
  const emptyUser = {
    emailValue: "",
    fnameValue: "",
    lnameValue: "",
    telNum: "",
    passValue: "",
    confirmPassValue: "",
  };
  const [token, setToken] = useToken();
  const [regUser, setRegUser] = useState(emptyUser);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const navigate = useNavigate("");

  const signUpClick = async () => {
    const response = await axios.post("/api/signup", {
      email: emailValue,
      password: passwordValue,
    });
    const { token } = response.data;
    setToken(token);
    navigate("/");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-row justify-center items-center h-screen">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-30 w-auto"
            src={process.env.PUBLIC_URL + "/images/ipoteka_bank-logo.jpg"}
            alt="Your Company"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 p-4 pt-0">
            Register new account
          </h2>
          <form className="space-y-4" action="#" method="POST">
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
              </div>
            </div>

            <div className="flex justify-between">
              <div>
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
                    value={regUser.fname}
                    onChange={(event) =>
                      setRegUser({ ...regUser, fname: event.target.value })
                    }
                    autoComplete="fname"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
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
                    onChange={(event) =>
                      setRegUser({ ...regUser, lnameValue: event.target.value })
                    }
                    autoComplete="lname"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  type="telNum"
                  value={regUser.telNum}
                  onChange={(event) =>
                    setRegUser({ ...regUser, telNum: event.target.value })
                  }
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={regUser.passValue}
                  onChange={(event) =>
                    setRegUser({ ...regUser, passValue: event.target.value })
                  }
                  autoComplete="new-password"
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
                  Confirm your password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={regUser.confirmPassValue}
                  onChange={(event) =>
                    setRegUser({
                      ...regUser,
                      confirmPassValue: event.target.value,
                    })
                  }
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="register_signUp_links">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6 disabled:bg-slate-300"
                disabled={passwordValue !== confirmPasswordValue}
                onClick={() => {
                  console.log(regUser);
                }}
              >
                Sign up
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
          </form>
        </div>
      </div>
    </>
  );
}
