import { useReducer, useState } from "react";
import useToken from "../../auth/useToken";
import LoanPanel from "../LoanPanel/LoanPanel";
import Loading from "../Loading";
import axios from "axios";

const UsersTable = ({ data, refreshMainList }) => {
  const [token] = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [modalPage, showModalPage] = useReducer((modal) => !modal, false);
  console.log(data);
  return (
    <>
      {isLoading && <Loading />}
      {modalPage && (
        <LoanPanel
          data={data}
          showModal={showModalPage}
        />
      )}
      <tr>
        <td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap'>
          {data.firstName}
        </td>
        <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
          {data.lastName}
        </td>
        <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
          {data.email}
        </td>
        <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
          {data.username}
        </td>
        <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
          <a
            className='text-green-500 hover:text-green-700'
            href='#'
            onClick={showModalPage}>
            Change role
          </a>
        </td>
        <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
          <a
            className='text-red-500 hover:text-red-700'
            href='#'
            onClick={async () => {
              setIsLoading(true);
              try {
                const response = await axios.delete(
                  process.env.REACT_APP_PROXY2 + "/api/auth/delete" + data.id,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                console.log(response);
                refreshMainList();
                setIsLoading(false);
              } catch (e) {
                setIsLoading(false);
                console.log(e);
              }
            }}>
            Delete
          </a>
        </td>
        {/* <td onClick={setIsCollapsed}>
          <RiArrowDropDownLine style={{ fontSize: "30px" }} />
        </td> */}
      </tr>
      {/* {isCollapsed && (
        <>
          <tr className="text-zinc-400">
            <td colSpan={1}></td>
            <td>Month</td>
            <td>Invoice</td>
            <td>Organization Name</td>
            <td>Organization INN</td>
            <td></td>
          </tr>
          <tr className="text-zinc-300">
            <td colSpan={1}></td>
            <td>July</td>
            <td>{data.julyInvoice}</td>
            <td>{data.julyOrgName}</td>
            <td>{data.julyOrgInn}</td>
            <td></td>
          </tr>
        </>
      )} */}
    </>
  );
};

export default UsersTable;
