import axios from 'axios';
import './EditUser.scss';
import { useEffect, useState } from 'react';
import useToken from '../../auth/useToken';
import useUser from '../../auth/useUser';
import useRefreshToken from '../../auth/useRefreshToken';
import CustomAlert from '../CustomAlert/CustomAlert';
import Loading from '../Loading';

const EditUser = ({ showUserEdit, refreshMainList, data }) => {
  const [refreshToken, setRefreshToken] = useRefreshToken();
  const [signAlert, setAlert] = useState({ type: '', value: '' });
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useUser();
  let emptyRoles = {
    ROLE_USER: false,
    ROLE_USER_READ_FILE: false,
    ROLE_USER_CREATE_FILE: false,
    ROLE_USER_UPDATE_FILE: false,
    ROLE_USER_DELETE_FILE: false,
    ROLE_ADMIN: false,
    ROLE_ADMIN_CREATE_USER: false,
    ROLE_ADMIN_READ_USER: false,
    ROLE_ADMIN_UPDATE_USER: false,
    ROLE_ADMIN_DELETE_USER: false,
  };
  data.roles.forEach((val) => {
    emptyRoles[val.name] = true;
  });
  const [roles, setRoles] = useState(emptyRoles);
  const [token, setToken] = useToken();
  const emptyErrors = {
    email: '',
    firstName: '',
    lastName: '',
  };
  const [errors, setErrors] = useState(emptyErrors);
  const initialUser = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    roles: data.roles,
  };
  const [userData, setUserData] = useState(initialUser);
  return (
    <div
      className="addUser__background flex items-center"
      onClick={(ev) => {
        if (ev.target.classList[0] === 'addUser__background') {
          showUserEdit();
        }
      }}
    >
      {/* {isLoading && <Loading />} */}
      {signAlert.type && (
        <CustomAlert
          type={signAlert.type}
          content={signAlert.value}
          setAlert={setAlert}
        />
      )}
      <div className="addUser__panel  w-11/12 md:w-1/3 p-5 bg-white rounded-md overflow-auto flex flex-col justify-between">
        <div>
          <div className="w-full flex flex-row mb-12 justify-between">
            <h1>ADD NEW USER</h1>
            <span onClick={showUserEdit} className="cursor-pointer">
              X
            </span>
          </div>
          <div className="addUser__data mb-12">
            <div>
              <label>First name: </label>
              <input
                type="text"
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    firstName: e.target.value,
                  })
                }
              />
              <p className="text-red-500 text-sm mt-2">{errors.firstName}</p>
            </div>
            <div>
              <label>Last name: </label>
              <input
                type="text"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    lastName: e.target.value,
                  })
                }
              />

              <p className="text-red-500 text-sm mt-2">{errors.lastName}</p>
            </div>
            <div>
              <label>Email: </label>
              <input
                type="text"
                value={userData.email}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  })
                }
              />

              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            </div>
            <div>
              <label>Roles: </label>
              <div className="roles">
                <div className="flex gap-4 ml-3">
                  <p className="mr-4 w-{58}">File roles:</p>
                  <div>
                    <label htmlFor="role_user">ROLE USER</label>
                    <input
                      id="role_user"
                      type="checkbox"
                      checked={roles.ROLE_USER}
                      onChange={(ev) => {
                        setRoles({
                          ...roles,
                          ROLE_USER: ev.target.checked,
                          ROLE_USER_CREATE_FILE: ev.target.checked,
                          ROLE_USER_DELETE_FILE: ev.target.checked,
                          ROLE_USER_READ_FILE: ev.target.checked,
                          ROLE_USER_UPDATE_FILE: ev.target.checked,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="role_user_read">READ</label>
                    <input
                      id="role_user_read"
                      type="checkbox"
                      checked={roles.ROLE_USER_READ_FILE}
                      onChange={(ev) =>
                        setRoles({
                          ...roles,
                          ROLE_USER_READ_FILE: ev.target.checked,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="role_user_create">CREATE</label>
                    <input
                      id="role_user_create"
                      type="checkbox"
                      checked={roles.ROLE_USER_CREATE_FILE}
                      onChange={(ev) =>
                        setRoles({
                          ...roles,
                          ROLE_USER_CREATE_FILE: ev.target.checked,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="role_user_update">UPDATE</label>
                    <input
                      id="role_user_update"
                      type="checkbox"
                      checked={roles.ROLE_USER_UPDATE_FILE}
                      onChange={(ev) =>
                        setRoles({
                          ...roles,
                          ROLE_USER_UPDATE_FILE: ev.target.checked,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="role_user_delete">DELETE</label>
                    <input
                      type="checkbox"
                      id="role_user_delete"
                      checked={roles.ROLE_USER_DELETE_FILE}
                      onChange={(ev) =>
                        setRoles({
                          ...roles,
                          ROLE_USER_DELETE_FILE: ev.target.checked,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-4 ml-3">
                  <p className="mr-4">User roles:</p>

                  <div>
                    <label htmlFor="role_admin">ROLE ADMIN: </label>
                    <input
                      type="checkbox"
                      id="role_admin"
                      checked={roles.ROLE_ADMIN}
                      onChange={(ev) =>
                        setRoles({
                          ...roles,
                          ROLE_ADMIN: ev.target.checked,
                          ROLE_ADMIN_CREATE_USER: ev.target.checked,
                          ROLE_ADMIN_DELETE_USER: ev.target.checked,
                          ROLE_ADMIN_READ_USER: ev.target.checked,
                          ROLE_ADMIN_UPDATE_USER: ev.target.checked,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="role_admin_read">READ</label>
                    <input
                      id="role_admin_read"
                      type="checkbox"
                      checked={roles.ROLE_ADMIN_READ_USER}
                      onChange={(ev) =>
                        setRoles({
                          ...roles,
                          ROLE_ADMIN_READ_USER: ev.target.checked,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="role_admin_create">CREATE</label>
                    <input
                      type="checkbox"
                      id="role_admin_create"
                      checked={roles.ROLE_ADMIN_CREATE_USER}
                      onChange={(ev) =>
                        setRoles({
                          ...roles,
                          ROLE_ADMIN_CREATE_USER: ev.target.checked,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="role_admin_update">UPDATE</label>
                    <input
                      type="checkbox"
                      id="role_admin_update"
                      checked={roles.ROLE_ADMIN_UPDATE_USER}
                      onChange={(ev) =>
                        setRoles({
                          ...roles,
                          ROLE_ADMIN_UPDATE_USER: ev.target.checked,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="role_admin_delete">DELETE</label>
                    <input
                      type="checkbox"
                      id="role_admin_delete"
                      checked={roles.ROLE_ADMIN_DELETE_USER}
                      onChange={(ev) =>
                        setRoles({
                          ...roles,
                          ROLE_ADMIN_DELETE_USER: ev.target.checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="">
          <hr />
          <p className="flex justify-end">
            {userInfo.realm_access.roles.includes('ROLE_ADMIN_UPDATE_USER') && (
              <button
                className=" mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                onClick={async (ev) => {
                  let rolesArr = [];
                  for (let key in roles) {
                    if (roles[key]) {
                      rolesArr.push(key);
                    }
                  }
                  try {
                    const res = await axios.post(
                      process.env.REACT_APP_PROXY2 +
                        '/api/admin/users/' +
                        data.id,
                      { ...userData, roles: rolesArr, enabled: data.enabled },
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    );
                    refreshMainList();
                    showUserEdit();
                    setAlert({
                      type: 'success',
                      value: 'User details has been changed',
                    });
                  } catch (e) {
                    if (e.response) {
                      setErrors({ ...emptyErrors, ...e.response.data.errors });
                      console.log(e);
                    }
                  }
                }}
              >
                SUBMIT
              </button>
            )}
            <button
              className="mt-2 ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              onClick={showUserEdit}
            >
              Close
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default EditUser;
