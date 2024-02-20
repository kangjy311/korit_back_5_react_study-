import { useState } from "react";
import CounterInput from "./CounterInput";
import CountButton from "./CountButton";

function Counter() {

  const [ number, setNumber ] = useState(0);
  // const number = 0;
  const [ count, setCount ] = useState(0);

  const handleInputIncrease = () => {
    setNumber(number + count);
  }
  const handleInputDecrease = () => {
    setNumber(number - count);
  }

  return (
    <>
      <h1>{ number }</h1>
      <CounterInput setCount={ setCount }/>
      <CountButton title={ "-" } onClick={ handleInputDecrease }/>
      <CountButton title={ "+" } onClick={ handleInputIncrease }/>
    </>
  );
}

export default Counter;