import { TbCsv } from "react-icons/tb";
import React, { useState, useRef } from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

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

const people = [
  {
    id: 1,
    branchInfo: "asdasd",
  },
  {
    id: 2,
    branchInfo: "asdasd",
  },
];

const gridStyle = { minHeight: 400 };

const downloadBlob = (blob, fileName = "grid-data.csv") => {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.position = "absolute";
  link.style.visibility = "hidden";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

const SEPARATOR = ",";

const shouldComponentUpdate = () => true;

const DataPageOption = () => {
  const [gridRef, setGridRef] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState(people);

  const searchTextRef = useRef(searchText);
  searchTextRef.current = searchText;

  const render = ({ value }) => {
    const lowerSearchText = searchTextRef.current.toLowerCase();
    if (!lowerSearchText) {
      return value;
    }
    const str = value + ""; // get string value
    const v = str.toLowerCase(); // our search is case insensitive
    const index = v.indexOf(lowerSearchText);

    if (index === -1) {
      return value;
    }

    return [
      <span key="before">{str.slice(0, index)}</span>,
      <span key="match" style={{ background: "yellow", fontWeight: "bold" }}>
        {str.slice(index, index + lowerSearchText.length)}
      </span>,
      <span key="after">{str.slice(index + lowerSearchText.length)}</span>,
    ];
  };

  const initialColumns = [
    {
      name: "id",
      header: "№",
      defaultFlex: 1,
      type: "number",
      render,
      shouldComponentUpdate,
    },
    {
      name: "branchInfo",
      header: "Branch Info",
      defaultFlex: 1,
      render,
      shouldComponentUpdate,
    },
    {
      name: "accountNumber",
      header: "ACCOUNT NUMBER",
      defaultFlex: 1,
      minWidth: 100,
      render,
      shouldComponentUpdate,
    },
    {
      name: "userInfo",
      header: "USER INFO",
      minWidth: 80,
      type: "number",
      render,
      shouldComponentUpdate,
    },
    {
      name: "loanAmount",
      header: "LOAN AMOUNT",
      minWidth: 80,
      type: "number",
      render,
      shouldComponentUpdate,
    },
    {
      name: "numberInvoice",
      header: "NUMBER INVOICE",
      minWidth: 80,
      type: "number",
      render,
      shouldComponentUpdate,
    },
    {
      name: "pinfl",
      header: "PINFL",
      minWidth: 80,
      type: "number",
      render,
      shouldComponentUpdate,
    },
  ];

  const [columns] = useState(initialColumns);

  const exportCSV = () => {
    const columns = gridRef.current.visibleColumns;

    const header = columns.map((c) => c.name).join(SEPARATOR);
    const rows = gridRef.current.data.map((data) =>
      columns.map((c) => data[c.id]).join(SEPARATOR)
    );

    const contents = [header].concat(rows).join("\n");
    const blob = new Blob([contents], { type: "text/csv;charset=utf-8;" });

    downloadBlob(blob);
  };

  const onSearchChange = ({ target: { value } }) => {
    const visibleColumns = gridRef.current.visibleColumns;

    const lowerSearchText = value && value.toLowerCase();
    const newData = people.filter((p) => {
      return visibleColumns.reduce((acc, col) => {
        const v = (p[col.id] + "").toLowerCase(); // get string value
        return acc || v.indexOf(lowerSearchText) != -1; // make the search case insensitive
      }, false);
    });

    setSearchText(value);
    setDataSource(newData);
  };

  return (
    <div>
      <div className="flex justify-between my-5 items-center">
        <TextInput
          type="text"
          style={{ padding: 5 }}
          value={searchText}
          onChange={onSearchChange}
        />{" "}
        <button
          type="button"
          onClick={exportCSV}
          className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
        >
          <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
            <div>
              <TbCsv />
            </div>
            <div className="hidden sm:block">Download csv</div>
          </span>
        </button>
      </div>
      <ReactDataGrid
        handle={setGridRef}
        idProperty="id"
        style={gridStyle}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};

export default () => <DataPageOption />;
