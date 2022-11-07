import React, { useEffect, useState } from 'react';
import { db, storage } from 'fbase';
import { collection, addDoc, query, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import Tweet from 'components/Tweet';
import TweetFactory from 'components/TweetFactory';

function Home({userObj}) {
  //console.log(userObj);
  const[tweets, setTweets] = useState([]);
  
/*실시간이 아닐 때는 get함수 사용해서 async,await을 사용함
  const getTweets = async () => {
    const q = query(collection(db, "tweets"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      //setTweets(prev => [doc.data(), ...prev])'//새 트윗을 가장 먼저 보이고 이전꺼는 나중에 보이게 함
      const tweetObject = {...doc.data(), id:doc.id }//기존값에다가 id추가
      setTweets(prev => [tweetObject, ...prev]);
    });
  }//querySnapshot : 문서들의 원본을 사진찍듯이 찍어서 내보내줌
*/

  useEffect( () => {//실시간 데이터베이스로 문서들 가지고 올 떄
    //getTweets();
    const q = query(collection(db, "tweets"),
              orderBy("createAt","desc"));//desc 내림차순
    const unsubscribe =onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});
      });
      //console.log(newArray);
      setTweets(newArray);
    });
  }, []);//useEffect는 async, await를 직접 사용하지 않고 get함수를 만들어 사용

  //console.log(tweets);

 
  return (
    <div className="container">
    <TweetFactory userObj={userObj} />

    <div style={{ marginTop: 30 }}>
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

export default Home