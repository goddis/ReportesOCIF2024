import mysql from "mysql";
import config from "../config";

const connection = mysql.createConnection({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
});

export default connection;