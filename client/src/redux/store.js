import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root";

const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false
    }).concat(),
});

export default store;
