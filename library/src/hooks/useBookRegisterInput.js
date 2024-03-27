import { useState } from "react"

export const useBookRegisterInput = (enterFx, ref) => {
    const [ value, setValue ] = useState("");

    const handleOnChange = (e) => {
        if(!!e.target) {
            setValue(() => e.target.value);
        } else {
            setValue(() => e.value);
        }
    }

    const handleOnKeyDown = (e) => {
        if(e.keyCode === 13) {
            enterFx(ref);
        }
    }

    return { value, handleOnChange, handleOnKeyDown, setValue };
}