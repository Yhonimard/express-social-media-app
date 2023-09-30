import { combineReducers } from "@reduxjs/toolkit"
import globalReducer from "./globalReducer"
import authReducer from "./authReducer"


const rootReducer = combineReducers({
  global: globalReducer.init,
  auth: authReducer.persist
})

export default rootReducer