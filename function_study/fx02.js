응답데이터_뿌려주기();

function 응답데이터_뿌려주기() {
    const responseData = {
        title: "응답데이터",
        dataList: [
            {
                name: "김준일",
                age: 31
            },
            {
                name: "김준이",
                age: 32
            },
            {
                name: "김준삼",
                age: 33
            }
        ]
    }

    console.log(타이틀_컴포넌트(responseData.title));
    // 테이블_TR_TD_컴포넌트(responseData.dataList[0]);
    // 테이블_TR_TD_컴포넌트(responseData.dataList[1]);
    // 테이블_TR_TD_컴포넌트(responseData.dataList[2]);
    for(let i = 0; i < responseData.dataList.length; i++) {
        console.log(테이블_TR_TD_컴포넌트(responseData.dataList[i]));
    }
    
    for(let 학생 of responseData.dataList) {
        console.log(테이블_TR_TD_컴포넌트(학생));
    }

    // 비구조 할당
    const 타이틀 = responseData.title;
    const 학생들 = responseData.dataList;

    const {title, dataList} = responseData;
    const {name, age} = dataList[0];

    for(let 학생 of dataList) {
        console.log(테이블_TR_TD_컴포넌트(학생, title));
    }

    const user = {
        username: "aaa",
        password: "1234",
        name: "김준일"
    }
    const {username, password} = user;

    console.log(username);
    console.log(password);
}

function 타이틀_컴포넌트(타이틀) {
    return `
        <h1>${타이틀}</h1>
    `;
}

function 테이블_TR_TD_컴포넌트({name, age}, title) {
    console.log(title);
    return `
        <tr>
            <td>${name}</td>
            <td>${age}</td>
        </tr>
    `;
}