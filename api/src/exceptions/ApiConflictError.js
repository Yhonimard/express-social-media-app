import httpStatus from "http-status";
import ApiErrorResponse from "./ApiErrorResponse";

class ApiConflictError extends ApiErrorResponse {
  constructor(message,) {
    super(message, httpStatus.CONFLICT)
  }
}

export default ApiConflictError