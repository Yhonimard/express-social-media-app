import httpStatus from "http-status";
import ApiErrorResponse from "./ApiErrorResponse";

class ApiNotFoundError extends ApiErrorResponse {
  constructor(message) {
    super(message, httpStatus.NOT_FOUND)
  }
}

export default ApiNotFoundError