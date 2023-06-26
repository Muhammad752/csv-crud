import "./LoanPanel.scss";
import { useState, useEffect, useReducer, useRef } from "react";
import axios from "axios";
import SubmitLoan from "../SumitLoan/SubmitLoan";
import Loan from "../Loan/Loan";

const LoanPanel = ({ data, showModal }) => {
  const divRef = useRef(null);
  const [loanInfo, setLoanInfo] = useState();
  const [isRefresh, setRefresh] = useReducer((a) => !a, false);
  const [openCreate, toggleCreate] = useReducer((a) => !a, false);
  useEffect(() => {
    async function loadArticle() {
      // const response = await axios.get(`http://192.168.219.208:8080/pinfl/`);
      const response = await axios.get(
        process.env.REACT_APP_PROXY +
          "/loans/pinfl/" +
          data.pinfl +
          "/branchInfo/" +
          data.branchInfo
      );
      const newData = response.data;
      if (newData) {
        setLoanInfo(newData);
      }
    }
    loadArticle();
  }, [isRefresh, data.pinfl, data.branchInfo]);

  if (loanInfo)
    return (
      <div
        className="loan__background flex items-center"
        onClick={(ev) => {
          if (ev.target.classList[0] === "loan__background") {
            showModal();
          }
        }}
      >
        <div
          className="loan__panel h-1/2 w-11/12 md:w-1/2 p-5 bg-white rounded-md overflow-auto flex flex-col justify-between"
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
              <h3>PINFL: {data.pinfl}</h3>
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
                  month={new Date().toLocaleString("default", {
                    month: "long",
                  })}
                />
              )}
            </div>
          </div>
          <footer id="submitLoan" className="">
            <hr />
            <p className="flex justify-end">
              <a href="#submitLoan">
                <button
                  className=" mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                  onClick={() => {
                    toggleCreate();
                  }}
                >
                  CREATE
                </button>
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
