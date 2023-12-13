import { isCelebrateError, } from "celebrate";
import fs from "fs"
import httpStatus from "http-status";

/**
 * 
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {*} next 
 */
const errorHandler = async (error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log("remove image", err);
    })
  }

  if (isCelebrateError(error)) {
    let err
    error.details.forEach(f => err = f.details[0])
    const msg = err.message.split('"')
    const mapErr = {
      ...err,
      message: `${msg[1]}${msg[2]}`
    }
    res.status(httpStatus.BAD_REQUEST).json(mapErr)
  }

  if (res.headersSent) return next(error)
  res.status(typeof error.code === "number" ? error.code : 500).json({ message: error.message || 'something went wrong, please try again' })
}
export default errorHandler
