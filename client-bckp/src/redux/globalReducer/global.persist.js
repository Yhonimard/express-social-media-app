import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import globalReducer from "./global.reducer"

const globalPersist = persistReducer({
  key: "global",
  storage,
  blacklist: ["loadingOverlay"]
}, globalReducer.reducer)

export default globalPersist