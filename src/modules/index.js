import { combineReducers } from 'redux'
import admin from "./admin"
import modal from "./modal"

const rootReducer = combineReducers({ admin, modal });

export default rootReducer;