import './LoanPanel.scss';
import { useState, useEffect, useReducer, useRef } from 'react';
import axios from 'axios';
import useToken from '../../auth/useToken';
import useUser from '../../auth/useUser';
import SubmitLoan from '../SumitLoan/SubmitLoan';
import Loan from '../Loan/Loan';

const LoanPanel = ({ data, showModal }) => {
  const divRef = useRef(null);
  const userInfo = useUser();
  const [loanInfo, setLoanInfo] = useState();
  const [isRefresh, setRefresh] = useReducer((a) => !a, false);
  const [openCreate, toggleCreate] = useReducer((a) => !a, false);
  const [token] = useToken();
  useEffect(() => {
    async function loadArticle() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_PROXY + '/loans/pinfl/' + data.id,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const newData = response.data;
        if (newData) {
          setLoanInfo(newData.data);
        }
      } catch (e) {
        console.log(e.message);
        alert(e.message);
      }
    }
    loadArticle();
  }, [isRefresh, data.pinflValue, data.branchInfo]);

  if (loanInfo)
    return (
      <div
        className="loan__background flex items-center"
        onClick={(ev) => {
          if (ev.target.classList[0] === 'loan__background') {
            showModal();
          }
        }}
      >
        <div
          className="loan__panel h-1/2 w-11/12 md:w-1/2 p-6 bg-white rounded-md overflow-auto flex flex-col justify-between"
          ref={divRef}
        >
          <div>
            <div className="w-full flex flex-row mb-12 justify-between">
              <h1>Loan Info</h1>
              <span onClick={showModal} className="cursor-pointer">
                X
              </span>
            </div>
            <div className="loan__data mb-12">
              <h3>PINFL: {data.pinflValue}</h3>
              <h3>Branch Info: {data.branchInfo}</h3>
            </div>
            <div>
              {loanInfo.map((value) => (
                <Loan
                  key={value.id}
                  data={data}
                  value={value}
                  setRefresh={setRefresh}
                />
              ))}
              {openCreate && (
                <SubmitLoan
                  toggleCreate={toggleCreate}
                  data={data}
                  setRefresh={setRefresh}
                  month={new Date().toLocaleString('default', {
                    month: 'long',
                  })}
                />
              )}
            </div>
          </div>
          <footer id="submitLoan" className="">
            <hr />
            <p className="flex justify-end">
              <a href="#submitLoan">
                {userInfo.realm_access.roles.includes(
                  'ROLE_USER_CREATE_FILE'
                ) && (
                  <button
                    className=" mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                    onClick={() => {
                      toggleCreate();
                    }}
                  >
                    CREATE
                  </button>
                )}
              </a>
              <button
                className="mt-2 ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                onClick={showModal}
              >
                Close
              </button>
            </p>
          </footer>
        </div>
      </div>
    );
};

export default LoanPanel;
