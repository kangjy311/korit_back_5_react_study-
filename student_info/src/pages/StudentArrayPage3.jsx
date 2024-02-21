import React from 'react';

function StudentArrayPage3(props) {
    // 화면 구성요소 - (input) 입력 기능 - input 상태 바뀌는지 확인 useEffect (console) - 추가 - 리스트에 추가 되는지 확인 useEffect - 리스트.맵 입력 받는지 확인 - 
    // - ID
     
    // input은 문자열로 입력
    // useRef: 렌더링이 되어도 값이 변하지 않음
    // 렌더링: html 코드가 나타나는 것 (출력)- return( )

    return (
        <div>
            <div>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <button>추가</button>
            </div>        
        </div>
    );
}

export default StudentArrayPage3;
