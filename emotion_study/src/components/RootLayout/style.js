import { css } from "@emotion/react";

export const backgroundLayout = css`
    /* 포지션fixed에 높이 100% - 요소들이 차면 스크롤 안생기고 화면 밑으로 넘어감 */
    position: fixed;
    transform: translateX(-50%);
    top: 0;
    left: 50%;
    z-index: -1;
    width: 1000px;
    height: 100vh;  /* 화면 100% 넘으면 스크롤 생김*/
    background-color: white;
    
`;

export const layout = css`
    margin: 0px auto;
    width: 1000px;
`;
