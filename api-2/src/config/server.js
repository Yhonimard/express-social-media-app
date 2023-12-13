import express from "express"
import notFoundError from "../middleware/not-found.error"
import errorHandler from "../middleware/handler.error"
import routes from "../routes"
import swagger from "../middleware/swagger"
import morgan from "morgan"
import cors from "cors"
import path from "path"
import compression from "compression"
import mongoose from "mongoose"
import { errors } from "celebrate"

if (process.env.NODE_ENV === "dev") require("dotenv").config({ path: `.env.dev` })
const app = express()
app.use(compression({}))
app.use(cors({}))
app.use("/storage/images", express.static(path.join("storage", "images")))
app.use("/storage/img_seed", express.static(path.join("storage", "img_seed")))

app.use(express.json({}))
app.use(express.urlencoded({ extended: true }))

app.use("/docs", swagger)
app.use(morgan("dev"))
app.use("/api/v1", routes)

app.use(notFoundError)
app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI)
const server = app

export default server
