import useUser from '../../auth/useUser';
import { useEffect, useReducer, useState } from 'react';
import useToken from '../../auth/useToken';
import useRefreshToken from '../../auth/useRefreshToken';
import axios from 'axios';
import './UserProfile.scss';

const UserProfile = ({ showUser }) => {
  const [token, setToken] = useToken();
  const [refreshToken, setRefreshToken] = useRefreshToken();
  const userInfo = useUser();

  const [isEditable, setIsEditable] = useReducer((a) => !a, false);

  const initialUser = {
    email: userInfo.email,
    firstName: userInfo.given_name,
    lastName: userInfo.family_name,
  };

  const [currentUser, setCurrentUser] = useState(initialUser);
  console.log('User info is');
  console.log(userInfo);
  console.log(userInfo.name);
  return (
    <div
      className="user__background flex items-center"
      onClick={(ev) => {
        if (ev.target.classList[0] === 'user__background') {
          showUser();
        }
      }}
    >
      <div className="user__panel p-6 bg-white rounded-md overflow-auto flex flex-col justify-between">
        <div>
          <div className="w-full flex flex-row mb-12 justify-between">
            <h1>User Info</h1>
            <span onClick={showUser} className="cursor-pointer">
              X
            </span>
          </div>
          <div className="flex gap-2">
            <label htmlFor="p-name">Name: </label>
            <input
              type="text"
              name=""
              id="p-name"
              value={currentUser.firstName}
              onChange={(event) => {
                setCurrentUser({
                  ...currentUser,
                  firstName: event.target.value,
                });
              }}
              disabled={!isEditable}
            />
          </div>
          <br />
          <div className="flex gap-2">
            <label htmlFor="p-lastName">Last name:</label>
            <input
              type="text"
              name=""
              id=""
              value={currentUser.lastName}
              onChange={(event) => {
                setCurrentUser({
                  ...currentUser,
                  lastName: event.target.value,
                });
              }}
              disabled={!isEditable}
            />
          </div>

          <br />
          <div className="flex gap-2">
            <label htmlFor="p-email">Email: </label>
            <input
              type="text"
              name=""
              id="p-email"
              value={currentUser.email}
              onChange={(event) => {
                setCurrentUser({ ...currentUser, email: event.target.value });
              }}
              disabled={!isEditable}
            />
          </div>
          <br />
          <div className="flex gap-2">
            <label htmlFor="p-email">Telephone number: </label>
            <input
              type="text"
              name=""
              id="p-email"
              value={userInfo.preferred_username}
              disabled
            />
          </div>
        </div>
        <br />
        <br />
        <footer id="submitLoan" className="">
          <hr />
          <p className="flex justify-end">
            <a href="#submitLoan">
              {!isEditable ? (
                <button
                  className=" mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                  onClick={setIsEditable}
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    className=" mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                    onClick={async () => {
                      const res = await axios.post(
                        process.env.REACT_APP_PROXY2 + '/api/auth/update',
                        currentUser,
                        {
                          headers: { Authorization: `Bearer ${token}` },
                        }
                      );

                      const res2 = await axios.post(
                        process.env.REACT_APP_PROXY2 +
                          '/api/auth/refresh/token?refreshTokenRequest=' +
                          refreshToken,
                        {
                          headers: { Authorization: `Bearer ${token}` },
                        }
                      );
                      console.log(res2);
                      if (res2) {
                        console.log('response with tokens');
                        console.log(res2);
                        const { access_token, refresh_token } = res2.data;
                        setToken(access_token);
                        setRefreshToken(refresh_token);
                      }
                      console.log(res);
                      setIsEditable();
                    }}
                  >
                    Upload
                  </button>
                  <button
                    className="mt-2 ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                    onClick={() => {
                      setIsEditable();
                      setCurrentUser(initialUser);
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </a>
            <button
              className="mt-2 ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              onClick={showUser}
            >
              Close
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default UserProfile;
