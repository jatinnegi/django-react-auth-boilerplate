import { combineReducers } from "redux";
import alerts from "./alerts.js";
import auth from "./auth";

export default combineReducers({ alerts, auth });
