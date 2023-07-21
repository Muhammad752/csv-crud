import React, { useState, useRef, useReducer } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import axios from 'axios';
import { BsWindowDock } from 'react-icons/bs';
import LoanPanel from './LoanPanel/LoanPanel';
import useToken from '../auth/useToken';
import AddPinflModal from './AddPinflModal/AddPinflModal';
import Loading from './Loading';

const TextInput = ({ type, style, value, onChange }) => (
  <div className="relative max-w-xs">
    <label htmlFor="hs-table-search" className="sr-only">
      Search
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      name="hs-table-search"
      id="hs-table-search"
      className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
      placeholder="Search..."
    />
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
      <svg
        className="h-3.5 w-3.5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
    </div>
  </div>
);

const gridStyle = { minHeight: 400 };

const downloadBlob = (blob, fileName = 'grid-data.csv') => {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.position = 'absolute';
  link.style.visibility = 'hidden';

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

const SEPARATOR = ',';

const shouldComponentUpdate = () => true;

const DataPageOption = ({ data, refreshMainList }) => {
  console.log(data);
  const [isLoading, setLoading] = useState(false);
  console.log('render');
  // if (!data) {
  //   data = [];
  // }
  const [gridRef, setGridRef] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [dataSource, setDataSource] = useState(data);
  const [modalPage, showModalPage] = useReducer((modal) => !modal, false);
  const [addPinflModal, showPinflAdd] = useReducer((modal) => !modal, false);
  const [loanInfo, setLoanInfo] = useState({ pinfl: 'empty', branchInfo: '' });
  const [token] = useToken();
  const searchTextRef = useRef(searchText);
  searchTextRef.current = searchText;

  const removeRow = async (pinfl) => {
    let res = window.confirm(
      `Do you want to delete record with pinfl ${pinfl}`
    );
    if (res) {
      const response = await axios.delete(
        process.env.REACT_APP_PROXY + `/pinfl/${pinfl}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if ((response.status = 200)) {
        setDataSource(dataSource.filter((a) => a.pinfl !== pinfl));
        alert('deleted');
        refreshMainList();
      }
    }
  };

  const loadModal = (data) => {
    console.log(isLoading);
    setLoading(true);
    showModalPage();
    setLoanInfo(data);
    setLoading(false);
  };

  const render = ({ value }) => {
    const lowerSearchText = searchTextRef.current.toLowerCase();
    if (!lowerSearchText) {
      return value;
    }
    const str = value + ''; // get string value
    const v = str.toLowerCase(); // our search is case insensitive
    const index = v.indexOf(lowerSearchText);

    if (index === -1) {
      return value;
    }

    return [
      <span key="before">{str.slice(0, index)}</span>,
      <span key="match" style={{ background: 'yellow', fontWeight: 'bold' }}>
        {str.slice(index, index + lowerSearchText.length)}
      </span>,
      <span key="after">{str.slice(index + lowerSearchText.length)}</span>,
    ];
  };

  const initialColumns = [
    {
      name: 'id',
      header: '№',
      defaultFlex: 1,
      maxWidth: 60,
      type: 'number',
      render,
      // shouldComponentUpdate,
    },
    {
      name: 'branchInfo',
      header: 'Branch Info',
      defaultFlex: 1,
      minWidth: 3,
      render,
      shouldComponentUpdate,
    },
    {
      name: 'pinfl',
      header: 'PINFL',
      defaultFlex: 1,
      minWidth: 5,
      type: 'number',
      render,
      shouldComponentUpdate,
    },
    {
      key: 'Show',
      name: 'Show',
      header: 'Show',
      minWidth: 10,
      type: 'button',
      render: ({ data }) => (
        <>
          <button
            className="text-green-500 w-full"
            onClick={() => loadModal(data)}
          >
            Show <BsWindowDock className="inline-block" />
          </button>
        </>
      ),
      shouldComponentUpdate,
    },
    // {
    //   key: "download",
    //   name: "download",
    //   header: "Download",
    //   minWidth: 10,
    //   type: "button",
    //   render: ({ data }) => {
    //     return (
    //       <button
    //         className='text-green-500 w-full'
    //         onClick={async () => {
    //           setLoading(true);
    //           try {
    //             const response = await axios.get(
    //               process.env.REACT_APP_PROXY + "/pinfl/download/" + data.pinfl,
    //               {
    //                 headers: { Authorization: `Bearer ${token}` },
    //                 responseType: "blob",
    //               }
    //             );
    //             const blob = new Blob([response.data]);

    //             // Create a temporary anchor element
    //             const link = document.createElement("a");
    //             link.href = URL.createObjectURL(blob);
    //             link.download = data.pinfl + ".csv";

    //             // Programmatically trigger the download
    //             link.click();

    //             // Clean up the temporary anchor element
    //             URL.revokeObjectURL(link.href);
    //             link.remove();

    //             console.log("File downloaded successfully!");
    //           } catch (error) {
    //             // Handle error
    //             console.error("Error downloading file:", error);
    //             setLoading(false);
    //           }
    //           setLoading(false);
    //         }}>
    //         Download
    //       </button>
    //     );
    //   },
    //   shouldComponentUpdate,
    // },
    {
      key: 'delete',
      name: 'delete',
      header: 'Delete',
      minWidth: 10,
      type: 'button',
      render: ({ data }) => {
        return (
          <button
            className="w-full text-red-500"
            onClick={() => removeRow(data.pinfl)}
          >
            Delete
          </button>
        );
      },
      shouldComponentUpdate,
    },
  ];

  const [columns] = useState(initialColumns);

  const addNewPinfl = () => {
    return '';
  };

  const exportCSV = () => {
    const columns = gridRef.current.visibleColumns;

    const header = columns.map((c) => c.name).join(SEPARATOR);
    const rows = gridRef.current.data.map((data) =>
      columns.map((c) => data[c.id]).join(SEPARATOR)
    );

    const contents = [header].concat(rows).join('\n');
    const blob = new Blob([contents], { type: 'text/csv;charset=utf-8;' });

    downloadBlob(blob);
  };

  const onSearchChange = ({ target: { value } }) => {
    const visibleColumns = gridRef.current.visibleColumns;

    const lowerSearchText = value && value.toLowerCase();
    const newData = data.filter((p) => {
      return visibleColumns.reduce((acc, col) => {
        const v = (p[col.id] + '').toLowerCase(); // get string value
        return acc || v.indexOf(lowerSearchText) !== -1; // make the search case insensitive
      }, false);
    });

    setSearchText(value);
    setDataSource(newData);
  };
  return (
    <div>
      {isLoading && <Loading />}
      {modalPage && <LoanPanel data={loanInfo} showModalPage={showModalPage} />}
      {addPinflModal && (
        <AddPinflModal
          showPinflAdd={showPinflAdd}
          refreshMainList={refreshMainList}
        />
      )}
      <div className="flex justify-between my-5 items-center">
        <TextInput
          type="text"
          style={{ padding: 5 }}
          value={searchText}
          onChange={onSearchChange}
        />{' '}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addNewPinfl}
            className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
          >
            <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
              <div onClick={showPinflAdd} className="hidden sm:block">
                Add PINFL
              </div>
            </span>
          </button>
          <button
            type="button"
            onClick={addNewPinfl}
            className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
          >
            <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
              <div
                onClick={() => {
                  console.log('Download not implemented');
                }}
                className="hidden sm:block"
              >
                Download CSV
              </div>
            </span>
          </button>
        </div>
      </div>
      <div className="p-1.5 w-full inline-block align-middle">
        <div className="overflow-auto border rounded-lg"></div>
        <ReactDataGrid
          handle={setGridRef}
          idProperty="id"
          style={(gridStyle, { height: '70vh' })}
          columns={columns}
          dataSource={dataSource}
          className="min-w-full divide-y divide-gray-200"
        />
      </div>
    </div>
  );
};

export default DataPageOption;
