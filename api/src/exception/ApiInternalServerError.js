import httpStatus from "http-status";
import ApiErrorResponse from "./ApiErrorResponse";

class ApiInternalServerError extends ApiErrorResponse {
  constructor(message) {
    super(message, httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export default ApiInternalServerError