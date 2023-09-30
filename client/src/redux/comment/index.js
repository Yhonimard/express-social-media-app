import commentThunk from "./comment.thunk";
import commentReducer from "./comment.reducer";

export default {
  request: commentThunk,
  action: commentReducer.actions,
  reducer: commentReducer.reducer
}