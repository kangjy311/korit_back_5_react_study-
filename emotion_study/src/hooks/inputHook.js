import { useState } from "react";

export function useInput() {
    const [ inputValue, setInputValue ] = useState("");

    const onChange = (e) => {
        const { value } = e.target;
        setInputValue(() => value);
        // (상태가 변하면 렌더링)직접 참조x , 매개변수로 받아와서 
    }
    return [ inputValue, onChange ];
    // 비구조 할당
} 

export function useMaxSizeValidateInput(maxSize) {
    const [ inputValue, setInputValue ] = useState("");

    const onChange = (e) => {
        const { value } = e.target;
        if(value.length <= maxSize) {
            setInputValue(() => value);
        }

    }
    return [ inputValue, onChange ];
} 