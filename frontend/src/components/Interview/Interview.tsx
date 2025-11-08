import React from "react";
import "./Interview.scss";
import { interviewQuestions } from "../../utils/interviewQuestions";
import { fetchQuestions, estimateAnswers } from "../../api/api";
import { saveInterviewResult } from "../../utils/interviewStorage";

const maxTimeLimit = 60;
const warningTimeThreshold = 60;
const defaultTimeLimit = 5;
const defaultQuestionCount = 5;

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const createRandomQuiz = (questionCount: number) => {
  return [...interviewQuestions]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(questionCount, interviewQuestions.length));
};

const validateSettings = (
  specialization: string,
  timeLimit: number,
  questionCount: number
): boolean => {
  return (
    !!specialization &&
    timeLimit > 0 &&
    timeLimit <= maxTimeLimit &&
    questionCount > 0 &&
    questionCount <= interviewQuestions.length
  );
};

interface Question {
  question: string;
  options: string[];
  correct?: number;
}

interface UserAnswer {
  question: string;
  answer: string;
}

function Interview() {
  const [settings, setSettings] = React.useState({
    specialization: "",
    timeLimit: defaultTimeLimit,
    questionCount: defaultQuestionCount,
  });
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [quiz, setQuiz] = React.useState<Question[]>(() => createRandomQuiz(defaultQuestionCount));
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [finished, setFinished] = React.useState(false);
  const [remainingTime, setRemainingTime] = React.useState(0);
  const [timeUsed, setTimeUsed] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<UserAnswer[]>([]);
  const [estimate, setEstimate] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!quizStarted || finished) return;

    const timeLimitSeconds = settings.timeLimit * 60;
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          setFinished(true);
          setTimeUsed(timeLimitSeconds);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quizStarted, finished, settings.timeLimit]);

  const handleStartQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSettings(settings.specialization, settings.timeLimit, settings.questionCount)) {
      return;
    }

    setLoading(true);
    setUserAnswers([]);
    setEstimate(null);

    try {
      const apiQuestions = await fetchQuestions(settings.specialization, settings.questionCount);
      if (apiQuestions && Array.isArray(apiQuestions) && apiQuestions.length > 0) {
        setQuiz(apiQuestions);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.warn("Failed to fetch questions from API, using default questions:", error);
      setQuiz(createRandomQuiz(settings.questionCount));
    } finally {
      setLoading(false);
      setRemainingTime(settings.timeLimit * 60);
      setQuizStarted(true);
    }
  };

  const handleAnswer = async (optionIndex: number) => {
    const currentQuestion = quiz[currentIndex];
    const selectedAnswer = currentQuestion.options[optionIndex];
    
    const newAnswer: UserAnswer = {
      question: currentQuestion.question,
      answer: selectedAnswer,
    };
    
    setUserAnswers((prev) => [...prev, newAnswer]);

    if (optionIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex < quiz.length - 1) {
      setUserAnswers((prev) => [...prev, newAnswer]);
      setCurrentIndex((prev) => prev + 1);
    } else {
      const allAnswers = [...userAnswers, newAnswer];
      setUserAnswers(allAnswers);
      
      const timeLimitSeconds = settings.timeLimit * 60;
      const finalTimeUsed = timeLimitSeconds - remainingTime;
      setTimeUsed(finalTimeUsed);
      setFinished(true);

      let finalEstimate = null;
      try {
        const apiEstimate = await estimateAnswers(allAnswers);
        if (apiEstimate && apiEstimate.estimate) {
          finalEstimate = apiEstimate.estimate;
          setEstimate(finalEstimate);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (error) {
        console.warn("Failed to get estimate from API, using score:", error);
        setEstimate(null);
      }

      // Сохраняем результат интервью
      saveInterviewResult({
        score,
        totalQuestions: quiz.length,
        timeUsed: finalTimeUsed,
        estimate: finalEstimate,
        specialization: settings.specialization,
        summary: `${score}/${quiz.length} correct answers`
      });
    }
  };

  const restartQuiz = () => {
    setQuiz(createRandomQuiz(settings.questionCount));
    setScore(0);
    setCurrentIndex(0);
    setFinished(false);
    setQuizStarted(false);
    setRemainingTime(0);
    setTimeUsed(0);
    setUserAnswers([]);
    setEstimate(null);
  };

  const handleNumericInput = (
    value: string,
    max: number,
    setter: (val: number) => void
  ) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= max)) {
      setter(numericValue === '' ? 0 : parseInt(numericValue));
    }
  };

  const renderSettingsForm = () => (
    <div id="interview-simulator">
      <div className="quiz-container">
        <h2>Configure interview</h2>
        <form onSubmit={handleStartQuiz} className="settings-form">
          <div className="form-group">
            <label htmlFor="specialization">Your field</label>
            <input
              id="specialization"
              type="text"
              value={settings.specialization}
              onChange={(e) =>
                setSettings({ ...settings, specialization: e.target.value })
              }
              placeholder="Enter your field"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="timeLimit">Time for interview</label>
            <input
              id="timeLimit"
              type="text"
              value={settings.timeLimit > 0 ? String(settings.timeLimit) : ''}
              onChange={(e) =>
                handleNumericInput(e.target.value, maxTimeLimit, (val) =>
                  setSettings({ ...settings, timeLimit: val })
                )
              }
              placeholder="Enter time in minutes for timer"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="questionCount">Quantity of questions</label>
            <input
              id="questionCount"
              type="text"
              value={settings.questionCount > 0 ? String(settings.questionCount) : ''}
              onChange={(e) =>
                handleNumericInput(e.target.value, interviewQuestions.length, (val) =>
                  setSettings({ ...settings, questionCount: val })
                )
              }
              placeholder="Enter quantity of questions"
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Start interview"}
          </button>
        </form>
      </div>
    </div>
  );

  const renderFinishedScreen = () => (
    <div id="interview-simulator">
      <div className="quiz-container">
        <h2>Quiz Finished!</h2>
        {estimate ? (
          <div>
            <p className="score">Estimate: {estimate}</p>
            <p className="score">
              Your score: {score} / {quiz.length}
            </p>
          </div>
        ) : (
          <p className="score">
            Your score: {score} / {quiz.length}
          </p>
        )}
        <p className="score">Time: {formatTime(timeUsed)}</p>
        <button onClick={restartQuiz}>Try Again</button>
      </div>
    </div>
  );

  const renderQuizScreen = () => {
    const question = quiz[currentIndex];
    const isTimeLow = remainingTime <= warningTimeThreshold;

    return (
      <div id="interview-simulator">
        <div className="quiz-container">
          <div className="timer-header">
            <p>Question {currentIndex + 1} of {quiz.length}</p>
            <p className={`timer-display ${isTimeLow ? 'timer-warning' : ''}`}>
              {formatTime(remainingTime)}
            </p>
          </div>
          <strong>{question.question}</strong>
          <ul>
            {question.options.map((option: string, i: number) => (
              <li key={i}>
                <button onClick={() => handleAnswer(i)}>{option}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  if (!quizStarted) {
    return renderSettingsForm();
  }

  if (finished) {
    return renderFinishedScreen();
  }

  return renderQuizScreen();
}

export default Interview;