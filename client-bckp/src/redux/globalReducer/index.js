import globalPersist from "./global.persist";
import globalReducer from "./global.reducer";

export default {
  init: globalReducer.reducer,
  action: globalReducer.actions,
  persist: globalPersist
}