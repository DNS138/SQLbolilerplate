import mysql from 'mysql';
import { ServiceNotAvailable, BadRequest } from '../utils/error.js';
const argLength = 2;
const sqlConnection = function sqlConnection(sql, values, next) {

  if (arguments.length === argLength) {
    next = values;
    values = null;
  }

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true }
  );

  connection.connect(function (err) {
    if (err !== null) {
        next(new ServiceNotAvailable('Error connecting to Database'), null);
    }
  });

  connection.query(sql, values, function (err) {
    connection.end();

    if (err) {
        next(new BadRequest('Error in Database Query'),null);
    }
    next.apply(this.arguments);
  });
};

export const db = sqlConnection;
