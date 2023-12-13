import cors from "cors";
import express from "express";
import morgan from "morgan";
import config from ".";
import error from "../middlewares/error";
import routes from "../routes/v1";

const server = () => {
  const { storage } = config("/")
  const app = express();
  app.use(cors())
  app.use(express.json());

  app.use(storage.img_seed.url, express.static(storage.img_seed.path))
  app.use(storage.image.url, express.static(storage.image.path))
  if (process.env.NODE_ENV === "dev") app.use(morgan("dev"))

  app.use("/api/v1", routes)

  app.use(error.notFound)
  app.use(error.handler)

  return app
};

export default server;
