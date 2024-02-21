// 클라이언트 -> 서버 요청 -> 서버의 응답 -> 클라이언트

클라이언트_화면_출력();     // 함수 호출


function 클라이언트_화면_출력() {   // 함수 정의
    let a = 클라이언트_데이터_입력(10);
    let b = 클라이언트_데이터_입력(20);

    let 요청데이터 = {
        데이터1: a,
        데이터2: b
    };

    // function test() { // 함수 안에 함수 x
    const test = () => {
        let c = 30;
        return 요청데이터;
    }

    클라이언트_데이터_삽입_요청_버튼_클릭(test());
}

// Input
function 클라이언트_데이터_입력(데이터) {   
    return 데이터;
    // return; :함수 탈출
}

function 클라이언트_데이터_삽입_요청_버튼_클릭(요청데이터) {
    백엔드_데이터_삽입_요청(요청데이터);
}

function 백엔드_데이터_삽입_요청(요청데이터) {
    console.log(요청데이터);

    console.log("요청");
}