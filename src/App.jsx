import { useState, useEffect } from "react";
import "./App.css";
import { Start } from "./components/Start";
import { Test } from "./components/Test";
import { Check } from "./components/Check";
import { Score } from "./components/Score";
import { nanoid } from "nanoid";

function App() {
  const [gameStart, setGameStart] = useState(true);
  const [game, setGame] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [tests, setTests] = useState([]);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    async function getQuestions() {
      try {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=20&difficulty=medium&type=multiple"
        );
        const data = await res.json();
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = data[i];
          data[i] = data[j];
          data[j] = temp;
        }
        const results = data.results;
        const fiveTests = results.slice(0, 5);
        const fiveTestsDecoded = fiveTests.map((test) => {
          return {
            question: test.question
              .replace(/&#039;/g, "'")
              .replace(/&quot;/g, '"')
              .replace(/&pi;/g, "π")
              .replace(/ldquo;/g, "“")
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<"),
            incorrect_answers: test.incorrect_answers.map((e) => {
              return {
                answer: e
                  .replace(/&#039;/g, "'")
                  .replace(/&quot;/g, '"')
                  .replace(/&pi;/g, "π")
                  .replace(/ldquo;/g, "“")
                  .replace(/&amp;/g, "&")
                  .replace(/&lt;/g, "<"),
                id: nanoid(),
                color: "#b3c7ef",
              };
            }),
            correct_answer: test.correct_answer
              .replace(/&#039;/g, "'")
              .replace(/&quot;/g, '"')
              .replace(/&pi;/g, "π")
              .replace(/ldquo;/g, "“")
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<"),
          };
        });

        setTests(fiveTestsDecoded);
      } catch (err) {
        console.warn(err);
        alert("Error");
      }
    }
    getQuestions();
  }, []);

  const [correct, setCorrect] = useState(0);
  console.log(correct);

  const gameLayout = tests.map((test) => {
    return (
      <Test
        gameEnd={gameEnd}
        setSelected={setSelected}
        selected={selected}
        setCorrect={setCorrect}
        key={test.question}
        {...test}
      />
    );
  });

  const startGame = () => {
    setGameStart(false);
    setGame(true);
  };
  const checkAnswers = () => {
    setGame(false);
    setGameEnd(true);
  };

  const nextGame = () => {
    window.location.reload();
  };
  return (
    <div className="App">
      <img className="rightCornerPic" src="../public/blob.svg" />
      <img className="leftCornerPic" src="../public/blob1.svg" />
      <div className="backgroundPictures"></div>

      {gameStart && <Start startGame={startGame} />}
      {(game === true || gameEnd === true) && gameLayout}
      {game && <Check checkAnswers={checkAnswers} />}
      {gameEnd && <Score nextGame={nextGame} correct={correct} />}
    </div>
  );
}

export default App;
