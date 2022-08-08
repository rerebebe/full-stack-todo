import { useState } from "react";
import Axios from "axios";

import Modal from "./Modal";

const Item = ({
  id,
  note,
  date,
  time,
  deleteData,
  submittingstatus,
  listData,
  add,
  item,
  finish,
  // setFinish,
}) => {
  const [overStatus, setOverstatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // function deleteItem() {
  //   submittingstatus.current = true;
  //   deleteData(function (prev) {
  //     return prev.filter((item) => item.id !== id);
  //   });
  // }

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      // alert("delete!");
      deleteData(function (prev) {
        return prev.filter((item) => item.id !== id);
      });
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

  return (
    <div>
      <div className="Itemcard">
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
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              data-bs-toggle="modal"
              data-bs-target={`#example-${id}`}
            >
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
