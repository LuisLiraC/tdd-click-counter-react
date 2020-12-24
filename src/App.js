import React, { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [error, setError] = useState(false)

  const handleIncrement = () => {
    if (error) setError(false)
    setCount(count + 1)
  }

  const handleDecrement = () => {
    count > 0 ? setCount(count - 1) : setError(true)
  }

  return (
    <div data-test='component-app'>
      <h1 data-test='counter-display'>
        The counter is currently&nbsp;
        <span data-test='count'>{count}</span>
      </h1>
      <button data-test='increment-button' onClick={handleIncrement}>
        Increment counter
      </button>
      <button data-test='decrement-button' onClick={handleDecrement}>
        Decrement counter
      </button>
      <div data-test='error-message' className={error ? 'error' : 'hidden'}>
        <p>Error cannot goes below zero</p>
      </div>
    </div>
  )
}

export default App
