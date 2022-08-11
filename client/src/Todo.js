import { useState, useEffect, useRef, useContext } from "react";
import { LoginContext } from "./Context/LoginContext";
import "./index.css";
import Edit from "./ToDoList/Edit.js";
import List from "./ToDoList/List.js";
import "./index.css";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// 將資料put到資料庫
// const putData = async (data) => {
//   const response = await Axios.post("http://localhost:3001/todo", {
//     memo: JSON.stringify({ data }),
//   });

//   // console.log(response.data);
//   try {
//     //setLoading(true);
//     //console.log(response);
//     //setLoginState(response.data[0].username);
//   } catch (error) {
//     console.log(error);
//   }
//   //setLoading(false);
// };
// async function putData(data) {
//   await fetch(API_GET_DATA, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ data }),
//   });
// }

// //------------以下為finished Task-------------
// // 從資料庫抓資料
// async function getData(setFinish) {
//   const response = await fetch(API_GET_DATA_2);
//   const { finish } = await response.json();
//   setFinish(finish);
// }

// // 將資料put到資料庫
// async function pushData(finish) {
//   await fetch(API_GET_DATA_2, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ finish }),
//   });
// }

const Todo = () => {
  const [data, setData] = useState([]);
  const submittingstatus = useRef(false); //送資料的狀態
  const [finish, setFinish] = useState([]);
  const { loginState, setLoginState, setSameDate, sameDate } =
    useContext(LoginContext);
  const navigate = useNavigate();
  const showdate = new Date();
  const displaytodaysdate =
    showdate.getFullYear() +
    "-" +
    ("0" + (showdate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + showdate.getDate()).slice(-2);

  function hihi() {
    data.map((item) => {
      if (displaytodaysdate == item.date && loginState) {
        setSameDate(true);
        console.log(item.date);
      }
    });
  }
  console.log(sameDate);
  console.log(String(displaytodaysdate));

  //const d = JSON.stringify(data);
  // console.log(d);
  // console.log(data.map((item) => item.date));

  // 從資料庫抓出資料, 只能出現一次;
  // useEffect(() => {
  //   Axios.get("http://localhost:3001/gettodo").then((response) => {
  //     // console.log(response.data);
  //     setData(response.data);
  //   });
  // }, []);

  // // Cookies
  // function getCookie(name) {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(";").shift();
  // }

  // keep the same data from the same user
  useEffect(() => {
    Axios.get("http://localhost:3001/gettodo").then((response) => {
      console.log(response);
      setData(response.data);
    });
  }, []);

  // 顯示user一直log in
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      console.log(response);
      if (response.data.loggined == true) {
        setLoginState(response.data.user[0].username);
      }
    });
  }, []);

  // logout Button
  const logout = () => {
    Axios.get("http://localhost:3001/logout").then((response) => {
      console.log(response);
    });
    navigate("/");
    setLoginState("");
  };

  return (
    <div>
      {hihi()}
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
    </div>
  );
};

export default Todo;
