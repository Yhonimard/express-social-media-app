import ApiErrorResponse from "./ApiErrorResponse"

const mongoError = (err) => {
  return new ApiErrorResponse(err.message, err.code)
}

export default mongoError