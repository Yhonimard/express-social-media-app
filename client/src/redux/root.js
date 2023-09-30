import { combineReducers } from "@reduxjs/toolkit";
import authPersist from "./persist/auth.persist";
import global from "./global";
import post from "./post";
import home from "./home";
import comment from "./comment";


const rootReducer = combineReducers({
  auth: authPersist,
  global: global.reducer,
  post: post.reducer,
  home: home.reducer,
  comment: comment.reducer
})

export default rootReducer