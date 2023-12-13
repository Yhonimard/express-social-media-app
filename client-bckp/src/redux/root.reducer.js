import { combineReducers } from "@reduxjs/toolkit"
import globalReducer from "./globalReducer"
import authReducer from "./authReducer"
import commentReducer from "./commentReducer"
import chatReducer from "./chatReducer"

const rootReducer = combineReducers({
  global: globalReducer.persist,
  auth: authReducer.persist,
  comment: commentReducer.init,
  chat: chatReducer.persist
})

export default rootReducer
