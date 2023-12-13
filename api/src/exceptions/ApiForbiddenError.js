import httpStatus from "http-status";
import ApiErrorResponse from "./ApiErrorResponse";

class ApiForbiddenError extends ApiErrorResponse {
  constructor(message) {
    super(message, httpStatus.FORBIDDEN)
  }
}
export default ApiForbiddenError