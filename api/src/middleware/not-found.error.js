import httpStatus from "http-status"

const notFoundError = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({ message: "route not found" })
}

export default notFoundError