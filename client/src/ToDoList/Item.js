import { useState, useContext, useEffect } from "react";
import { LoginContext } from "../Context/LoginContext";
import Axios from "axios";

import Modal from "./Modal";

const Item = ({
  id,
  note,
  date,
  time,
  deleteData,
  listData,
  add,
  item,
  finish,
  // setFinish,
}) => {
  const [overStatus, setOverstatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { sameDate, setSameDate, loginState } = useContext(LoginContext);

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      // alert("delete!");
      deleteData(function (prev) {
        return prev.filter((item) => item.id !== id);
      });
      setSameDate(false);
    });
  };

  //  試試看將原ｉｔｅｍ移到另一邊
  // function finishTask() {
  //   submittingstatus.current = true;
  //   const finishedMemo = listData.filter((item) => item.id === id);
  //   deleteData(function (prev) {
  //     return prev.filter((item) => item.id !== id);
  //   });
  //   setOverstatus(true);
  //   add(function (prev) {
  //     return [...finishedMemo, ...prev];
  //   });
  // }

  // function hihi() {
  //   if (displaytodaysdate === date && loginState) {
  //     // alert("yoooooo");
  //     setSameDate(true);
  //     console.log(sameDate);
  //   }
  // }

  const showdate = new Date();
  const displaytodaysdate =
    showdate.getFullYear() +
    "-" +
    ("0" + (showdate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + showdate.getDate()).slice(-2);

  return (
    <div>
      <div
        className={displaytodaysdate === date ? "ItemcardAlert" : "Itemcard"}
      >
        <div className="Wordbreak">
          <p>{note}</p>
          <p></p>
          <p>{`${date} ${time}`}</p>
        </div>

        <div className="Itemcardbutton">
          <button
            onClick={() => {
              deleteItem(id);
            }}
          >
            Delete
          </button>
          {overStatus ? null : (
            <button onClick={() => setIsOpen(true)} type="button">
              Edit
            </button>
          )}
          {/* {overStatus ? null : (
            <button
              onClick={() => {
                finishTask();
              }}
              type="button"
            >
              Finish!
            </button>
          )} */}
        </div>
      </div>
      <Modal
        id={id}
        note={note}
        date={date}
        time={time}
        item={item}
        add={add}
        listData={listData}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></Modal>
    </div>
  );
};

export default Item;
