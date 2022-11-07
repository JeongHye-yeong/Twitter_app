import Navigation from 'components/Navigation';
import React, { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profiles from 'routes/Profiles';
//import { HashRouter } from "react-router-dom";
//BrowserRouter 깃허브 에러시 HashRouter로 대체하지만 권장하지는 않음.


function AppRouter({isLoggedIn,userObj}) {

  return (//&& isLoggedIn값이 true이면 Navigation 실행해라. 앞의 연산자가 트루일시 뒤에 연산자 실행시킴
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        {isLoggedIn && <Navigation userObj={userObj} />} 
        <Routes>
            {isLoggedIn ? (
            <>  
              <Route path='/' element={<Home userObj={userObj} />} />
              <Route path='/profile' element={<Profiles userObj={userObj} /> } />
            </>
            ) : (
            <Route path='/' element={<Auth />} />
            )}
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
