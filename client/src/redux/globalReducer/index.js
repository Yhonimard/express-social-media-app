import globalPersist from "./global.persist";
import globalReducer from "./global.reducer";

export default {
  persist: globalPersist,
  action: globalReducer.actions
}
