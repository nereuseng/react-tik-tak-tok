import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

function Board({ squares, onClick }) {
  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => onClick(i)} />
  }

  return (
    <div>
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
  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])
  const [stepNumber, setStepNumber] = useState(0)
  const current = history[stepNumber]
  const winner = calculateWinner(current.squares)
  let status

  function handleClick(i) {
    const current = history[history.length - 1] // last one
    const squares = current.squares.slice()

    if (calculateWinner(squares) || squares[i]) return

    squares[i] = xIsNext ? 'X' : 'O'

    setHistory([...history, { squares }])
    setStepNumber(history.length)
    setXIsNext(!xIsNext)
  }

  function jumpTo(step) {
    const nextXIsNext = step % 2 ? false : true
    const nextHistory = history.slice(0, step + 1)
    setHistory(nextHistory)
    setStepNumber(step)
    setXIsNext(nextXIsNext)
  }

  if (winner) {
    status = `Winnner: ${winner}`
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  const moves = history.map((step, move) => {
    const desc = move ? `Move #${move}` : `Game Start`

    return (
      <li key={move}>
        <a href="#" onClick={() => jumpTo(move)}>
          {desc}
        </a>
      </li>
    )
  })

  return (
    <div className="game">
      <div>
        <Board squares={current.squares} onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

ReactDOM.render(<Game />, document.getElementById('root'))

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
