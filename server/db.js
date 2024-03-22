const mysql = require("mysql2");

// mysql://ccztrnooxhohx5z1:oqf39wxilm4ieu8b@alv4v3hlsipxnujn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/tniq0tx0aqq2wq12
const pool = mysql.createPool({
  connectionLimit: 10,
  password: "oqf39wxilm4ieu8b",
  user: "ccztrnooxhohx5z1",
  database: "tniq0tx0aqq2wq12",
  host: "alv4v3hlsipxnujn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: "3306",
});

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   password: "XDWw68GLMB",
//   user: "sql6691480",
//   database: "sql6691480",
//   host: "sql6.freesqldatabase.com",
//   port: "3306",
// });

let db = {};

db.getUser = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE id= ?", [id], (error, user) => {
      if (error) {
        return reject(error);
      }
      return resolve(user);
    });
  });
};
// db.getUserByEmail = (email) => {
//   return new Promise((resolve, reject) => {
//     pool.query(
//       "SELECT * FROM User WHERE email = ?",
//       [email],
//       (error, users) => {
//         if (error) {
//           return reject(error);
//         }
//         return resolve(users[0]);
//       }
//     );
//   });
// };
// db.insertUser = (firstName, lastName, email, password) => {
//   return new Promise((resolve, reject) => {
//     pool.query(
//       "INSERT INTO User (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
//       [firstName, lastName, email, password],
//       (error, result) => {
//         if (error) {
//           return reject(error);
//         }

//         return resolve(result.insertId);
//       }
//     );
//   });
// };
module.exports = db;
