import authPersist from "./auth.persist";
import authReducer from "./auth.reducer";

export default {
  persist: authPersist,
  action: authReducer.actions
}