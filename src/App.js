import React, { useState, useEffect } from 'react';
import AppRouter from "Router";
import {authService} from 'fbase';
import { onAuthStateChanged } from "firebase/auth";
// fotawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faTwitter, faGoogle, faGithub)

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);//로그인한 사용자 정보

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      //console.log(user);
      if (user) {
        // User is signed in
        setIsLoggedIn(user); 
        setUserObj(user);
        //const uid = user.uid;

      } else {
        // USer is signed out
        //setIsLoggedIn(false);
        setUserObj(false);
      }
      setInit(true);
    });
  }, []) //서버로 사용자 인증 요청 후 firebase에서 로그인 정보를 받고난 다음에 (시간차 존재함 그 시간을 기다린 후) 실행되는 함수useEffect 사용
  //console.log(authService.currentUser);//currentUser 현재 로그인한 사람 확인 함수

  return (
    <>
    {init ? (
      <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> 
    ) : (
      "initializing..." )}
    <footer>&copy; {new Date().getFullYear()} Twitter app</footer>
    </>
    );
}

export default App;
