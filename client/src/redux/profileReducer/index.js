import profileReducer from "./profile.reducer";
import profilePersist from "./profile.persist";

export default {
  persist: profilePersist,
  action: profileReducer.actions
}
