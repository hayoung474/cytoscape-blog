import { combineReducers } from 'redux'
import admin from "./admin"
import modal from "./modal"
import graph from './graph'

const rootReducer = combineReducers({ admin, modal,graph });

export default rootReducer;