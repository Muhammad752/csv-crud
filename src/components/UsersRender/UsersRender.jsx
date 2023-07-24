import React from 'react';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { ImAddressBook } from 'react-icons/im';
import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import UsersTable from '../UsersTable/UsersTable';
import Loading from '../Loading';
import useToken from '../../auth/useToken';
import useUser from '../../auth/useUser';
import AddNewUser from '../AddNewUser/AddNewUser';
export default function UsersRender({
  data,
  refreshMainList,
  setData,
  searchKey,
  setSearchKey,
  makeSearch,
  setMakeSearch,
  setPageNum,
}) {
  const userInfo = useUser();
  const [token] = useToken();
  const [isLoading, setLoading] = useState(false);
  const [addNewUser, showUserAdd] = useReducer((modal) => !modal, false);

  if (userInfo)
    return (
      <div className="flex flex-col max-w-[80%] m-auto">
        {/* {isLoading && <Loading />} */}

        {addNewUser && (
          <AddNewUser
            showUserAdd={showUserAdd}
            refreshMainList={refreshMainList}
          />
        )}
        <div className="overflow-x-auto">
          <div className="flex justify-between py-3 pl-2">
            <div className="relative max-w-xs">
              <div className="relative max-w-sm mx-auto">
                <input
                  className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type="search"
                  placeholder="Search"
                  value={searchKey}
                  onChange={(event) => setSearchKey(event.target.value)}
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={() => {
                    if (!searchKey) {
                      refreshMainList();
                    }
                  }}
                  onClick={() => {
                    if (searchKey) {
                      setLoading(true);
                      try {
                        setMakeSearch({
                          searchUrl: '-search',
                          searchData: searchKey,
                        });
                        setPageNum(0);
                        refreshMainList();
                      } catch (e) {
                        console.log(e);
                        setLoading(false);
                      }
                      setLoading(false);
                    } else {
                      setMakeSearch({
                        searchUrl: '',
                        searchData: '',
                      });
                      refreshMainList();
                    }
                  }}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative gap-4 flex">
                {userInfo.realm_access.roles.includes(
                  'ROLE_ADMIN_CREATE_USER'
                ) && (
                  <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
                    <span
                      className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2"
                      onClick={showUserAdd}
                    >
                      <div>
                        <ImAddressBook style={{ width: '10px' }} />
                      </div>
                      <div className="hidden sm:block">Add new user</div>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      First name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Last name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Phone number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Validated
                    </th>
                    {userInfo.realm_access.roles.includes(
                      'ROLE_ADMIN_READ_USER'
                    ) && (
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Edit
                      </th>
                    )}
                    {userInfo.realm_access.roles.includes(
                      'ROLE_ADMIN_DELETE_USER'
                    ) && (
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Delete
                      </th>
                    )}
                    <th></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {console.log(data)}
                  {data &&
                    data.content.map((row) => (
                      <UsersTable
                        key={row.id}
                        data={row}
                        refreshMainList={refreshMainList}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
}
