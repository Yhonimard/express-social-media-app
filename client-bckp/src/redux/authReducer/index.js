import authPersist from "./auth.persist";
import authReducer from "./auth.reducer";
export default {
  init: authReducer.reducer,
  action: authReducer.actions,
  persist: authPersist
}