import { useState, useEffect, useRef, useContext } from "react";
import { LoginContext } from "./Context/LoginContext";
import "./index.css";
import Edit from "./ToDoList/Edit.js";
import List from "./ToDoList/List.js";
import "./index.css";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_HOST } from "./constants";
import Modal2 from "./ToDoList/Modal2.js";

const Todo = () => {
  const [data, setData] = useState([]);
  const submittingstatus = useRef(false); //送資料的狀態
  const [finish, setFinish] = useState([]);
  const {
    loginState,
    setLoginState,
    setSameDate,
    sameDate,
    isOpen,
    setIsOpen,
  } = useContext(LoginContext);
  const navigate = useNavigate();
  const showdate = new Date();
  const displaytodaysdate =
    showdate.getFullYear() +
    "-" +
    ("0" + (showdate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + showdate.getDate()).slice(-2);

  // const hihi = () => {
  //   data.map((item) => {
  //     const transformedDate = item.date.split("T")[0];
  //     if (displaytodaysdate == transformedDate && loginState) {
  //       setSameDate(true);
  //     }
  //   });
  // }

  useEffect(() => {
    if (sameDate) {
      setIsOpen(true);
    }
  }, [sameDate, setIsOpen]);

  useEffect(() => {
    data.map((item) => {
      const transformedDate = item.date.split("T")[0];
      if (displaytodaysdate == transformedDate && loginState) {
        setSameDate(true);
        // setIsOpen(true);
      }
    });
  }, [data, displaytodaysdate, loginState, setIsOpen, setSameDate]);

  // keep the same data from the same user
  useEffect(() => {
    Axios.get(`${API_HOST}/gettodo`, {
      params: { username: sessionStorage.getItem("name") },
    }).then((response) => {
      console.log("user 的 todo: ", response);
      setData(response.data);
    });
    Axios.get(`${API_HOST}/login`).then((response) => {
      const user = sessionStorage.getItem("name");
      console.log(response);
      setLoginState(user);
    });
  }, [setLoginState]);

  // logout Button
  const logout = () => {
    navigate("/");
    sessionStorage.clear();
    setLoginState("");
  };

  return (
    <div>
      {/* {hihi()} */}

      <div className="TodoLogoutUser">
        {loginState ? (
          <div className="Parallel">
            User: <p>{loginState}</p>
            <button
              className="TodoLogoutbutton"
              onClick={() => {
                logout();
              }}
            >
              LOG OUT
            </button>
          </div>
        ) : (
          <Link to="/">
            <div className="Logintodo">
              <u>Login</u>
            </div>
          </Link>
        )}
      </div>

      <Edit add={setData} loginState={loginState} />
      {sameDate ? (
        <div className="AlertToday">
          you have something to do today, please check down below!!
        </div>
      ) : null}
      <List
        add={setData}
        listData={data}
        deleteData={setData}
        submittingstatus={submittingstatus}
        finishedTask={finish}
        // setFinish={setFinish}
      />
      {sameDate && (
        <Modal2 type={"todo"} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default Todo;
