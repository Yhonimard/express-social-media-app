import fs from "fs"

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
  if (res.headersSent) return next(error)

  res.status(error.code || 500).json({ message: error.message || 'something went wrong, please try again' })
}
export default errorHandler