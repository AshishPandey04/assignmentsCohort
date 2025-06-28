import React, { useState } from 'react';
import { quizData } from './data';

function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption === quizData[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(''); // Reset radio selection
    } else {
      setShowScore(true);
    }
  };

  const reloadQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption('');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            You scored {score} out of {quizData.length}
          </h2>
          <button
            className="text-lg bg-amber-400 rounded-2xl px-6 py-2"
            onClick={reloadQuiz}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-bold mb-4">
            {quizData[currentQuestion].question}
          </h3>
          <div className="flex flex-col gap-3 mb-4">
            {['a', 'b', 'c', 'd'].map((option) => (
              <label key={option} className="cursor-pointer">
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                {quizData[currentQuestion][option]}
              </label>
            ))}
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!selectedOption}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizApp;
