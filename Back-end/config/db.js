require('dotenv').config();
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

var connection = mysql.createConnection({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  user: process.env.DB_USER,
});

module.exports = connection;
