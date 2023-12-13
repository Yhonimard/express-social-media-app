import { Error as SequelizeError, ValidationError as SequelizeValidationError } from "sequelize"
import ApiErrorResponse from "./ApiErrorResponse"
import DbError from "./DbError"
import DbValidationError from "./DbValidationError"

const sequelizeError = (error, tableName) => {
  let err = error
  
  if (error instanceof SequelizeValidationError) {
    err = new DbValidationError({ error, table: tableName })
  } else if (error instanceof SequelizeError) {
    err = new DbError({ error, table: tableName })
  }
  err = new ApiErrorResponse(error.message, error.code)

  return err
}

export default sequelizeError