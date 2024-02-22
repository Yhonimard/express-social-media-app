import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "./authReducer"
import globalReducer from "./globalReducer"
import commentReducer from "./commentReducer"
import profileReducer from "./profileReducer"
import chatReducer from "./chatReducer"
import messageReducer from "./messageReducer"

const rootReducer = combineReducers({
  auth: authReducer.persist,
  global: globalReducer.persist,
  comment: commentReducer.init,
  profile: profileReducer.persist,
  chat: chatReducer.persist,
  message: messageReducer.init
})

export default rootReducer
