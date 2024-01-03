/* eslint-disable global-require */
import path from "path"
import confidence from "confidence";
import { DB_PRIMARY } from "../fixtures/models";

require("dotenv").config();

const config = {
  host: process.env.SERVICE_HOST,
  port: process.env.SERVICE_PORT,
  jwtkey: process.env.JWT_KEY,
  database: {
    [DB_PRIMARY]: {
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      dbName: process.env.PG_DATABASE,
      host: process.env.PG_HOST,
      dialect: process.env.DB_DIALECT,
    }
  },
  storage: {
    image: {
      url: "/storage/image",
      path: path.join('storage', 'image'),
    },
    img_seed: {
      path: path.join('storage', "img_seed"),
      url: "/storage/img_seed"
    }
  },
}

const store = new confidence.Store(config)

export default (key) => store.get(key)