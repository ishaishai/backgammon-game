import { useEffect, useState } from "react";

const Dice = (props) => {
  
  return (
    // <div className="dice">
    //   <div className="cube-face1 cube-face ">1</div>
    //   <div className="cube-face2 cube-face ">2</div>
    //   <div className="cube-face3 cube-face">3</div>
    //   <div className="cube-face4 cube-face ">4</div>
    //   <div className="cube-face5 cube-face ">5</div>
    //   <div className="cube-face6 cube-face ">6</div>
    // </div>
    <div style={{width: "50px",height: "50px",backgroundColor: "white"}}>{props.num}</div>
  );
};

export default Dice;
