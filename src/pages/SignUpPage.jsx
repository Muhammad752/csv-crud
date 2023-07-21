import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../components/Loading';
import axios from 'axios';
import './SignUpPage.scss';
import CustomAlert from '../components/CustomAlert/CustomAlert';
// import useToken from "../auth/useToken";

export default function SignUpPage() {
  const emptyUser = {
    emailValue: '',
    fnameValue: '',
    lnameValue: '',
    phoneNumber: '',
    passValue: '',
    confirmPassValue: '',
  };
  const emptyError = {
    emailValue: '',
    fnameValue: '',
    lnameValue: '',
    phoneNumber: '',
    passValue: [],
    confirmPassValue: '',
  };
  // const [token, setToken] = useToken();
  const [isLoading, setLoading] = useState(false);
  const [signAlert, setAlert] = useState({ type: '', value: '' });
  const [regUser, setRegUser] = useState(emptyUser);
  const [errMessage, setErrMessage] = useState(emptyError);

  const navigate = useNavigate('');

  return (
    <>
      {signAlert.type && (
        <CustomAlert
          type={signAlert.type}
          content={signAlert.value}
          setAlert={setAlert}
        />
      )}
      <div className="flex min-h-full flex-1 flex-row justify-center items-center h-screen">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-30 w-auto"
            src={process.env.PUBLIC_URL + '/images/ipoteka_bank-logo.jpg'}
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
                    if (!event.target.value.includes('@')) {
                      setErrMessage({
                        ...errMessage,
                        emailValue:
                          'Please write your email in correct format. (include @)',
                      });
                      event.target.classList.add('invalid');
                    } else if (event.target.classList.contains('invalid')) {
                      setErrMessage({
                        ...errMessage,
                        emailValue: '',
                      });
                      event.target.classList.remove('invalid');
                    }
                  }}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500 text-sm mt-2">
                  {errMessage.emailValue}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <div style={{ width: '48%' }}>
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
                      if (event)
                        setRegUser({
                          ...regUser,
                          fnameValue: event.target.value,
                        });

                      if (
                        event.target.value.length < 3 ||
                        event.target.value.length > 25
                      ) {
                        setErrMessage({
                          ...errMessage,
                          fnameValue: 'Length between 3 and 25',
                        });
                        event.target.classList.add('invalid');
                      } else if (event.target.classList.contains('invalid')) {
                        setErrMessage({
                          ...errMessage,
                          fnameValue: '',
                        });
                        event.target.classList.remove('invalid');
                      }
                    }}
                    autoComplete="fname"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 focus-visible:outline-none"
                  />
                  <p className="text-red-500 text-sm mt-2">
                    {errMessage.fnameValue}
                  </p>
                </div>
              </div>

              <div style={{ width: '48%' }}>
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
                    onChange={(event) => {
                      setRegUser({
                        ...regUser,
                        lnameValue: event.target.value,
                      });
                      if (
                        event.target.value.length < 3 ||
                        event.target.value.length > 25
                      ) {
                        setErrMessage({
                          ...errMessage,
                          lnameValue: 'Length between 3 and 25',
                        });
                        event.target.classList.add('invalid');
                      } else if (event.target.classList.contains('invalid')) {
                        setErrMessage({
                          ...errMessage,
                          lnameValue: '',
                        });
                        event.target.classList.remove('invalid');
                      }
                    }}
                    autoComplete="lname"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 focus-visible:outline-none"
                  />
                  <p className="text-red-500 text-sm mt-2">
                    {errMessage.lnameValue}
                  </p>
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
                  onKeyUp={(event) => {
                    if (
                      event.target.value.match(`^\\+998\\d{9}$`) &&
                      event.target.classList.contains('invalid')
                    ) {
                      event.target.classList.remove('invalid');
                      setErrMessage({
                        ...errMessage,
                        phoneNumber: '',
                      });
                      console.log(errMessage.phoneNumber);
                    }
                  }}
                  onBlur={(event) => {
                    if (!event.target.value.match(`^\\+998\\d{9}$`)) {
                      event.target.classList.add('invalid');
                      setErrMessage({
                        ...errMessage,
                        phoneNumber:
                          'Please specify your number correctly ex: +998 xx xxx xxxx',
                      });
                      console.log(errMessage.phoneNumber);
                    }
                  }}
                />
                <p className="text-red-500 text-sm mt-2">
                  {errMessage.phoneNumber}
                </p>
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
                  id="pass"
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
                        'The password must have more than 8 characters',
                      capLetters:
                        'The password must contain capital characters',
                      lowerLetters:
                        'The password must contain lower case characters',
                      numChars:
                        'The password must contain numerical characters',
                    };

                    if (!writtenPassword.match('.{8}')) {
                      myPass.push(errorsMsg.eightChars);
                      isError = true;
                    }
                    if (!writtenPassword.match('(?=.*[A-Z])')) {
                      myPass.push(errorsMsg.capLetters);
                      isError = true;
                    }
                    if (!writtenPassword.match('(?=.*[a-z])')) {
                      myPass.push(errorsMsg.lowerLetters);
                      isError = true;
                    }
                    if (!writtenPassword.match('(?=.*[0-9])')) {
                      myPass.push(errorsMsg.numChars);
                      isError = true;
                    }
                    if (
                      isError &&
                      !event.target.classList.contains('invalid')
                    ) {
                      event.target.classList.add('invalid');
                    } else if (!isError) {
                      event.target.classList.remove('invalid');
                    }

                    console.log('pass value: ' + event.target.value);
                    console.log('confirm value: ' + regUser.confirmPassValue);

                    console.log(
                      'conf error message: ' + errMessage.confirmPassValue
                    );
                    setErrMessage({
                      ...errMessage,
                      passValue: myPass,
                    });
                  }}
                  onKeyUp={(event) => {
                    if (event.target.value === regUser.confirmPassValue) {
                      setErrMessage({
                        ...errMessage,
                        confirmPassValue: '',
                      });
                      console.log(
                        'Confirm pass value inside the check:' +
                          errMessage.confirmPassValue
                      );
                      console.log(errMessage);
                      document
                        .getElementById('confirmPass')
                        .classList.remove('invalid');
                    } else if (
                      !document
                        .getElementById('confirmPass')
                        .classList.contains('invalid')
                    ) {
                      setErrMessage({
                        ...errMessage,
                        confirmPassValue: "passwords didn't match",
                      });
                      document
                        .getElementById('confirmPass')
                        .classList.add('invalid');
                    }
                  }}
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {Array.isArray(errMessage.passValue) ? (
                  errMessage.passValue.map((misMatch, index) => (
                    <p
                      key={index}
                      id={index}
                      className="text-red-500 text-sm mt-2"
                    >
                      {misMatch}
                    </p>
                  ))
                ) : (
                  <p className="text-red-500 text-sm mt-2">
                    {errMessage.passValue}
                  </p>
                )}
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
                  id="confirmPass"
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
                        confirmPassValue: '',
                      });
                      event.target.classList.remove('invalid');
                    } else if (!event.target.classList.contains('invalid')) {
                      setErrMessage({
                        ...errMessage,
                        confirmPassValue: "passwords didn't match",
                      });
                      event.target.classList.add('invalid');
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
                  let returnState = false;
                  let newErr = {};
                  for (let field in regUser) {
                    if (regUser[field].length === 0) {
                      let elId = field.replace('Value', '');
                      newErr[field] = '*Required';
                      document.getElementById(elId).classList.add('invalid');
                      console.log(field);
                      returnState = true;
                    }
                  }
                  console.log(newErr);
                  for (let errName in errMessage) {
                    if (errMessage[errName].length !== 0) {
                      newErr[errName] = errMessage[errName];
                      console.log(errMessage);
                      returnState = true;
                    }
                  }
                  console.log(newErr);
                  setErrMessage(newErr);
                  if (returnState) {
                    setAlert({
                      type: 'info',
                      value: ' Fill the required fields',
                    });
                    console.log('Return state');
                    console.log(signAlert);
                    return;
                  }
                  setLoading(true);
                  try {
                    const res = await axios.post(
                      process.env.REACT_APP_PROXY2 + '/api/auth/register',
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
                      console.log(res);
                    }
                    if (res.status === 200) {
                      setAlert({
                        type: 'success',
                        value: 'Please verify your number at telegram bot',
                      });
                      navigate('/');
                    }
                    setRegUser(emptyUser);
                    // window.location.href = "https://t.me/Test_r_bbbot";
                  } catch (e) {
                    setLoading(false);
                    setRegUser(emptyUser);
                    setAlert({
                      type: 'error',
                      value: ' ' + e.message,
                    });
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
