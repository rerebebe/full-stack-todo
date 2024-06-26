import { useEffect, useRef, useState, useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Axios from "axios";
import { API_HOST } from "../constants";

// frontend to express-session, use it below then it will work
Axios.defaults.withCredentials = true;

const Login = () => {
  const loginuserlRef = useRef();
  const loginpasswordRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loginState, setLoginState } = useContext(LoginContext);

  const login = async (e) => {
    e.preventDefault();
    const response = await Axios.post(
      `${API_HOST}/login`,
      {
        username: loginuserlRef.current.value,
        password: loginpasswordRef.current.value,
      },
      { withCredentials: true }
    );
    try {
      // if (
      //   loginuserlRef.current.value &&
      //   loginpasswordRef.current.value !== null
      // ) {
      //   setLoading(true);
      //   navigate("/");
      // }
      // const response = await Axios.post("http://localhost:3001/login", {
      //   username: loginuserlRef.current.value,
      //   password: loginpasswordRef.current.value,
      // });
      console.log(response.data);
      navigate("/todo");
      setLoginState(response.data[0].username);
      sessionStorage.setItem("name", response.data[0].username);
    } catch (err) {
      console.log(
        "USER",
        loginuserlRef.current.value,
        loginpasswordRef.current.value
      );
      setLoginState(response.data.message);
      console.log("MESSAGE", response.data.message);
      console.log("MESSAGE2", response.data);
      console.log("why cant i log in: ", err);
      navigate("/");
    }

    setLoading(false);
  };

  //logOUt
  // const logout = () => {
  //   Axios.get("http://localhost:3001/logout").then((response) => {
  //     console.log(response);
  //   });
  // };

  // 重新上來後也會紀錄user
  // useEffect(() => {
  //   Axios.get(`${API_HOST}/login`).then((response) => {
  //     console.log(response);
  //     if (response.data.loggined === true) {
  //       setLoginState(response.data.user[0].username);
  //     }
  //   });
  // }, []);

  return (
    <div className="loginSignUpTab">
      <div className="loginTab">
        <h1 className="Title">Log In</h1>

        {loginState && <Alert className="AlertMessage">{loginState}</Alert>}

        <form>
          <label htmlFor="email">User Name:</label>
          <input
            className="loginTabInput"
            ref={loginuserlRef}
            type="email"
            name="email"
            required
          ></input>
          <label htmlFor="password">Password:</label>
          <input
            className="loginTabInput"
            ref={loginpasswordRef}
            type="password"
            name="password"
            required
          ></input>

          <button onClick={login} className="loginTabButton">
            Log In
          </button>
          <Link to="/register">
            <div>
              <u>Need an account?</u>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
