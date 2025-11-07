import React from "react";
import "./Interview.scss";

 function Interview() {
  const allQuestions = [
    {
      question: "What is the event loop in Node.js?",
      options: [
        "A mechanism that handles asynchronous operations",
        "A loop that repeats console logs",
        "A type of middleware",
        "A built-in debugging tool"
      ],
      correct: 0
    },
    {
      question: "How do you handle asynchronous code in Node?",
      options: [
        "Using callbacks, promises, or async/await",
        "Using only for loops",
        "By blocking the event loop",
        "By disabling async operations"
      ],
      correct: 0
    },
    {
      question: "What is middleware in Express?",
      options: [
        "A function that handles requests before they reach the route handler",
        "A database connection function",
        "A background service",
        "An HTML renderer"
      ],
      correct: 0
    },
    {
      question: "How can you manage environment variables securely?",
      options: [
        "Using .env files and process.env",
        "Hardcoding values in the code",
        "Storing them in localStorage",
        "Committing them to GitHub"
      ],
      correct: 0
    },
    {
      question: "Explain the difference between CommonJS and ES modules.",
      options: [
        "CommonJS uses require(), ES modules use import/export",
        "They are completely identical",
        "ES modules can only run in Node.js",
        "CommonJS is newer than ES modules"
      ],
      correct: 0
    },
    {
      question: "What is the purpose of package.json?",
      options: [
        "It defines project metadata and dependencies",
        "It stores API keys",
        "It controls the Node event loop",
        "It handles middleware"
      ],
      correct: 0
    },
    {
      question: "What command initializes a new Node.js project?",
      options: [
        "`npm init`",
        "`node start`",
        "`npm install`",
        "`npm run`"
      ],
      correct: 0
    },
    {
      question: "What does process.env do in Node.js?",
      options: [
        "Accesses environment variables",
        "Starts a child process",
        "Creates a new thread",
        "Runs a middleware function"
      ],
      correct: 0
    }
  ];

  const [quiz, setQuiz] = React.useState(() =>
    [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 5)
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
    setQuiz([...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 5));
    setScore(0);
    setCurrentIndex(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div id="interview-simulator">
        <h2>Quiz Finished!</h2>
        <p>Your score: {score} / {quiz.length}</p>
        <button onClick={restartQuiz}>Try Again</button>
      </div>
    );
  }

  const question = quiz[currentIndex];

  return (
    <div id="interview-simulator">
      <h2>Interview Simulator</h2>
      <p>Question {currentIndex + 1} of {quiz.length}</p>
      <strong>{question.question}</strong>
      <ul>
        {question.options.map((option, i) => (
          <li key={i}>
            <button onClick={() => handleAnswer(i)}>
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Interview;