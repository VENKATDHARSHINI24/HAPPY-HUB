import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "What is 12 × 3?",
    options: ["36", "30", "26", "32"],
    answer: "36",
    explanation: "12 × 3 = 36. It's basic multiplication.",
  },
  {
    question: "Identify the grammatically correct sentence.",
    options: [
      "She don’t like apples.",
      "She doesn't likes apples.",
      "She doesn't like apples.",
      "She not like apples.",
    ],
    answer: "She doesn't like apples.",
    explanation: "With 'doesn't', the verb stays in base form: 'like'.",
  },
  {
    question: "Which number is divisible by 4?",
    options: ["13", "16", "23", "35"],
    answer: "16",
    explanation: "16 ÷ 4 = 4, so it's divisible by 4.",
  },
  {
    question: "Choose the correct spelling:",
    options: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"],
    answer: "Accommodate",
    explanation: "'Accommodate' is the correct spelling with double 'c' and 'm'.",
  },
  {
    question: "Find the odd one out:",
    options: ["Dog", "Cat", "Lion", "Car"],
    answer: "Car",
    explanation: "All others are animals; Car is not.",
  },
  {
    question: "Which sentence is correct?",
    options: [
      "He go to school daily.",
      "He going to school daily.",
      "He goes to school daily.",
      "He gone to school daily.",
    ],
    answer: "He goes to school daily.",
    explanation: "Subject 'he' needs verb 'goes' in present simple tense.",
  },
  {
    question: "What is the next number in the series: 2, 4, 8, 16, ?",
    options: ["20", "24", "32", "18"],
    answer: "32",
    explanation: "Each number is doubled. 16 × 2 = 32.",
  },
  {
    question: "Which of the following is a noun?",
    options: ["Quickly", "Run", "Happiness", "Beautiful"],
    answer: "Happiness",
    explanation: "'Happiness' is a thing, so it's a noun. Others are verbs/adjectives/adverbs.",
  },
  {
    question: "Choose the correctly punctuated sentence:",
    options: [
      "Wow that was amazing!",
      "Wow, that was amazing!",
      "Wow that, was amazing!",
      "Wow that was, amazing!",
    ],
    answer: "Wow, that was amazing!",
    explanation: "We use a comma after 'Wow' for correct interjection punctuation.",
  },
  {
    question: "Which figure is different: 🔺, 🔻, 🔺, 🔺?",
    options: ["🔺", "🔻"],
    answer: "🔻",
    explanation: "All others are upward-pointing triangles (🔺), except 🔻.",
  },
];

const QuickQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const goToNext = () => {
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setSelected("");
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected("");
    setShowExplanation(false);
    setShowResult(false);
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>🎯 Quick Quiz</h1>

      {!showResult ? (
        <div>
          <h3>
            Q{current + 1}: {questions[current].question}
          </h3>
          {questions[current].options.map((option, i) => (
            <button
              key={i}
              style={{
                padding: "10px 20px",
                margin: "10px",
                background:
                  selected === option
                    ? option === questions[current].answer
                      ? "#90EE90"
                      : "#ffcccb"
                    : "#87CEEB",
                border: "none",
                borderRadius: "8px",
                cursor: selected ? "not-allowed" : "pointer",
              }}
              onClick={() => handleAnswer(option)}
              disabled={!!selected}
            >
              {option}
            </button>
          ))}

          {showExplanation && (
            <div
              style={{
                marginTop: "20px",
                background: "#f9f9f9",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <h4>✅ Correct Answer: {questions[current].answer}</h4>
              <p>📘 Explanation: {questions[current].explanation}</p>
              <button
                onClick={goToNext}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ➡️ Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>🎉 Quiz Complete!</h2>
          <h3>
            Your Score: {score} / {questions.length}
          </h3>
          <button onClick={restartQuiz}>🔁 Retry</button>
          <button onClick={() => navigate("/dashboard")} style={{ marginLeft: "10px" }}>
            🔙 Back
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickQuiz;
