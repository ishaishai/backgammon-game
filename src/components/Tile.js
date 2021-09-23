import Checker from "./Checker";

// props -> tile color , checker color, potenMoves
//

const Tile = (props) => {
  return (
    <div
      className={`tile ${props.i === 0 ? "down" : "up"} ${props.tileColor}`}
      onClick={props.pickTile ? () => props.pickTile(props.i, props.j) : null}
    >
      {/* {`${props.i} ${props.j}`} */}
      {props.checkers && props.checkers.split("").map((checker,index) => {     
        if(index===props.checkers.length-1) {return   <Checker
          color={checker==="B" ? "red" : "white"}
          pickChecker={props.pickChecker}
          picked={props.picked}
          i={props.i}
          j={props.j}
        />}
        else {
          return <Checker
          color={checker==="B" ? "red" : "white"}
          pickChecker={props.pickChecker}
          i={props.i}
          j={props.j}
        />
        }
      })}
    </div>
  );
};

export default Tile;
