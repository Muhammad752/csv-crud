import "./LoanPanel.scss";
import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const LoanPanel = ({ data, showModal }) => {
  const [loanInfo, setLoanInfo] = useState();
  const [isRefresh, setRefresh] = useReducer((a) => !a, false);
  useEffect(() => {
    async function loadArticle() {
      // const response = await axios.get(`http://192.168.219.208:8080/pinfl/`);
      const response = await axios.get(
        "http://172.20.10.3:8080/loans/pinfl/" +
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
  }, [isRefresh]);

  if (loanInfo)
    return (
      <div
        className="loan__background flex items-center"
        onClick={(ev) => {
          if (ev.target.classList[0] == "loan__background") {
            showModal();
          }
        }}
      >
        <div className="loan__panel h-1/2 w-11/12 md:w-1/2 p-5 bg-white rounded-md overflow-auto flex flex-col justify-between">
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
                <div className="my-5" key={value.id}>
                  <p>ID: {value.id}</p>
                  <p>Invoice: {value.invoice}</p>
                  <p>Organization INN: {value.orgInn}</p>
                  <p>Organization Name: {value.orgName}</p>

                  <p className="flex justify-end gap-2">
                    <button className=" mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                      UPDATE
                    </button>

                    <button
                      className="mt-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                      onClick={async () => {
                        const res = await axios.delete(
                          "http://172.20.10.3:8080/loans/" + value.id
                        );
                        setRefresh();
                      }}
                    >
                      Delete
                    </button>
                  </p>
                </div>
              ))}
              <div className="form">
                <label htmlFor="invoice">
                  Invoice:
                  <input
                    className="h-8 border-gray-300"
                    type="text"
                    id="invoice"
                  />
                </label>
                <label htmlFor="orgInn">
                  Organization INN:
                  <input
                    className="h-8 border-gray-300"
                    type="text"
                    id="orgInn"
                  />
                </label>
                <label htmlFor="invoice">
                  Invoice:
                  <input
                    className="h-8 border-gray-300"
                    type="text"
                    id="invoice"
                  />
                </label>
                <label htmlFor="invoice">
                  Invoice:
                  <input
                    className="h-8 border-gray-300"
                    type="text"
                    id="invoice"
                  />
                </label>
                <div className="buttons mt-4">
                  <button className=" mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                    Submit
                  </button>
                  <button className="mt-2 ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <footer className="">
            <hr />
            <p className="flex justify-end">
              <button className=" mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                CREATE
              </button>
            </p>
          </footer>
        </div>
      </div>
    );
};

export default LoanPanel;
