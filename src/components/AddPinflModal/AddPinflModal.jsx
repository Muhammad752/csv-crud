import axios from "axios";
import "./AddPinflModal.scss";
import { useState } from "react";

const AddPinflModal = ({ showPinflAdd, refreshMainList }) => {
  const emptyPinflData = {
    pinfl: "",
    branchInfo: "",
  };
  const [pinflData, setPinflData] = useState(emptyPinflData);
  return (
    <div
      className="addPinfl__background flex items-center"
      onClick={(ev) => {
        if (ev.target.classList[0] == "addPinfl__background") {
          showPinflAdd();
        }
      }}
    >
      <div className="addPinfl__panel  w-11/12 md:w-1/3 p-5 bg-white rounded-md overflow-auto flex flex-col justify-between">
        <div>
          <div className="w-full flex flex-row mb-12 justify-between">
            <h1>ADD NEW PINFL</h1>
            <span onClick={showPinflAdd} className="cursor-pointer">
              X
            </span>
          </div>
          <div className="addPinfl__data mb-12">
            <div>
              <label>PINFL: </label>
              <input
                type="text"
                value={pinflData.pinfl}
                onChange={(e) =>
                  setPinflData({
                    ...pinflData,
                    pinfl: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Branch Info: </label>
              <input
                type="text"
                value={pinflData.branchInfo}
                onChange={(e) =>
                  setPinflData({
                    ...pinflData,
                    branchInfo: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <footer className="">
          <hr />
          <p className="flex justify-end">
            <button
              className=" mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              onClick={async (ev) => {
                try {
                  const res = await axios.post(
                    process.env.REACT_APP_PROXY + "/pinfl",
                    pinflData
                  );
                  refreshMainList();
                } catch (e) {
                  console.log(e.meassage);
                }
                showPinflAdd();
              }}
            >
              CREATE
            </button>
            <button
              className="mt-2 ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              onClick={showPinflAdd}
            >
              Close
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AddPinflModal;
