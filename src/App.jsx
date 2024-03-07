import { useState } from "react";


function App(){
    const[rectangulos,setRectangulos] = useState(Array(9).fill(null)) 
    //[null,null,null,null,null,null,null,null,null]
    //[rectangulos[0],rectangulos[1],rectangulos[2],rectangulos[3],rectangulos[4],rectangulos[5],rectangulos[6],rectangulos[7],rectangulos[8]]

    const[turnoQuien,setTurnoQuien] = useState(true);
    //true: player 1 turn, false: player 2 turn



    //create a button with index
    const renderSquare = (i) => {
      return (//asing the value to rectangulo[index]
        <button className="border-2 border-purple-400 text-xl font-bold h-20 w-20 text-purple-400 hover:border-purple-300" onClick={() => handleClick(i)}  disabled={rectangulos[i] !== null}>
          {rectangulos[i]} 
        </button>
      );
    }; 

    function resetGame() {
      setRectangulos(Array(9).fill(null)); // all fields return to null
      setTurnoQuien(true); // start player X
      
  }
   
    function howisWin(tablero){
      const posicionesGanadoras = [ // position win
        [0, 1, 2], //tablero [0]  posicionesGanadoras[0] [a:0,b:1,c:2]
        [3, 4, 5], //tablero [1]  posicionesGanadoras[1] [a:3,b:4,c:5]
        [6, 7, 8], //tablero [2]  posicionesGanadoras[2] [a:6,b:7,c:8]
        [0, 3, 6], //tablero [3]  posicionesGanadoras[3] [a:0,b:3,c:6]
        [1, 4, 7], //tablero [4]  posicionesGanadoras[4] [a:1,b:4,c:7]
        [2, 5, 8], //tablero [5]  posicionesGanadoras[5] [a:2,b:5,c:8]
        [0, 4, 8], //tablero [6]  posicionesGanadoras[6] [a:0,b:4,c:8]
        [2, 4, 6], //tablero [7]  posicionesGanadoras[7] [a:2,b:4,c:6]
      ];
      for (let i = 0; i < posicionesGanadoras.length; i++) { 
        const [a, b, c] = posicionesGanadoras[i];
        if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
          return tablero[a]; //[X] or [O]    (True)   
        }
      }
      return null // -> NULL (False)
     }

    let status; //create a variable
    const winner = howisWin(rectangulos); 
    if (winner) {
      status = 'Winner: ' + winner; //show winner and symbol
    } else {
      status = 'Next player: ' + (turnoQuien ? 'X' : 'O'); //show player turn
      showifTie()
    }

    function showifTie(){
      let isTie = true; // create the variable
      for (let i = 0; i < rectangulos.length; i++) { //we search in the array if we have a value = null
        if (rectangulos[i] === null) { //if wh have
          isTie = false; // tie is false
          break; //leave the for
        }
      }
    
      if (isTie && !winner) { //if isTie = true and winner = false
        status = 'Tie, play again!'; //we have a tie.
      }
    }

    function handleClick(i){
      const winner = howisWin(rectangulos); // if winner true
      if(!winner){ // if winner is false, you can add a symbol
      const copiarArray = rectangulos.slice();  //copy array Rectangulos
      turnoQuien ? copiarArray[i]='X' : copiarArray[i]='O'; // true = player 1 [X], false = player 2 [o]s
      setRectangulos(copiarArray); // update State Rectangulos
      console.log(copiarArray); // show array copy
      setTurnoQuien(!turnoQuien); // change turn! player 1 -> player 2  // player 2 -> player 1
    }
    }
    

      
    

    return(
      
      
    <section className="bg-slate-950 w-screen h-screen flex flex-col justify-center items-center gap-5">
      <div className="grid grid-cols-3  hover:border-purple-300">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div> 
      <div className="text-center font-bold text-purple-400 text-xl flex flex-col gap-5">
      <p>{status}</p>
      <button className="border-2 border-purple-400 px-5 py-2 hover:border-purple-300 hover:text-purple-300" onClick={resetGame}>Reset</button>
      </div>
    </section>
    
    )
    }


export default App;
