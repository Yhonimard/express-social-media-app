import httpStatus from "http-status";
import ApiErrorResponse from "./ApiErrorResponse";

class DbValidationError extends ApiErrorResponse {
  constructor(message){
    super(message, httpStatus.BAD_REQUEST)
  }
}
export default DbValidationError