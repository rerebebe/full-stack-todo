const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session"); //keep the users log in

const app = express();

app.use(express.json()); //automatically parsing every adjacent object that is sent from the fromt-end
// make connection between front-end and back-end backend
app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true, //allow cookie to be enabled
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// pass all the info for our session
app.use(
  session({
    key: "userId",
    secret: "this is a secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "19900608",
  database: "LoginSystem",
});

// 客戶創新的帳密
app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

// 重新整理還是log in
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggined: true, user: req.session.user });
  } else {
    res.send({ loggined: false });
  }
});

// logout?
app.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.clearCookie("connect.sid");
    console.log();
  }
});

// 客戶登入
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combo!!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist!!" });
      }
    }
  );
});

// User輸入todo進去mysql database
app.post("/todo", (req, res) => {
  const note = req.body.note;
  const date = req.body.date;
  const time = req.body.time;
  const username = req.body.username;

  db.query(
    "INSERT INTO todo (username,note,date,time) VALUES (?,?,?,?)",
    [username, note, date, time],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("value inserted!");
      }
    }
  );
});

// User登入後得到database的資料
app.get("/gettodo", (req, res) => {
  let username = req.query.username ?? "";
  db.query(
    "SELECT * FROM todo WHERE username = ? ",
    username,
    (err, result) => {
      res.send(result);
    }
  );
});

//刪掉資料庫中的資料
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM todo WHERE id = ?", id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Update資料庫中的資料
app.put("/update", (req, res) => {
  const id = req.body.id;
  const note = req.body.note;
  const date = req.body.date;
  const time = req.body.time;
  db.query(
    "UPDATE todo SET note=?, date=?, time=? WHERE id = ?;",
    [note, date, time, id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.listen(3001, () => console.log("running server")); //server在localhost:3001接收
