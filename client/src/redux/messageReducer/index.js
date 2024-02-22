import messageReducer from "./message.reducer";

export default {
  action: messageReducer.actions,
  init: messageReducer.reducer
}