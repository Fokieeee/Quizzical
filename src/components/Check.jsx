import React from "react";

export const Check = ({ checkAnswers }) => {
  return (
    <div className="check">
      <button onClick={() => checkAnswers()} className="check-button">
        Check Answers
      </button>
    </div>
  );
};
