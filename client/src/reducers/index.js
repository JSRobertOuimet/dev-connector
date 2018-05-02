import { combineReducers } from "redux";
import errorReducer from "./error-reducer";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";
import postReducer from "./post-reducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer
});