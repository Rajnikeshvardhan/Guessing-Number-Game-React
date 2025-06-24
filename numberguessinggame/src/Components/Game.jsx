import React, { useState } from 'react';

function GuessingGame() {
  const [targetNumber] = useState(() => Math.floor(Math.random() * 101));
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 0 and 100');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(guess, 10);

    if (isNaN(num) || num < 0 || num > 100) {
      setMessage('⛔ Enter a valid number between 0 and 100');
      return;
    }

    setAttempts(attempts + 1);

    if (num < targetNumber) {
      setMin(Math.max(min, num + 1));
      setMessage(`📉 Too low! Try between ${num + 1} and ${max}`);
      
    } else if (num > targetNumber) {
      setMax(Math.min(max, num - 1));
      setMessage(`📈 Too high! Try between ${min} and ${num - 1}`);
    } else {
      setMessage(`🎉 Correct! The number was ${targetNumber}. You guessed it in ${attempts + 1} attempts.`);
      setGameOver(true);
    }

    setGuess('');
  };

  const resetGame = () => window.location.reload();

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>🎯 Guessing Number Game</h2>
      <p>{message}</p>

      {!gameOver && (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="form-control mb-2"
            
            placeholder={`Try a number between ${min} and ${max}`}
            min={min}
            max={max}
            required
          />
          <button className="btn btn-primary" type="submit">Guess</button>
        </form>
      )}

      {gameOver && (
        <button className="btn btn-success mt-3" onClick={resetGame}>
          🔁 Play Again
        </button>
      )}

      <p className="mt-3">Attempts: {attempts}</p>
    </div>
  );
}

export default GuessingGame;
//comment
//com
