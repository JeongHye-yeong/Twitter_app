import React, { useEffect, useState } from 'react';
import { db, storage } from 'fbase';
import { collection, addDoc, query, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "styles/tweetFactory.scss";

function TweetFactory({userObj}) {
    const[tweet, setTweet] = useState("");
    const[attachment, setAttachment] = useState("");

    const onChange = e => {
        //console.log(e.target.value);
        const {target: {value}} = e;
        setTweet(value);
      }
    
      //이미지 업로드
      const onSubmit = async(e) => {
        e.preventDefault();
        let attachmentUrl ="";
        if(attachment !== ""){ //if문 사용해서 빈 공간이 아닐(사진이 있을) 경우에만 작동됨 
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);//ref:storagedp 업로드할 떄 경로역할을 함 파일 이 경로를 통해서 파일이 업로드 됨
        //storage는 Id를 자동으로 생성해주지 않으므로 npm install uuid설치`${userObj.uid}-폴더이름/${uuidv4}-파일이름이 됨`
        const response = await uploadString(storageRef, attachment, 'data_url');//storage에 업로드 
        //console.log(response);
         attachmentUrl = await getDownloadURL(ref(storage, response.ref)) //response.ref를 통해서 사진을 다운로드 받게 됨
        }
        
        await addDoc(collection(db, "tweets"), {
          text: tweet,
          createAt: Date.now(),
          createId: userObj.uid,//내 트윗이 수정, 삭제 위해 id를 넣음
          attachmentUrl //키와 값이 같아서 하나만 써서 적용
        });
        setTweet("");
        setAttachment("");
      }
    
      const onFileChange = e => {
        //console.log(e.target.files);
        const {target: {files}} = e;
        const theFile = files[0];//첫번쨰만 가져오겠다
        const reader = new FileReader();//FileReader : 브라우저의 API로 파일을 웹브라우저에 출력함
        reader.onloadend = (finishedEvent) => { //웹브라우저가 onloadend를 끝낸 시점인식
          //console.log(finishedEvent);
          const {currentTarget:{result}} = finishedEvent;
          setAttachment(result);
        }
        reader.readAsDataURL(theFile);//웹브라우저가 사진파일을 인식한 시점인식, reader함수는 두가지 시점을 인식함
      }
    
    //이미지 삭제
      const onClearAttachment = () => setAttachment("");//실행문 하나일때는 {}없애고 간단하게 적용가능
      
    


  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input type="text" placeholder="What's on your mind"
          value={tweet} onChange={onChange} maxLength={120} 
          className="factoryInput__input" />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__lable">
      <span>Add photos</span>
      <FontAwesomeIcon icon="fa-solid fa-plus" />
      </label>
      <input type="file" accept='image/*' onChange={onFileChange}
      id="attach-file" style={{opacity: 0,}} />
      {attachment && (
        <div className="factoryInput__attachment">
          <img src={attachment} style={{backgroundImage: attachment,}} /> 
          <div className="factoryInput__clear" onClick={onClearAttachment}>
            <span>Clear</span>
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </div>
        </div>
      )}
    </form> 
  )
}

export default TweetFactory