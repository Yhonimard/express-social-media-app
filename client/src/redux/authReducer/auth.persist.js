import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "./auth.reducer"

const authPersist = persistReducer({
  key: "auth",
  storage: storage,

}, authReducer.reducer)

export default authPersist