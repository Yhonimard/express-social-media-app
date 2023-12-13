
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import chatReducer from "./chat.reducer"

const chatPersist = persistReducer({
  key: "chat",
  storage,
}, chatReducer.reducer)

export default chatPersist 
