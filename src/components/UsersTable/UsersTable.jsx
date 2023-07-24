import { useReducer, useState } from 'react';
import useToken from '../../auth/useToken';
import useUser from '../../auth/useUser';
import LoanPanel from '../LoanPanel/LoanPanel';
import EditUser from '../EditUser/EditUser';
import './UsersTable.scss';
import Loading from '../Loading';
import axios from 'axios';

const UsersTable = ({ data, refreshMainList }) => {
  const userInfo = useUser();
  const [token] = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [showEdit, setShowEdit] = useReducer((editPanel) => !editPanel, false);
  const [modalPage, showModalPage] = useReducer((modal) => !modal, false);

  return (
    <>
      {showEdit && (
        <EditUser
          showUserEdit={setShowEdit}
          refreshMainList={refreshMainList}
          data={data}
        />
      )}
      {/* {isLoading && <Loading />} */}
      {modalPage && <LoanPanel data={data} showModal={showModalPage} />}
      <tr>
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
          {data.firstName}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {data.lastName}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {data.email}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {data.username}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {data.enabled ? (
            <p className=" text-green-800">Yes</p>
          ) : (
            <p className=" text-red-800">No</p>
          )}
        </td>
        {userInfo.realm_access.roles.includes('ROLE_ADMIN_READ_USER') && (
          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
            <input
              type="button"
              className="text-green-500 hover:text-green-700 cursor-pointer"
              href="#"
              onClick={setShowEdit}
              value="Change profile"
              disabled={data.deleted}
            />
          </td>
        )}
        {userInfo.realm_access.roles.includes('ROLE_ADMIN_DELETE_USER') && (
          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
            <input
              type="button"
              className="text-red-500 hover:text-red-700 cursor-pointer"
              href="#"
              onClick={async () => {
                const permit = window.confirm(
                  'Do you want to delete user: ' + data.firstName
                );
                if (permit) {
                  setIsLoading(true);
                  try {
                    const response = await axios.delete(
                      process.env.REACT_APP_PROXY2 +
                        '/api/admin/delete-user/' +
                        data.id,
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    );
                    refreshMainList();
                    setIsLoading(false);
                  } catch (e) {
                    setIsLoading(false);
                  }
                }
              }}
              disabled={data.deleted}
              value={'Delete'}
            />
          </td>
        )}
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
