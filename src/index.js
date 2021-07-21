import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyAyc5AhneRxo27wpeLp01uUu-6kArT4NCI",
  authDomain: "cytoscape-devblog.firebaseapp.com",
  projectId: "cytoscape-devblog",
  storageBucket: "cytoscape-devblog.appspot.com",
  messagingSenderId: "3739496646",
  appId: "1:3739496646:web:67bc71bdabc7963c2da7c7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
