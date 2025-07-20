import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Grammar questions with error identification and correction
const grammarQuestions = [
  {
    question: "Identify the error: 'She don't like ice cream.'",
    correctAnswer: "don't → doesn't",
    explanation: "'She' is third-person singular, so it should be 'doesn't'.",
  },
  {
    question: "Identify the error: 'He go to the park every day.'",
    correctAnswer: "go → goes",
    explanation: "'He' is third-person singular, so the verb should be 'goes'.",
  },
  {
    question: "Identify the error: 'I can plays the guitar.'",
    correctAnswer: "plays → play",
    explanation: "The modal verb 'can' is followed by the base form of the verb, so it should be 'play'.",
  },
  {
    question: "Identify the error: 'They is going to the cinema.'",
    correctAnswer: "is → are",
    explanation: "'They' is plural, so the correct form of the verb is 'are'.",
  },
  {
    question: "Identify the error: 'She was more taller than her brother.'",
    correctAnswer: "more taller → taller",
    explanation: "In comparative forms, 'more' is unnecessary when the adjective ends in '-er'.",
  },
  {
    question: "Identify the error: 'We doesn't like that movie.'",
    correctAnswer: "doesn't → don't",
    explanation: "'We' is plural, so the verb should be 'don't', not 'doesn't'.",
  },
  {
    question: "Identify the error: 'I have been to Paris last year.'",
    correctAnswer: "have been → went",
    explanation: "Use the past simple tense 'went' for a specific past event like 'last year'.",
  },
  {
    question: "Identify the error: 'The childrens are playing outside.'",
    correctAnswer: "childrens → children",
    explanation: "'Children' is the plural form, so no 's' is needed.",
  },
  {
    question: "Identify the error: 'He don't understand the question.'",
    correctAnswer: "don't → doesn't",
    explanation: "'He' is third-person singular, so it should be 'doesn't'.",
  },
];

// Shuffle function to randomize questions
const shuffleQuestions = (questions) => {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
};

const GrammarHunt = () => {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [badge, setBadge] = useState("");
  const [questions, setQuestions] = useState(shuffleQuestions([...grammarQuestions])); // Shuffle the questions
  const navigate = useNavigate();

  const checkAnswer = () => {
    const correct = questions[current].correctAnswer.toLowerCase();
    const trimmed = answer.trim().toLowerCase();

    if (trimmed === correct) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong. Correct: ${questions[current].correctAnswer}`);
    }

    setShowExplanation(true); // Show explanation after answer submission
  };

  const handleNext = () => {
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setAnswer("");
      setFeedback("");
      setShowExplanation(false); // Hide explanation when moving to the next question
    } else {
      setShowResult(true);
      const finalScore = score;
      if (finalScore === questions.length) {
        setBadge("🏆 Grammar Guru");
      } else if (finalScore >= 7) {
        setBadge("🥈 Grammar Pro");
      } else {
        setBadge("🥉 Grammar Explorer");
      }
    }
  };

  const restartQuiz = () => {
    setQuestions(shuffleQuestions([...grammarQuestions])); // Shuffle again for new random order
    setCurrent(0);
    setScore(0);
    setAnswer("");
    setFeedback("");
    setShowExplanation(false);
    setShowResult(false);
    setBadge("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✍️ Grammar Hunt</h1>

      {!showResult ? (
        <div style={styles.quizBox}>
          <h2>
            Q{current + 1}: {questions[current].question}
          </h2>
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your Answer"
            style={styles.input}
            disabled={showExplanation} // Disable input after submission
          />
          <br />
          {!showExplanation ? (
            <button onClick={checkAnswer} style={styles.button} disabled={!answer.trim()}>
              Submit
            </button>
          ) : (
            <>
              <p style={styles.feedback}>{feedback}</p>
              <p style={styles.explanation}>
                💡 Explanation: {questions[current].explanation}
              </p>
              <button onClick={handleNext} style={styles.nextButton}>
                ➡️ Next
              </button>
            </>
          )}
        </div>
      ) : (
        <div style={styles.resultBox}>
          <h2>✅ Your Score: {score} / {questions.length}</h2>
          <h3>{badge}</h3>
          <button onClick={restartQuiz} style={styles.button}>🔁 Retry</button>
          <button onClick={() => navigate("/dashboard")} style={styles.button}>🔙 Back</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Segoe UI, sans-serif",
    textAlign: "center",
    padding: "30px",
    background: "#f9f9f9",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  quizBox: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "inline-block",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "250px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    fontSize: "16px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    margin: "10px",
  },
  nextButton: {
    padding: "10px 20px",
    fontSize: "16px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "15px",
  },
  feedback: {
    fontSize: "16px",
    color: "#e53935",
    marginTop: "10px",
  },
  explanation: {
    fontSize: "15px",
    marginTop: "10px",
    color: "#333",
  },
  resultBox: {
    background: "#e0f7fa",
    padding: "25px",
    borderRadius: "15px",
    display: "inline-block",
  },
};

export default GrammarHunt;
