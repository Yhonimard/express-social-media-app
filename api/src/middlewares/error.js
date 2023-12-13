import { isCelebrateError } from "celebrate";
import fs from "fs";
import httpStatus from "http-status";

const notFound = (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({ message: "route not found" })
}

const handler = (error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, () => {
      console.log("delete file");
    })
  }

  if (isCelebrateError(error)) {
    let err
    error.details.forEach(e => err = e.details[0])
    const msgArr = err.message.split('"')

    const mapperErr = Object.assign(err, { message: msgArr[1] + msgArr[2] })

    return res.status(httpStatus.BAD_REQUEST).json(mapperErr)
  }

  res.status(error.code || httpStatus.BAD_REQUEST).json({ message: error.message || "something went wrong please try again" })
}


export default {
  handler,
  notFound
}