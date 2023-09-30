import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "../auth";

const authPersist = persistReducer({
  key: "auth",
  storage,
  whitelist: ['data']
},
  auth.reducer
)

export default authPersist