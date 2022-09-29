import { useState } from "react";
import ReactDom from "react-dom";
import Axios from "axios";
import { API_HOST } from "../constants";

const Modal = ({
  item,
  isOpen,
  setIsOpen,
  id,
  note,
  date,
  time,
  add,
  listData,
}) => {
  const [anote, setAnote] = useState(note);
  const [adate, setAdate] = useState(date);
  const [atime, setAtime] = useState(time);

  function updateNote(e) {
    setAnote(e.target.value);
  }
  function updateDate(e) {
    setAdate(e.target.value);
  }
  function updateTime(e) {
    setAtime(e.target.value);
  }

  // const updatedMemo = { id, note: anote, date: adate, time: atime };
  // function updateEdit() {
  //   add(listData.map((item) => (item.id === id ? updatedMemo : item)));
  // }

  const updatedMemo = (id) => {
    Axios.put(`${API_HOST}/update`, {
      note: anote,
      date: adate,
      time: atime,
      id: id,
    }).then((response) => {
      // alert("update");
      const updatedMemo = { id, note: anote, date: adate, time: atime };
      add(listData.map((item) => (item.id === id ? updatedMemo : item)));
    });
    setIsOpen(false);
  };

  return ReactDom.createPortal(
    <>
      {isOpen === true ? (
        <div className="Overlystyle">
          <div className="Modal">
            <div>
              <div className="Modaltop">
                <div>
                  <h5 id="exampleModalLabel"></h5>
                </div>
                <div>
                  <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    aria-label="Close"
                    className="X"
                  >
                    &times;
                  </button>
                </div>
              </div>
              <div className="Modalcontent">
                <label htmlFor="memo">Memo</label>
                <input
                  placeholder="enter the memo..."
                  value={anote}
                  onChange={updateNote}
                  name="memo"
                />
                <label htmlFor="date">Date</label>
                <input
                  placeholder="enter the date..."
                  value={adate}
                  onChange={updateDate}
                  name="date"
                  type="date"
                />
                <label htmlFor="time">Time</label>
                <input
                  placeholder="enter the time..."
                  value={atime}
                  onChange={updateTime}
                  name="time"
                  type="time"
                />
              </div>
              <div className="Modalfooter">
                <button onClick={() => setIsOpen(false)} type="button">
                  Close
                </button>
                <button
                  onClick={() => {
                    updatedMemo(id);
                  }}
                  type="button"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
