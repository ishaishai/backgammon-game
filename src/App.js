import Board from "./components/Board";
import Dice from "./components/Dice";
import "./components/style.css";
import { useEffect, useState } from "react";

function App() {
  const [currentDices, setCurrentDices] = useState([]);

  //this function will generate a random number between 1 and 6 (or whatever value you send it)
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  //our main roll dice function on click
  function rollDice() {
    let newNumbers = [];
    setCurrentDices([]);
    //genberate a random number between 1 and 6 with out getRandomInt function
    
    
    setCurrentDices([getRandomInt(1,6),getRandomInt(1,6)]);
  }
  // set initial side

  useEffect(() => {
    rollDice();
  }, []);

  useEffect(()=>{
    console.log(currentDices);
  },[currentDices])

  return (
    <div className="App">
      <Board dices = {currentDices} />
      <div className="dices-box">
        <Dice num = {currentDices[0]} />
        <Dice num = {currentDices[1]} />
      </div>
    </div>
  );
}

export default App;
