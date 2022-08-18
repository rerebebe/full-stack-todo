const mysql = require("mysql2");
const pool = mysql.createPool({
  connectionLimit: 10,
  password: "7aed03be",
  user: "b8083570a6111d",
  database: "heroku_bda2f46c28afe7b",
  host: "us-cdbr-east-06.cleardb.net",
  port: "3306",
});

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
