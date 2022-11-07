import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navigation({userObj}) {
  return (
    <nav>
      <ul style={{ display:"flex", justifyContent: "center", marginTop: 50,}}>
        <li>
          <Link to={'/'} style={{marginRight: 10}}>        
            <FontAwesomeIcon icon="fa-brands fa-twitter" 
            color={"#04AAFF"} size="2x"/>
          </Link>
        </li>
        <li>
          <Link to={'/profile'} 
          style={{display: "flex",flexDirection: "column",alignItems: "center",
                  marginLeft: 10, fontSize: 12, }}>
            <FontAwesomeIcon icon="fa-solid fa-user"
              color={"#04AAFF"} size="2x"/>
            <span style={{ marginTop: 10 }}>
            {userObj.displayName ? `${userObj.displayName}의 Profile` : "Profile"}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
//인라인스타일을 리액트 컴포넌트에 적용할떄는 style={{marginRight: 10}}로 {{}}두개 필수
export default Navigation