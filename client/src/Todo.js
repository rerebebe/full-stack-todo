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
  const { loginState, setLoginState } = useContext(LoginContext);
  const navigate = useNavigate();
  // 從資料庫抓出資料, 只能出現一次;
  // useEffect(() => {
  //   Axios.get("http://localhost:3001/gettodo").then((response) => {
  //     // console.log(response.data);
  //     setData(response.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/gettodo").then((response) => {
  //     console.log(response.data);
  //     setData(response.data);
  //   });
  // }, [data]);

  // useEffect(() => {
  //   getData(setFinish);
  // }, []);

  // Until True;
  // useEffect(() => {
  //   if (!submittingstatus.current) {
  //     //因為後面設定add/delete都是true, 所以原始值是false沒錯
  //     return;
  //   }
  //   putData(data).then((data) => (submittingstatus.current = false));
  // }, [data]);

  // useEffect(() => {
  //   if (!submittingstatus.current) {
  //     //因為後面設定add/delete都是true, 所以原始值是false沒錯
  //     return;
  //   }
  //   pushData(finish).then((finish) => (submittingstatus.current = false));
  // }, [finish]);

  // 顯示user一直log in
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      console.log(response);
      if (response.data.loggined == true) {
        setLoginState(response.data.user[0].username);
      }
    });
  }, []);

  // keep the same data from the same user
  useEffect(() => {
    Axios.get("http://localhost:3001/gettodo", {
      params: { username: loginState },
    }).then((response) => {
      // console.log(response.data);
      setData(response.data);
    });
  }, [loginState]);

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
