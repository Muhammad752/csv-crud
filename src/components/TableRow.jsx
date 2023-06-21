import { RiArrowDropDownLine } from "react-icons/ri";
import { useReducer } from "react";

const TableRow = ({ data }) => {
  const [isCollapsed, setIsCollapsed] = useReducer((a) => !a, false);
  return (
    <>
      <tr>
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
          {data.id}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {data.branchInfo}
        </td>

        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {data.pinfl}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
          <a className="text-green-500 hover:text-green-700" href="#">
            Download
          </a>
        </td>
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
          <a className="text-red-500 hover:text-red-700" href="#">
            Delete
          </a>
        </td>
        <td onClick={setIsCollapsed}>
          <RiArrowDropDownLine style={{ fontSize: "30px" }} />
        </td>
      </tr>
      {isCollapsed && (
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
      )}
    </>
  );
};

export default TableRow;
