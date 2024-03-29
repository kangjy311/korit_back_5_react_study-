import { css } from "@emotion/react";

export const layout = css`
    padding: 100px 30px 0px ;
`;

export const profileHeader = css`
    box-sizing: border-box;
    margin: 0px auto 20px;
    padding: 30px;
    border: 1px solid #dbdbdb;
    width: 700px;
`;

export const title = css`
    margin-bottom: 50px;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
`;

export const profileImg = css`
    /* 이미지 가운데 맞추기 */
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0px auto 20px;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    cursor: pointer;
    /* 이미지 넣기 */
    overflow: hidden;
    & > img {
        width: 100%;
        /* height: 100%; */
        /* 둘 중에 하나만 100% 둘다 100%하면 이미지가 늘어남 */
    }
`;

export const nicknameLayout = css`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

export const nickname = css`
    box-sizing: border-box;
    outline: none;
    border: none;
    border-bottom: 2px solid #dbdbdb;
    padding: 5px 10px 0px;
    text-align: center;
    width: 200px;
    font-size: 18px;
    font-weight: 600;
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;
    &:focus {
        border-bottom: wpx solid #bbb;
        background-color: #fafafa;
    }
`;

export const profileInputLayout = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
    margin: 0px auto 20px;
    border: 1px solid #dbdbdb;
    padding: 10px 10px 0 10px;
    width: 700px;
`;

export const inputBox = css`
    position: relative;
    margin-bottom: 10px;
`;

export const profileInput = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    padding: 20px 20px 10px;
    font-size: 16px;
    width: 335px;
    &:nth-of-type(3n), &:nth-of-type(4n) {
        margin: 0;
    }
    &:focus {
        outline: 1px solid #5dd6ff;
    }
    & + label {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        left: 23px;
        font-weight: 600;
        transition: all 0.2s ease-in-out;
        color: #333;
    }
    &:focus + label, &:not(:placeholder-shown) + label {
        top: 13px;
        left: 23px;
        font-size: 11px;
    }
`;

export const buttonLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const profilebutton = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    padding: 10px 20px;
    /* (input,) button 크기 padding으로 맞추기 */
    width: 700px;
    height: 50px;
    background-color: white;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #eeeeee;
    }
`;
