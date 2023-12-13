import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library"
import httpStatus from "http-status"
import ApiBadRequestError from "./ApiBadRequestError"
import ApiErrorResponse from "./ApiErrorResponse"

const customPrismaError = (error, { msgP2002, msgP2011, msgP2019, msgP2025, }) => {

  let err
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") err = new ApiBadRequestError(msgP2002 || `${error.meta.target} already exist `)
    if (error.code === "P2011") err = new ApiBadRequestError(msgP2011 || `${error.meta.target} is required`)
    if (error.code === "P2019") err = new ApiBadRequestError(msgP2019 || `input error on ${error.meta.target}`)
    if (error.code === "P2025") err = new ApiErrorResponse(msgP2025 || error.message, httpStatus.NOT_FOUND)
    if (error.code === "P2012") err = new ApiErrorResponse(error.message, httpStatus.BAD_REQUEST)

  } else if (error instanceof PrismaClientUnknownRequestError) err = new ApiInternalServerError(typeof error.message === "string" ? error.message : "unknown error")

  else err = new ApiErrorResponse(error.message, error.code)

  return err

}

export default customPrismaError