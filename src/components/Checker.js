import { useState } from "react";

const Checker = (props) => {
  console.log(props.picked && "picked")
  return (
    <div
      className={`checker ${props.color} ${props.picked && "picked"}`}
      onClick={() => props.pickChecker(props.i, props.j)}
    ></div>
  );
};

export default Checker;
