const mysql = require("mysql");
const { ServiceNotAvailable, BadRequest } = require("../utils/error");

const sqlConnection = function sqlConnection(sql, values, next) {

  if (arguments.length === 2) {
    next = values;
    values = null;
  }

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

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
    next.apply(this, arguments);
  });
};

module.exports = sqlConnection;