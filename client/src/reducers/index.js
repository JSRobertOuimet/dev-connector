import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";
import errorReducer from "./error-reducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  errors: errorReducer
});