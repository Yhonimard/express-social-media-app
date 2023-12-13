import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import profileReducer from "./profile.reducer";

const profilePersist = persistReducer({
  key: "profile",
  storage,
  blacklist: ['isOpenFollowersModal', 'isOpenFollowingModal']
}, profileReducer.reducer)

export default profilePersist
