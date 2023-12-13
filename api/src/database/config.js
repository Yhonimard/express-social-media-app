import config from "../config";
import { DB_PRIMARY } from "../fixtures/models";

const { database } = config("/");
const db = database[DB_PRIMARY];
module.exports = {
  dev: {
    username: db.username,
    password: db.password,
    database: db.dbName,
    host: db.host,
    dialect: db.dialect || "postgres",
    logging: false
  },
  production: {
    username: db.username,
    password: db.password,
    database: db.dbName,
    host: db.host,
    dialect: db.dialect,
  },
};
