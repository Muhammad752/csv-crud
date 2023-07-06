import { useReducer, useState } from "react";
import useToken from "../../auth/useToken";
import "./Loan.scss";
import axios from "axios";

const Loan = ({ data, value, setRefresh }) => {
  const [token] = useToken();
  const [editable, setEditable] = useReducer((a) => !a, false);
  const emptySingleLoan = {
    id: value.id,
    month: value.month,
    invoice: value.invoice,
    orgInn: value.orgInn,
    orgName: value.orgName,
  };
  const [singleLoan, setSinglLoan] = useState(emptySingleLoan);
  return (
    <div className="my-5 single__loan" key={value.id}>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          title={value.id}
          value={value.id}
          type="number"
          id="id"
          className="ml-3 border-none focus:shadow-none"
          placeholder={value.id}
          onChange={(e) => (e.target.value = 111)}
          disabled
        />
      </div>

      <div>
        <label htmlFor="month">Month :</label>
        <input
          title={value.month}
          value={value.month}
          type="text"
          id="month"
          className="ml-3 border-none focus:shadow-none"
          placeholder={value.month}
          disabled
        />
      </div>

      <div>
        <label htmlFor="invoice">Invoice:</label>
        <input
          title={singleLoan.invoice}
          value={singleLoan.invoice}
          onChange={(event) =>
            setSinglLoan({ ...singleLoan, invoice: event.target.value })
          }
          type="number"
          id="invoice"
          className="ml-3 border-none focus:shadow-none"
          disabled={!editable}
        />
      </div>

      <div>
        <label htmlFor="orgName">Organization Name :</label>
        <input
          title={singleLoan.orgName}
          value={singleLoan.orgName}
          onChange={(event) =>
            setSinglLoan({ ...singleLoan, orgName: event.target.value })
          }
          type="text"
          id="orgName"
          className="ml-3 border-none focus:shadow-none"
          placeholder={value.orgName}
          disabled={!editable}
        />
      </div>

      <div>
        <label htmlFor="orgInn">Organization INN :</label>
        <input
          title={singleLoan.orgInn}
          value={singleLoan.orgInn}
          onChange={(event) =>
            setSinglLoan({ ...singleLoan, orgInn: event.target.value })
          }
          type="number"
          id="orgInn"
          className="ml-3 border-none focus:shadow-none"
          placeholder={value.orgInn}
          disabled={!editable}
        />
      </div>

      <p className="flex justify-end gap-2">
        {editable ? (
          <>
            <button
              className=" mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              onClick={async () => {
                console.log(singleLoan);
                const resp = await axios.put(
                  process.env.REACT_APP_PROXY +
                    "/loans/pinfl/" +
                    data.pinfl +
                    "/branchInfo/" +
                    data.branchInfo,
                  { ...singleLoan },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                console.log(resp);
              }}
            >
              UPLOAD
            </button>
            <button
              className="mt-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              onClick={() => {
                setEditable();
                setRefresh();
                setSinglLoan(emptySingleLoan);
              }}
            >
              CANCEL
            </button>
          </>
        ) : (
          <button
            className=" mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
            onClick={setEditable}
          >
            EDIT
          </button>
        )}
        <button
          className="mt-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          onClick={async () => {
            const res = await axios.delete(
              process.env.REACT_APP_PROXY + "/loans/" + value.id,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if (res) setRefresh();
          }}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

export default Loan;
