import { useState, useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import Axios from "axios";
import { API_HOST } from "../constants";

const Edit = ({ add }) => {
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const { loginState, setLoginState } = useContext(LoginContext);

  function emptyValue() {
    setNote("");
    setDate("");
    setTime("");
  }

  function noteChange(e) {
    setNote(e.target.value);
  }
  function dateChange(e) {
    setDate(e.target.value);
  }
  function timeChange(e) {
    setTime(e.target.value);
  }

  const showItems = () => {
    Axios.get(`${API_HOST}/gettodo`, {
      params: { username: loginState },
    }).then((response) => {
      // console.log(response.data);
      add(response.data);
    });
  };

  const addItem = () => {
    Axios.post(`${API_HOST}/todo`, {
      note: note,
      date: date,
      time: time,
      username: loginState,
    }).then(() => {
      console.log("success");
      showItems();
    });

    emptyValue();
  };

  return (
    <div className="TodoEdit">
      <h1 className="Title">To-do List</h1>
      <label htmlFor="memo">Memo</label>
      <input
        type="text"
        value={note}
        onChange={noteChange}
        name="memo"
        placeholder="put your stuff to do here..."
        required="required"
        disabled={loginState ? false : true}
      />
      <label htmlFor="date">Date</label>
      <input
        value={date}
        onChange={dateChange}
        type="date"
        name="date"
        disabled={loginState ? false : true}
      />
      <label htmlFor="time">Time</label>
      <input
        value={time}
        onChange={timeChange}
        type="time"
        name="time"
        disabled={loginState ? false : true}
      />
      <div className="Buttondiv">
        <button
          disabled={note ? false : true}
          type="submit"
          onClick={() => {
            addItem();
          }}
          className="Button"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Edit;
