import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 파이어베이스
import firebase from 'firebase';

// 리덕스
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';

// 파이어베이스 설정
var firebaseConfig = {
  apiKey: 'AIzaSyAyc5AhneRxo27wpeLp01uUu-6kArT4NCI',
  authDomain: 'cytoscape-devblog.firebaseapp.com',
  projectId: 'cytoscape-devblog',
  storageBucket: 'cytoscape-devblog.appspot.com',
  messagingSenderId: '3739496646',
  appId: '1:3739496646:web:67bc71bdabc7963c2da7c7',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 리덕스 설정
const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
