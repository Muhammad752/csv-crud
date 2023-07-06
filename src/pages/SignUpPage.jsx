import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import useToken from "../auth/useToken";
import "./SignUpPage.scss";
import { bool } from "@inovua/reactdatagrid-community/filterTypes";

export default function SignUpPage() {
  const emptyUser = {
    emailValue: "",
    fnameValue: "",
    lnameValue: "",
    phoneNumber: "",
    passValue: "",
    confirmPassValue: "",
  };
  const emptyError = {
    emailValue: "",
    fnameValue: "",
    lnameValue: "",
    phoneNumber: "",
    passValue: [""],
    confirmPassValue: "",
  };
  const [token, setToken] = useToken();
  const [isLoading, setLoading] = useState(false);
  const [regUser, setRegUser] = useState(emptyUser);
  const [errMessage, setErrMessage] = useState(emptyError);

  const navigate = useNavigate("");

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
                  onChange={(event) => {
                    setRegUser({ ...regUser, emailValue: event.target.value });
                  }}
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
                    onChange={(event) => {
                      setRegUser({
                        ...regUser,
                        fnameValue: event.target.value,
                      });
                    }}
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
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Telephone Number
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  title="Phone number must start with +998 and must contain 12 numbers"
                  maxLength={13}
                  value={regUser.phoneNumber}
                  onChange={(event) => {
                    setRegUser({ ...regUser, phoneNumber: event.target.value });
                  }}
                  autoComplete="new-phoneNumber"
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
                    const myPass = [];
                    let isError = false;
                    let writtenPassword = event.target.value;

                    const errorsMsg = {
                      eightChars:
                        "The password must have more than 8 characters",
                      capLetters:
                        "The password must contain capital characters",
                      lowerLetters:
                        "The password must contain lower case characters",
                      numChars:
                        "The password must contain numerical characters",
                    };

                    if (!writtenPassword.match(".{8}")) {
                      myPass.push(errorsMsg.eightChars);
                      isError = true;
                    }
                    if (!writtenPassword.match("(?=.*[A-Z])")) {
                      myPass.push(errorsMsg.capLetters);
                      isError = true;
                    }
                    if (!writtenPassword.match("(?=.*[a-z])")) {
                      myPass.push(errorsMsg.lowerLetters);
                      isError = true;
                    }
                    if (!writtenPassword.match("(?=.*[0-9])")) {
                      myPass.push(errorsMsg.numChars);
                      isError = true;
                    }
                    if (
                      isError &&
                      !event.target.classList.contains("invalid")
                    ) {
                      event.target.classList.add("invalid");
                    } else if (!isError) {
                      event.target.classList.remove("invalid");
                    }

                    console.log("pass value: " + event.target.value);
                    console.log("confirm value: " + regUser.confirmPassValue);
                    if (event.target.value === regUser.confirmPassValue) {
                      setErrMessage({
                        ...errMessage,
                        confirmPassValue: "",
                      });
                      document
                        .getElementById("confirmPassword")
                        .classList.remove("invalid");
                    } else if (
                      !document
                        .getElementById("confirmPassword")
                        .classList.contains("invalid")
                    ) {
                      setErrMessage({
                        ...errMessage,
                        confirmPassValue: "passwords didn't match",
                      });
                      document
                        .getElementById("confirmPassword")
                        .classList.add("invalid");
                    }
                    console.log(
                      "conf error message: " + errMessage.confirmPassValue
                    );

                    setErrMessage({
                      ...errMessage,
                      passValue: myPass,
                    });
                  }}
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {Array.isArray(errMessage.passValue)
                  ? errMessage.passValue.map((misMatch, index) => (
                      <p key={index} className="text-red-500 text-sm mt-2">
                        {misMatch}
                      </p>
                    ))
                  : ""}
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
                    if (regUser.passValue === event.target.value) {
                      setErrMessage({
                        ...errMessage,
                        confirmPassValue: "",
                      });
                      event.target.classList.remove("invalid");
                    } else if (!event.target.classList.contains("invalid")) {
                      setErrMessage({
                        ...errMessage,
                        confirmPassValue: "passwords didn't match",
                      });
                      event.target.classList.add("invalid");
                    }
                  }}
                  // onBlur={(event) => {
                  //   if (regUser.passValue === regUser.confirmPassValue) {
                  //     event.target.setCustomValidity("");
                  //   }
                  //   if (regUser.passValue !== regUser.confirmPassValue) {
                  //     setErrMessage({
                  //       ...errMessage,
                  //       confirmPassValue: "passwords didn't match",
                  //     });
                  //     event.target.classList.add("invalid");
                  //     event.target.setCustomValidity("Passwords don't match!");
                  //   } else {
                  //     setErrMessage({
                  //       ...errMessage,
                  //       confirmPassValue: "",
                  //     });
                  //     event.target.classList.remove("invalid");
                  //   }
                  // }}
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500 text-sm mt-2">
                  {errMessage.confirmPassValue}
                </p>
              </div>
            </div>

            <div className="register_signUp_links">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6 disabled:bg-slate-300"
                onClick={async (e) => {
                  for (let errName in errMessage) {
                    if (errMessage[errName].length !== 0) {
                      console.log(errMessage[errName]);
                      return;
                    }
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
                        phoneNumber: regUser.phoneNumber,
                      }
                    );
                    if (res) {
                      setLoading(false);
                    }
                    if (res.status === 200) {
                      alert("Please verify your number at telegram bot");
                    }
                    setRegUser(emptyUser);
                    // window.location.href = "https://t.me/Test_r_bbbot";
                  } catch (e) {
                    setLoading(false);
                    alert(e.message);
                    setRegUser(emptyUser);
                  }
                }}
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
      </div>
    </>
  );
}
