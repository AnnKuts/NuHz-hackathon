import React from "react";
import "./Interview.scss";
import { interviewQuestions } from "./interviewQuestions";

function Interview() {
  const [quiz, setQuiz] = React.useState(() =>
    [...interviewQuestions].sort(() => 0.5 - Math.random()).slice(0, 5)
  );

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  const handleAnswer = (optionIndex: number) => {
    const currentQuestion = quiz[currentIndex];
    if (optionIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex < quiz.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuiz([...interviewQuestions].sort(() => 0.5 - Math.random()).slice(0, 5));
    setScore(0);
    setCurrentIndex(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div id="interview-simulator">
        <div className="quiz-container">
          <h2>Quiz Finished!</h2>
          <p className="score">
            Your score: {score} / {quiz.length}
          </p>
          <button onClick={restartQuiz}>Try Again</button>
        </div>
      </div>
    );
  }

  const question = quiz[currentIndex];

  return (
    <div id="interview-simulator">
      <div className="quiz-container">
        <p>Question {currentIndex + 1} of {quiz.length}</p>
        <strong>{question.question}</strong>
        <ul>
          {question.options.map((option, i) => (
            <li key={i}>
              <button onClick={() => handleAnswer(i)}>{option}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Interview;
