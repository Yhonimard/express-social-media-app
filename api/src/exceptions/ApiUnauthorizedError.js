import httpStatus from "http-status";
import ApiErrorResponse from "./ApiErrorResponse";

class ApiUnauthorizedError extends ApiErrorResponse {
  constructor() {
    super("Unauthorized", httpStatus.UNAUTHORIZED)
  }

}

export default ApiUnauthorizedError