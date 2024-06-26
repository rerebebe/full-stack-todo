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

app.use(express.json()); //automatically parsing every adjacent object that is sent from front-end

// make connection between front-end and back-end
app.use(
  cors({
    origin: [process.env.FRONT_END],
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
    allowedHeaders: [
      "Access-Control-Allow-Headers",
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "token",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "Access-Control-Allow-Credentials",
    ],
    credentials: true, // allow cookie to be enabled
  })
);

// // new cors config
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested, Content-Type, Accept Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
//     return res.status(200).json({});
//   }
//   next();
// });

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// pass all the info for our session
// app.set("trust proxy", 1);
app.use(
  session({
    key: "userId",
    secret: "this is a secret",
    resave: false,
    saveUninitialized: false,
    // store: new RedisStore({
    //   url: process.env.REDIS_URL,
    // }),
    cookie: {
      sameSite: "none",
      secure: false,
      maxAge: 86400000,
    },
  })
);

// app.use(
//   session({
//     name: "enter_the_session_name",
//     resave: false,
//     saveUninitialized: false,
//     store: sessionStore,
//     secret: "This is a secret",
//     cookie: {
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 2,
//       sameSite: true,
//       secure: 'production',
//     },
//   })
// );

// mysql://ccztrnooxhohx5z1:oqf39wxilm4ieu8b@alv4v3hlsipxnujn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/tniq0tx0aqq2wq12
const db_config = {
  host: "alv4v3hlsipxnujn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "ccztrnooxhohx5z1",
  password: "oqf39wxilm4ieu8b",
  database: "tniq0tx0aqq2wq12",
};

// const db_config = {
//   host: "sql6.freesqldatabase.com",
//   user: "sql6691480",
//   password: "XDWw68GLMB",
//   database: "sql6691480",
// };
// ip-10-0-127-72.ec2.internal:57232

var db;

function handleDisconnect() {
  db = mysql.createConnection(db_config); // Recreate the connection, since
  db.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  db.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

// AWS database
// const db = mysql.createConnection({
//   user: "admin",
//   host: "aws-dbmysql.cdfxvmmwh998.ap-south-1.rds.amazonaws.com",
//   password: "regina7968",
//   database: "LoginSystem",
// });

// Create account
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log("A error", err);
    }
    db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        if (result) {
          res.send(result);
        }
        if (err) {
          console.log("C error: ", err);
        }
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
// app.get("/logout", (req, res) => {
//   if (req.session.user) {
//     req.session.destroy();
//     res.clearCookie("username");
//     res.end();
//   }
// });

// 客戶登入
app.post("/login", (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
      "SELECT * FROM users WHERE username = ?",
      username,
      (err, result) => {
        if (err) {
          console.log("err from login", err);
        }
        if (result.length > 0) {
          console.log("比較password", password, result[0].password);
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              req.session.user = result;
              console.log("login success, req.session.user", req.session.user);
              console.log("login success, req.session.user", req.session.user);
              console.log("login success response", response);
              console.log("does it go past this line?", typeof result);

              const user = req.session.user[0];
              const username = user.username;
              console.log("user data", user, username);
              res.cookie("username", username);
              console.log("result", result);
              console.log("req body", req.body);
              res.send(result);
            } else {
              res.send({ message: error });
              console.log("login error?:", error, response); // here!!!, and the error is undefined???
            }
          });
        } else {
          res.send({ message: "User doesn't exist!!" });
        }
      }
    );
  } catch (e) {
    console.log("login super error...: ", e);
    res.send({ error: e });
  }
});

// User輸入todo進去mysql database
app.post("/todo", (req, res) => {
  const note = req.body.note;
  const date = req.body.date;
  const time = req.body.time;
  const username = req.body.username;
  console.log("/todo req.body", req.body);

  db.query(
    "INSERT INTO todo (username,note,date,time) VALUES (?,?,?,?)",
    [username, note, date, time],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log("fail", err);
      } else {
        res.send("value inserted!");
        console.log("succeed in adding memo: ", result);
      }
    }
  );
});

// User登入後得到database的資料
app.get("/gettodo", (req, res) => {
  // let username = req.query.username ?? "";
  try {
    console.log("gettodo req.body", req.body);
    console.log("req.session", req.session);
    console.log("req.session.user", req.session.user);
    //const username = req.body.username;
    //const username = req.session.user[0].username;
    const username = req.query.username ?? "";

    db.query(
      "SELECT * FROM todo WHERE username = ?",
      username,
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.cookie("username", username);
          res.send(result);
          console.log(req.session.user);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
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
  // console.log("update req.body", req.body);
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
        console.log("UPDATE error", err);
      } else {
        res.send(result);
        console.log("UPDATE success!", result);
      }
    }
  );
});
// app.listen(3001, () => console.log("running server")); //server接收的地方

app.listen(process.env.PORT || 3001, () => {
  console.log("Sever running!!");
});
