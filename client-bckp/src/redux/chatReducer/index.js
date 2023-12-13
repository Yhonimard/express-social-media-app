import chatPersist from "./chat.persist";
import chatReducer from "./chat.reducer";

export default {
  persist: chatPersist,
  action: chatReducer.actions
}

