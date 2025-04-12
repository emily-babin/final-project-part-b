const mysql = require("mysql");

const conn = mysql.createConnection({
    host: "127.0.0.1",
    port: 8889,
    user: "root",
    password: "root",
    database: "ReactFinalDB"
});

conn.connect();

module.exports = conn;