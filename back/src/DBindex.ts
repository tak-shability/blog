require('dotenv').config();
const mysql = require('mysql');
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: process.env.DBPW,
  database: 'blog',
  port: '3306',
});

export default db;