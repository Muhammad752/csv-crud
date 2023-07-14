import axios from "axios";
import "./AddNewUser.scss";
import { useState } from "react";
import useToken from "../../auth/useToken";

const AddNewUser = ({ showUserAdd, refreshMainList }) => {
  const [token] = useToken();
  const emptyUser = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    roles: [],
  };
  const [userData, setUserData] = useState(emptyUser);
  return (
    <div
      className='addUser__background flex items-center'
      onClick={(ev) => {
        if (ev.target.classList[0] === "addUser__background") {
          showUserAdd();
        }
      }}>
      <div className='addUser__panel  w-11/12 md:w-1/3 p-5 bg-white rounded-md overflow-auto flex flex-col justify-between'>
        <div>
          <div className='w-full flex flex-row mb-12 justify-between'>
            <h1>ADD NEW USER</h1>
            <span
              onClick={showUserAdd}
              className='cursor-pointer'>
              X
            </span>
          </div>
          <div className='addUser__data mb-12'>
            <div>
              <label>First Name: </label>
              <input
                type='text'
                value={userData.pinfl}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    pinflValue: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Branch Info: </label>
              <input
                type='text'
                value={userData.branchInfo}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    branchInfo: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <footer className=''>
          <hr />
          <p className='flex justify-end'>
            <button
              className=' mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'
              onClick={async (ev) => {
                try {
                  const res = await axios.post(
                    process.env.REACT_APP_PROXY + "/pinfl",
                    userData,
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  );
                  refreshMainList();
                } catch (e) {
                  console.log(e.meassage);
                }
                showUserAdd();
              }}>
              CREATE
            </button>
            <button
              className='mt-2 ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'
              onClick={showUserAdd}>
              Close
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AddNewUser;
