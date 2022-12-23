import React from "react";

export const Score = ({ nextGame, correct }) => {
  return (
    <div className="score">
      <h3 className="score-result">You scored {correct}/5 correct answers</h3>
      <button onClick={() => nextGame()} className="score-button">
        Next Game
      </button>
    </div>
  );
};
