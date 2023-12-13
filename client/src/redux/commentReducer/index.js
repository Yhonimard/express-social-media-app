import commentReducer from "./comment.reducer";

export default {
  action : commentReducer.actions,
  init: commentReducer.reducer
}