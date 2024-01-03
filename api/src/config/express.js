import cors from "cors";
import express from "express";
import http from "http";
import morgan from "morgan";
import config from ".";
import error from "../middlewares/error";
import routes from "../routes/v1";
import SocketService from "../services/socket/socket.service";

const server = () => {
  const { storage } = config("/")
  const app = express();
  const server = http.createServer(app)
  const socketService = SocketService(server)

  app.use(cors())
  app.use(express.json());

  app.use(storage.img_seed.url, express.static(storage.img_seed.path))
  app.use(storage.image.url, express.static(storage.image.path))



  if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'))
  }

  app.use(socketService)
  app.use("/api/v1", routes)
  app.use(error.notFound)
  app.use(error.handler)

  return server
};

export default server;
