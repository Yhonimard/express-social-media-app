import { combineReducers } from "@reduxjs/toolkit"
import globalReducer from "./globalReducer"
import authReducer from "./authReducer"
import commentReducer from "./commentReducer"


const rootReducer = combineReducers({
  global: globalReducer.persist,
  auth: authReducer.persist,
  comment: commentReducer.init
})

export default rootReducer