import React from "react";

export const Start = ({ startGame }) => {
  return (
    <div className="start">
      <h1 className="startTitle">Quizzical</h1>
      <h3 className="startDescription">
        Answer some trivia questions and have fun!
      </h3>
      <button onClick={() => startGame()} className="startButton">
        Start quiz
      </button>
    </div>
  );
};
