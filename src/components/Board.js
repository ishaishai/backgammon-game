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
  const [pickedCheckers, setPickedCheckers] = useState({
    i: -1,
    j: -1,
    count: 0,
  });
  const [toggleError, setToggleError] = useState(false);

  useEffect(() => {
    if (state.B === 0 || state.W === 0) {
      alert(`${state.B === 0 ? "Black" : "White"} wins`);
    }
  }, [state.B, state.W]);

  useEffect(() => {
    console.log(pickedCheckers);
  }, [pickedCheckers]);
  const pickChecker = (i, j) => {
    //how many checkers do you want to select from that index
    if (state.matrix[i][j].split("")[0] === playerTurn) {
      //need to change structure to { i,j,count} cause selecting multiple checkers in same tile
      let isDouble = props.dices[0] === props.dices[1] ? true : false;
      console.log(isDouble);
      if (
        isDouble &&
        ((pickedCheckers.count < 4 &&
          pickedCheckers.count < state.matrix[i][j].length) ||
          i !== pickedCheckers.i ||
          j !== pickedCheckers.j)
      ) {
        setPickedCheckers({
          i,
          j,
          count:
            i === pickedCheckers.i && j === pickedCheckers.j
              ? pickedCheckers.count + 1
              : 1,
        });
      } else if (!isDouble) {
        setPickedCheckers({
          i,
          j,
          count: 1,
        });
      }
      else {
        console.log("IN ELSE");
      }
    }
  };

  //check if picked a tile which has differnce of 2 and a oppomnent checker if so eat it! :]
  const pickTile = (i, j) => {
    let tmpMatrix = [...state.matrix];
    if (pickedCheckers.count > 0) {
      if (state.matrix[i][j] === null || state.matrix[i][j][0] === playerTurn) {
        tmpMatrix[i][j] = tmpMatrix[i][j]
          ? tmpMatrix[i][j] + playerTurn.repeat(pickedCheckers.count)
          : playerTurn.repeat(pickedCheckers.count);
        // console.log(tmpMatrix);
        // console.log(pickedCheckers.i, pickedCheckers.j);
        tmpMatrix[pickedCheckers.i][pickedCheckers.j] = playerTurn.repeat(
          tmpMatrix[pickedCheckers.i][pickedCheckers.j].length -
            pickedCheckers.count
        );
        console.log(tmpMatrix);
        // setState((prev) => {
        //   return { ...prev, matrix: tmpMatrix };
        // });
        setPickedCheckers({ i: -1, j: -1, count: 0 });
      }
      // if(state.matrix[i][j].length>0 && state.matrix[i][j][[0]===playerTurn])
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
              tileColor={(i + j) % 2 ? "brown" : "browner"}
              checkers={tileCheckers}
              pickTile={pickTile}
              pickChecker={tileCheckers !== null && pickChecker}
              picked={
                pickedCheckers.i === i && pickedCheckers.j === j
                  ? pickedCheckers.count
                  : 0
              }
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
