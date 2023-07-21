import useUser from '../../auth/useUser';
import TableRow from '../Draft/TableRow';
import Loading from '../Loading';

const DataTable = ({ data, refreshMainList }) => {
  const userInfo = useUser();
  if (!data) {
    return <Loading />;
  }
  if (data)
    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
            >
              №
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
            >
              Branch Info
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
            >
              Pinfl
            </th>
            {userInfo.realm_access.roles.includes('ROLE_USER_READ_FILE') && (
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
              >
                Edit
              </th>
            )}
            {userInfo.realm_access.roles.includes('ROLE_USER_DELETE_FILE') && (
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
          {data.map((row) => (
            <TableRow data={row} refreshMainList={refreshMainList} />
          ))}
        </tbody>
      </table>
    );
};

export default DataTable;
