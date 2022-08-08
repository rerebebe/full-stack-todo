import { useState, useContext } from "react";
import Axios from "axios";
import { LoginContext } from "../Context/LoginContext";

const Item = ({
  id,
  note,
  date,
  time,
  deleteData,
  submittingstatus,
  key,
  listData,
  add,
  item,
  finish,
  setFinish,
}) => {
  const [overStatus, setOverstatus] = useState(false);
  const { finish, setFinish } = useContext(LoginContext);

  function deleteItem() {
    submittingstatus.current = true;
    setFinish(function (prev) {
      return prev.filter((item) => item.id !== id);
    });
  }

  //  試試看將原ｉｔｅｍ移到另一邊
  function finishTask() {
    submittingstatus.current = true;
    const finishedMemo = listData.filter((item) => item.id === id);
    deleteData(function (prev) {
      return prev.filter((item) => item.id !== id);
    });
    setOverstatus(true);
    setFinish(function (prev) {
      return [...finishedMemo, ...prev];
    });
  }

  return (
    <div>
      {console.log(overStatus)}

      <div className="w-full border-2 text-white mb-10 py-4 flex justify-between items-center">
        <div className="ml-4">
          <p className="text-lg">{note}</p>
          <p></p>
          <p className="text-md">{`${date} ${time}`}</p>
        </div>
        <div className="flex">
          <button
            onClick={deleteItem}
            className="border-2 p-2 mr-2 ml-2 rounded-md bg-gradient-to-r from-indigo-400 to-pink-300 text-white font-bold bg-gradient-to-r hover:from-indigo-300 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
