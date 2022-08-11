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
    origin: [process.env.FRONT_END],
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

// mysql://b8083570a6111d:7aed03be@us-cdbr-east-06.cleardb.net/heroku_bda2f46c28afe7b?reconnect=true
// const db = mysql.createConnection({
//   user: "b8083570a6111d",
//   host: "us-cdbr-east-06.cleardb.net",
//   password: "7aed03be",
//   database: "heroku_bda2f46c28afe7b",
// });

// AWS database
const db = mysql.createConnection({
  user: "admin",
  host: "aws-dbmysql.cdfxvmmwh998.ap-south-1.rds.amazonaws.com",
  password: "regina7968",
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
    res.clearCookie("username");
    res.end();
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

// app.get("/login", (req, res) => {
//   if (req.session.user) {
//     res.send({ loggined: true, user: req.session.user });
//   } else {
//     res.send({ loggined: false });
//   }
// });

// User登入後得到database的資料
app.get("/gettodo", (req, res) => {
  // const username = req.body.username;
  // let username = req.query.username ?? "";
  const username = req.session.user[0].username;
  db.query(
    "SELECT * FROM todo WHERE username = ? ",
    username,
    (err, result) => {
      res.cookie("username", username);
      res.send(result);
      console.log(req.session.user);
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
app.listen(3001, () => console.log("running server")); //server接收的地方
