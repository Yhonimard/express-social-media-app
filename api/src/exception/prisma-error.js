import { Prisma } from "@prisma/client"
import ApiBadRequestError from "./ApiBadRequestError"
import ApiErrorResponse from "./ApiErrorResponse"
import ApiInternalServerError from "./ApiInternalServerError"
import ApiNotFoundError from "./ApiNotFoundError"

const prismaError = (error, table) => {
  let err
  
  if (error.code === "P2002") err = new ApiBadRequestError(`${error.meta.target} already exists`)
  else if (error.code === "P2014") err = new ApiBadRequestError(`id ${error.meta.target} not found`)
  else if (error.code === "P2003") err = new ApiBadRequestError(`invalid input data ${error.meta.target}`)
  else err = new ApiErrorResponse(error.message, error.code)


  return err
}

export default prismaError