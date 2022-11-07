import React, { useEffect, useState } from 'react';
import {authService , db} from 'fbase';
import {useNavigate} from 'react-router-dom';
import { collection, addDoc, query, where, orderBy, getDocs, onSnapshot } from "firebase/firestore";
import Tweet from 'components/Tweet';
import { updateProfile } from "firebase/auth";
import "styles/profile.scss"

function Profiles({userObj}) {//내정보들어오게 userObj(로그인한 사용자) 컴포넌트 설정
  const[tweets, setTweets] = useState([]);
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

//로그아웃 
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/'); //홈으로 이동 즉 리다이렉트 기능임
  }

//내가 작성한 글 가져오는 기능 - 조건설정
  const getMyTweets = async () => {
    const q = query(collection(db, "tweets"),
                    where("createId", "==" , userObj.uid), //createId(tweet글 올린 사용자)와 userObj.uid(로그인한 사용자Id)가 같을 경우에만 데이터 가져옴
                    orderBy("createAt","desc"))//desc:내림차순 asc:오름차순
    const querySnapshot = await getDocs(q);
    const newArray = [];
    querySnapshot.forEach((doc) => {
      newArray.push({...doc.data(), id:doc.id });
    });
    setTweets(newArray);
  }
  
  useEffect(() => {
    getMyTweets();
  },[]);

  const onChange = e => {
    const {target: {value}} = e;
    setNewDisplayName(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if(userObj.displayName != newDisplayName) {//displayName이 newDisplayName과 같지 않을 경우에만 실행
      await updateProfile(userObj, {displayName: newDisplayName, photoURL: ""});
    }
  }



  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input type="text" placeholder='Display name' 
        onChange={onChange} value={newDisplayName} 
        autoFocus className="formInput"/>
        <input type="submit" value="Update Profile" 
        className="formBtn" style={{marginTop: 10,}}/>
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
      <div>
        {tweets.map(tweet => (
          <Tweet 
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.createId === userObj.uid}
          />
        ))}
      </div>
    </div>
  )
}

export default Profiles