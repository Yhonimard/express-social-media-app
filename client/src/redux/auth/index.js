import authReducer from "./auth.reducer";
import request from "./auth.thunk"
const action = authReducer.actions
const reducer = authReducer.reducer


export default {
  action,
  reducer,
  request
}