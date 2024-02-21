// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

// function useLocalStorageState(key, initalValue) {
//     const storedValue = window.localStorage.getItem(key);
//     const [value, setValue] = React.useState(storedValue?JSON.parse(storedValue): initalValue);
//     React.useEffect(()=>{
//       window.localStorage.setItem(key, JSON.stringify(value));
//     }, [key, value]);
//     return [value, setValue];
// }

import { useLocalStorageState } from '../utils';


function Board({squares, onClick}) {
  // 🐨 squares is the state for this component. Add useState for squares

  // 🐨 We'll need the following bits of derived state:
  // - nextValue ('X' or 'O')
  // - winner ('X', 'O', or null)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables
  console.log(squares)
  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
 

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}      
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [histories, setHistories] =useLocalStorageState('histories',[Array(9).fill(null)]);
  const [current, setCurrent] = useLocalStorageState('current',0);
  const squares = histories[current];
  console.log(histories[current])

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner,squares,nextValue);

  function selectSquare(square) {
    // 🐨 first, if there's already a winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    //
    const squares = histories[current];
    if(winner!=null || squares[square]!=null) return;
    // 🦉 It's typically a bad idea to mutate or directly change state in React.
    // Doing so can lead to subtle bugs that can easily slip into production.
    //
    // 🐨 make a copy of the squares array
    // 💰 `[...squares]` will do it!)
    //
    const copySquares = [...squares];
    // 🐨 set the value of the square that was selected
    // 💰 `squaresCopy[square] = nextValue`
    //
    copySquares[square] = nextValue;
    // 🐨 set the squares to your copy
    const tempHist = histories.slice(0,current+1)
    setHistories([...tempHist, copySquares]);
    // setCurrent(current+1);
    setCurrent(tempHist.length);


    // setNextValue(calculateNextValue(squares));
    // const winnerCheck = calculateWinner(squares);
    // if(winnerCheck!=null) setWinner(winnerCheck);
    // setStatus(calculateStatus(winner,squares,nextValue));
  }

   

  function restart() {
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
    setHistories([Array(9).fill(null)]);
    setCurrent(0);
  }
  const moves = histories.map((history, step) => <li key={step}><button disabled={current==step} onClick={()=>{
    setCurrent(step);
    }}>Go to {step===0?'game start':`#${step}`} {current==step?'(current)':''}</button></li>)

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={histories[current]} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
