import { combineReducers } from 'redux';
import admin from './admin';
import modal from './modal';
import graph from './graph';
import infoModal from './infoModal';

const rootReducer = combineReducers({ admin, modal, graph, infoModal });

export default rootReducer;
