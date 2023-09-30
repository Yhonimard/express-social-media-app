import postReducer from "./post.reducer";
import request from './post.thunk'
const action = postReducer.actions
const reducer = postReducer.reducer

export default {
  action,
  reducer,
  request
}