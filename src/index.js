import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import "styles/index.scss";//절대주소 설정해서 src가 기본으로 설정(jsconfig.json)되어 있음 일반적인 것 아님
//import firebase from './firebase';
//console.log(firebase);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


