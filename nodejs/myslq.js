const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "postproject",
});
module.exports = db;

// const mysql = require("mysql2/promise");
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   database: "postproject",
// });
// module.exports = db;
