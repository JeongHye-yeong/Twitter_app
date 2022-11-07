import React, { useState } from 'react';
import {authService} from 'fbase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "styles/authForm.scss"

function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error,setError] = useState("");  

    const onChange = e => {
        //console.log(e.target.name);
        const {target: {name, value}} = e;
        if(name === "email") {
            setEmail(value);
        }else if(name === "password") {
            setPassword(value);
        }
      }
    
    const onSubmit = async (e) => {
    e.preventDefault();
    try {
        let data;  //const가 아닌 let 사용은 값이 변할 수 있으므로
        if(newAccount){
            //create newAccount
            data = await createUserWithEmailAndPassword(authService, email, password)
        }else{
            //log in
            data = await signInWithEmailAndPassword(authService, email, password)
        }
        //console.log(data); //회원가입을 마친 사용자 정보가 들어와 있음
    } catch (error) {
        //console.log(error);
        setError(error.message);
    }
    }
    
    const toggleAccount = () => setNewAccount((prev) => !prev);
      
  return (
    <>
        <form onSubmit={onSubmit} className="container">
            <input type="email" placeholder="Email을 입력해 주세요" required 
                name='email' value={email} onChange={onChange} className="authInput" />
            <input type="password" placeholder='Password를 입력해 주세요' required
                name='password' value={password} onChange={onChange}  className="authInput" />
            <input type="submit"  className="authInput authSubmit"
                value={newAccount ? "Create Account" : "Log In"} />
                {error && 
                  <span className="authError">{error}</span>
                }
        </form>
        <span onClick={toggleAccount} className="authSwitch">
            {newAccount ? "sign In" : "Create Account"}
        </span>
    </>
  )
}

export default AuthForm