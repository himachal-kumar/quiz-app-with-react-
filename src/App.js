import React, { useState, useEffect } from 'react';
import './App.css';

const QuizApp = () => {
  const quiz = [
    {
      question: "Q. Which of the following is not a CSS box model property?",
      choices: ["margin", "padding", "border-radius", "border-collapse"],
      answer: "border-collapse",
    },
    {
      question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
      choices: [
        "function myFunction() {}",
        "let myFunction = function() {};",
        "myFunction: function() {}",
        "const myFunction = () => {};",
      ],
      answer: "myFunction: function() {}",
    },
    {
      question: "Q. What is the default HTTP method used by forms in HTML?",
      choices: ["GET", "POST", "PUT", "DELETE"],
      answer: "GET",
    },
    {
      question: "Q. Which of the following is used to style HTML in web development?",
      choices: ["CSS", "PHP", "Node.js", "MySQL"],
      answer: "CSS",
    },
    {
      question: "Q. Which of the following is not a JavaScript data type?",
      choices: ["String", "Number", "Boolean", "Float"],
      answer: "Float",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  
  useEffect(() => {
    if (quizStarted && !quizOver && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizOver) {
      
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false); 
        handleNextClick();
      }, 2000);
    }
  }, [timeLeft, quizOver, quizStarted]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(15);
    setQuizOver(false);
    setSelectedChoice(null);
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage('');
    }, 2000);
  };

  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
  };

  const checkAnswer = () => {
    if (selectedChoice === quiz[currentQuestionIndex].answer) {
      showAlert('Correct Answer!');
      setScore(score + 1);
    } else {
      showAlert(`Wrong Answer! Correct Answer: ${quiz[currentQuestionIndex].answer}`);
    }

    if (currentQuestionIndex < quiz.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(15); 
      }, 500);
    } else {
      setQuizOver(true);
    }
  };

  const handleNextClick = () => {
    if (!selectedChoice && timeLeft > 0) {
      showAlert('Select an answer!');
      return;
    }

    if (quizOver) {
      startQuiz(); 
    } else {
      checkAnswer(); 
    }

    setSelectedChoice(null); 
  };

  return (
    <div className="quiz-app">
      {alertMessage && <div className="alert">{alertMessage}</div>}

      {!quizStarted && (
        <div className="btn startBtn" onClick={startQuiz}>
          Start Quiz
        </div>
      )}

      {quizStarted && (
        <div className="container">
          <h1>Let's play a Quiz Game</h1>

          <div className="question">{quiz[currentQuestionIndex].question}</div>

          <div className="choices">
            {quiz[currentQuestionIndex].choices.map((choice, index) => (
              <div
                key={index}
                className={`choice ${selectedChoice === choice ? 'selected' : ''}`}
                onClick={() => handleChoiceClick(choice)}
              >
                {choice}
              </div>
            ))}
          </div>

          <button className="btn nextBtn" onClick={handleNextClick}>
            {quizOver ? 'Play Again' : 'Next'}
          </button>

          <div className="scoreCard">
            {quizOver && <div>You Scored {score} out of {quiz.length}!</div>}
          </div>

          <div className="timer">{timeLeft}</div>

          {/* Modal for Time's Up Notification */}
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Time's up!</h2>
                <p>Moving to the next question...</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizApp;
