import httpStatus from "http-status";
import ApiErrorResponse from "./ApiErrorResponse";

class ApiUnauthorizedError extends ApiErrorResponse {
  constructor(message) {
    super(message, httpStatus.UNAUTHORIZED)

  }
}

export default ApiUnauthorizedError