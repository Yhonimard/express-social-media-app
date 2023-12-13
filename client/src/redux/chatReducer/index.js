import chatReducer from "./chat.reducer";
import chatPersist from "./chat.persist";
export default {
  persist: chatPersist,
  action: chatReducer.actions
}