import React, { useState } from "react";

export const Test = ({
  question,
  correct_answer,
  incorrect_answers,
  setCorrect,
  gameEnd,
}) => {
  const [randomNum, setRandomNum] = useState(Math.ceil(Math.random() * 4));
  const [disable, setDisable] = useState(false);
  const [color, setColor] = useState("#b3c7ef");

  return (
    <div>
      <div className="test">
        <h1 className="test-question">{question}</h1>
        <div className="test-AnswerContainer">
          <button
            onClick={() => {
              setCorrect((prev) => prev + 1);
              setDisable(true);
              setColor("#f5f7fb");
            }}
            disabled={disable}
            style={{
              gridColumn: randomNum,
              background: gameEnd ? "green" : color,
            }}
            className="test-answer-correct"
            name="true"
          >
            {correct_answer}
          </button>
          {incorrect_answers.map((answer) => (
            <button
              onClick={() => {
                setDisable(true);
                answer.color = "#f5f7fb";
              }}
              style={{ background: answer.color }}
              disabled={disable}
              key={answer.answer}
              name="false"
              className="test-answer-incorrect"
            >
              {answer.answer}
            </button>
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
};
