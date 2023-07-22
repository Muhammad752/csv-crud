import React from 'react';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { ImAddressBook } from 'react-icons/im';
import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import TableRow from '../TableRow';
import Loading from '../Loading';
import useToken from '../../auth/useToken';
import AddPinflModal from '../AddPinflModal/AddPinflModal';
import useUser from '../../auth/useUser';
import './DataReneder.scss';
import DataTable from '../DataTable/DataTable';

export default function DataRender({
  data,
  refreshMainList,
  setData,
  searchKey,
  setSearchKey,
  makeSearch,
  setMakeSearch,
  setPageNum,
}) {
  const [token] = useToken();
  const userInfo = useUser();
  const [isLoading, setLoading] = useState(false);
  const [addPinflModal, showPinflAdd] = useReducer((modal) => !modal, false);

  return (
    <div className="flex flex-col max-w-[80%] m-auto">
      {/* {isLoading && <Loading />} */}
      {addPinflModal && (
        <AddPinflModal
          showPinflAdd={showPinflAdd}
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
                    setMakeSearch({
                      searchUrl: '',
                      searchData: '',
                    });
                    refreshMainList();
                  }
                }}
                onClick={() => {
                  if (searchKey) {
                    setLoading(true);
                    try {
                      setMakeSearch({
                        searchUrl: 'search/',
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
                'ROLE_USER_CREATE_FILE'
              ) && (
                <button
                  className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
                  onClick={showPinflAdd}
                >
                  <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                    <div>
                      <ImAddressBook style={{ width: '10px' }} />
                    </div>
                    <div className="hidden sm:block">Add pinfl</div>
                  </span>
                </button>
              )}

              {userInfo.realm_access.roles.includes('ROLE_USER_READ_FILE') && (
                <button className="download_csv_button relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
                  <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                    <div>
                      <RiFileExcel2Fill />
                    </div>
                    <div
                      className="hidden sm:block"
                      onClick={async () => {
                        {
                          setLoading(true);
                          try {
                            const response = await axios.get(
                              process.env.REACT_APP_PROXY + '/pinfl/download/',
                              {
                                headers: { Authorization: `Bearer ${token}` },
                                responseType: 'blob',
                              }
                            );
                            const blob = new Blob([response.data]);

                            // Create a temporary anchor element
                            const link = document.createElement('a');
                            link.href = URL.createObjectURL(blob);
                            link.download = 'pinfls.xlsx';

                            // Programmatically trigger the download
                            link.click();

                            // Clean up the temporary anchor element
                            URL.revokeObjectURL(link.href);
                            link.remove();

                            console.log('File downloaded successfully!');
                          } catch (error) {
                            // Handle error
                            console.error('Error downloading file:', error);
                            setLoading(false);
                          }
                          setLoading(false);
                        }
                      }}
                    >
                      Download EXCEL
                    </div>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-auto border rounded-lg">
            <DataTable data={data} refreshMainList={refreshMainList} />
          </div>
        </div>
      </div>
    </div>
  );
}
