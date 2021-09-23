import Tile from "./Tile";
import { useState, useEffect } from "react";

const Board = (props) => {
  const [state, setState] = useState({
    matrix: [
      [
        "BBBBB",
        null,
        null,
        null,
        "WWW",
        null,
        "WWWWW",
        null,
        null,
        null,
        null,
        "BB",
      ],
      [
        "WWWWW",
        null,
        null,
        null,
        "BBB",
        null,
        "BBBBB",
        null,
        null,
        null,
        null,
        "WW",
      ],
    ],
    B: 15,
    W: 15,
    waitingB: 0,
    waitingW: 0,
  });
  const [playerTurn, setPlayerTurn] = useState("B");
  const [pickedCheckers, setPickedCheckers] = useState([]);
  const [toggleError, setToggleError] = useState(false);

  useEffect(() => {
    if (state.B === 0 || state.W === 0) {
      alert(`${state.B === 0 ? "Black" : "White"} wins`);
    }
  }, [state.B, state.W]);

  useEffect(()=>{
    console.log(pickedCheckers);
  },[pickedCheckers])
  const pickChecker = (i, j) => {
    //how many checkers do you want to select from that index
    if (state.matrix[i][j].split("")[0] === playerTurn){
      //need to change structure to { i,j,count} cause selecting multiple checkers in same tile
      setPickedCheckers(prev => [...prev,{ i, j }]);}
  };

  //check if picked a tile which has differnce of 2 and a oppomnent checker if so eat it! :]
  const pickTile = (i, j) => {
    console.log(i, j);
    if (pickedCheckers.length>0) {
      
    }

    //if a successful move made and a error is shown
    if (toggleError) setToggleError(false);
  };

  return (
    <div className="board">
      {state.matrix.map((row, i) => {
        let line = [];

        row.forEach((tileCheckers, j) => {
          if (j === 6) {
            line.push(<hr />);
          }
          line.push(
            <Tile
              tileColor={
                 (i + j) % 2
                  ? "gray"
                  : "black"
              }
              checkers={tileCheckers}
              pickTile={pickTile}
              pickChecker={tileCheckers !== null && pickChecker}
              picked = {pickedCheckers.some((item) => item.i === i && item.j ===j)}
              i={i}
              j={j}
            />
          );
        });
        return <div style={{ display: "flex" }}>{line}</div>;
      })}
      {toggleError && (
        <div
          style={{
            position: "relative",
            width: "fit-content",
            margin: "auto",
            color: "red",
            fontWeight: "800",
            fontSize: "1.5rem",
          }}
        >
          Invalid Move
        </div>
      )}
      {/* <button
        style={{
          position: "absolute",
          bottom: "5%",
        }}
        onClick={() => setPickedChecker(null)}
      >
        clear
      </button> */}
    </div>
  );
};

export default Board;
