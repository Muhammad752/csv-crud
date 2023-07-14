import "./SubmitLoan.scss";
import { useState } from "react";
import useToken from "../../auth/useToken";
import axios from "axios";

const SubmitLoan = ({ toggleCreate, data, setRefresh, month }) => {
  const [token] = useToken();
  const emptyLoanData = {
    invoice: "",
    orgInn: "",
    orgName: "",
    month: month,
  };
  const [loanData, setLoanData] = useState(emptyLoanData);

  // const date = new Date();
  // const currentMonth = date.toLocaleString("default", {
  //   month: "long",
  // });
  // setLoanData({ ...loanData, month: currentMonth });
  console.log("loop");

  return (
    <div className='form'>
      <div>
        <label htmlFor='invoice'>Invoice :</label>
        <input
          name='invoice'
          onChange={(ev) => {
            setLoanData({ ...loanData, invoice: ev.target.value });
          }}
          value={loanData.invoice}
          type='number'
          id='invoice'
          className='ml-3 border-none focus:shadow-none'
          required
        />
      </div>
      <div>
        <label htmlFor='orgInn'>Organization INN :</label>
        <input
          name='orgInn'
          onChange={(ev) =>
            setLoanData({ ...loanData, orgInn: ev.target.value })
          }
          value={loanData.orgInn}
          type='number'
          id='orgInn'
          className='ml-3 border-none focus:shadow-none'
          required
        />
      </div>
      <div>
        <label htmlFor='orgName'>Organization Name :</label>
        <input
          name='orgName'
          onChange={(ev) =>
            setLoanData({ ...loanData, orgName: ev.target.value })
          }
          value={loanData.orgName}
          type='text'
          id='orgName'
          className='ml-3 border-none focus:shadow-none'
          required
        />
      </div>
      <div>
        <label htmlFor='month'>Month :</label>
        <input
          name='month'
          value={month}
          type='text'
          id='month'
          className='ml-3 border-none focus:shadow-none'
          required
        />
      </div>
      <div className='buttons mt-4'>
        <a href='#submitLoan'>
          <button
            className=' mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'
            onClick={async () => {
              console.log(loanData);
              const res = await axios.post(
                process.env.REACT_APP_PROXY + "/loans/pinfl/" + data.id,
                { ...loanData, month: month },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              if (res) setRefresh();
              setLoanData(emptyLoanData);
              toggleCreate();
            }}>
            Submit
          </button>
        </a>
        <button
          className='mt-2 ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'
          onClick={() => {
            toggleCreate();
          }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SubmitLoan;
