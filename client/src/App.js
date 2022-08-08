import "./App.css";
import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Todo from "./Todo";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginContext } from "./Context/LoginContext";

function App() {
  const [loginState, setLoginState] = useState("");
  const [finish, setFinish] = useState("");
  return (
    <div>
      <Router>
        <LoginContext.Provider
          value={{ loginState, setLoginState, finish, setFinish }}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </LoginContext.Provider>
      </Router>
    </div>
  );
}

export default App;
