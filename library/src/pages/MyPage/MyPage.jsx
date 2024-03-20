/** @jsxImportSource @emotion/react */
import { useMutation, useQueryClient } from "react-query";
import * as s from "./style";
import { sendAuthMailRequest } from "../../apis/api/sendAuthMail";
import FullSizeLoader from "../../components/FullSizeLoader/FullSizeLoader"
import { GoCheckCircle } from "react-icons/go";

function MyPage() {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");

    const sendAuthMailMutation = useMutation({
        mutationKey: "sendAuthMailMutation",
        mutationFn: sendAuthMailRequest,
        retry: 0,
        onSuccess: (response) => {
            if(response.data) {
                alert("메일 전송을 완료하였습니다.");
            } else {
                alert("메일 전송에 실패하였습니다.");
            }
        }
    });

    const handleSendAuthMailClick = () => {
        sendAuthMailMutation.mutate();
    }
    
    return (
        <>
            {
                sendAuthMailMutation.isLoading 
                ? <FullSizeLoader />
                : 
                <div css={s.layout}>
                    <div css={s.header}>
                        <div css={s.imgBox}>
                            <div css={s.profileImg}>
                                <img src="data:image/jpeg;base64,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" alt="" />
                            </div>
                        </div>
                        <div css={s.infoBox}>
                            <div css={s.infoText}>사용자이름: {principalData.data.username}</div>
                            <div css={s.infoText}>이름: {principalData.data.name}</div>
                            <div css={s.emailBox}>
                                <div css={s.infoText}>이메일: {principalData.data.email}</div>
                                {
                                    principalData.data.authorities.filter(auth => auth.authority === "ROLE_USER").length === 0 
                                    ? 
                                    <button css={s.infoButton} onClick={handleSendAuthMailClick}>인증하기</button>
                                    :
                                    <div css={s.emailCheck}><GoCheckCircle /></div>
                                }
                            </div>
                            <div css={s.infoButtons}>
                                <button css={s.infoButton}>정보 수정</button>
                                <button css={s.infoButton}>비밀번호 수정</button>
                            </div>
                        </div>
                    </div>
                    <div css={s.bottom}>

                    </div>
                </div>
                 
            }
        </>
    );
}

export default MyPage;