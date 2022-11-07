import React, { useEffect, useState } from 'react';
import { db, storage } from 'fbase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import { ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "styles/tweet.scss";

function Tweet({tweetObj, isOwner}) {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const [nowDate, setNowDate] = useState(tweetObj.createAt);


  //이미지 삭제
  const onDeleteClick = async() => {
    const ok = window.confirm("삭제하시겠습니까?");
    if(ok){
      //console.log(tweetObj.id);
      //const data = await db.doc(`tweets/${tweetObj.id}`);
      const data = await deleteDoc(doc(db, "tweets", `/${tweetObj.id}`));
      //console.log(data);
      if(tweetObj.attachmentUrl !== ""){
        const deleteRef = ref(storage, tweetObj.attachmentUrl);
        await deleteObject(deleteRef);
      }
    }
  }

  //수정화면 나오게
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  }

  //input 수정가능
  const onChange = e => {
    const {target: {value}} = e;
    setNewTweet(value);
  }
  
  //문서 업데이트
  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log(tweetObj.id, newTweet);
    const newTweetRef = doc(db, "tweets", `/${tweetObj.id}`);
    await updateDoc(newTweetRef, {
      text: newTweet,
      createAt: Date.now()
    });
    setEditing(false);
  }

  useEffect( () => {//timeStamp함수가 계속 랜더링이 되므로 한번만 실행하기 위해 useEffect를 사용
    let timeStamp = tweetObj.createAt;
    const now = new Date(timeStamp);
    //console.log(now);
    setNowDate(now.toUTCString()); //.toUTCSstring():요일 일 월 년도 시간 .toDatestring()
  },[])

  return (
    <div className="tweet">
        {editing ? (//수정화면
          <>
            <form onSubmit={onSubmit} className="container tweetEdit">
              <input onChange={onChange} value={newTweet} required 
                className="formInput"/>
              <input type="submit" value="update Tweet" className="formBtn" />
            </form>
            <button onClick={toggleEditing} className="formBtn cancleBtn">
              Cancle
            </button>
          </>
        ) : (
          <>
            <h4>{tweetObj.text}</h4>
            {tweetObj.attachmentUrl && (
              <img src={tweetObj.attachmentUrl} width="50" height="50" />
            )}
            <span>{nowDate}</span>
            {isOwner && (
              <div className="tweet__actions">
                <span onClick={onDeleteClick}>
                 <FontAwesomeIcon icon="fa-solid fa-trash" />  
                </span>
                <span onClick={toggleEditing}>
                <FontAwesomeIcon icon="fa-solid fa-pencil" />
                </span>
              </div>
            )}
          </>
        )}
    </div>
  )
}

export default Tweet