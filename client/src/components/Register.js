import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Axios from "axios";

const Register = () => {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  // const usernameRef = useRef();
  // const passwordRef = useRef();
  // const confirmpasswordRef = useRef();
  const [confirmpasswordReg, setConfirmpasswordReg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    if (passwordReg !== confirmpasswordReg) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      const response = await Axios.post("http://localhost:3001/register", {
        username: usernameReg,
        password: passwordReg,
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // const register = async (e) => {
  //   e.preventDefault();
  //   if (passwordRef.current.value !== confirmpasswordRef.current.value) {
  //     return setError("Passwords do not match");
  //   }
  //   try {
  //     setError("");
  //     setLoading(true);
  //     const user = await createUserWithEmailAndPassword(
  //       auth,
  //       emailRef.current.value,
  //       passwordRef.current.value
  //     );
  //     console.log(user);
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   setLoading(false);
  // };

  // const logout = async (e) => {
  //   await signOut(auth);
  // };

  return (
    <div className="loginSignUpTab">
      <div className="loginTab">
        <h1 className="Title">Sign Up</h1>

        {error && <Alert className="AlertMessage">{error}</Alert>}
        <form>
          <label htmlFor="username">User Name:</label>
          <input
            className="loginTabInput"
            onChange={(e) => {
              setUsernameReg(e.target.value);
            }}
            type="text"
            name="username"
            required
          ></input>
          <label htmlFor="password">Password:</label>
          <input
            className="loginTabInput"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
            type="password"
            name="password"
            required
          ></input>
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            className="loginTabInput"
            onChange={(e) => {
              setConfirmpasswordReg(e.target.value);
            }}
            type="password"
            name="confirmpassword"
            required
          ></input>
          <button
            onClick={register}
            disabled={loading}
            className="loginTabButton"
          >
            Sign Up
          </button>
          <Link to="/">
            <div>
              <u>Already have an account?</u>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
