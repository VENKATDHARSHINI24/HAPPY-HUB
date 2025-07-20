import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const aptitudeQuestions = [
  {
    question: "Find the next number: 2, 6, 12, 20, ?",
    correctAnswer: "30",
    explanation: "Pattern: n² + n → 1²+1=2, 2²+2=6, 3²+3=12, 4²+4=20, 5²+5=30",
  },
  {
    question: "A train 150m long is running at 54km/hr. How long to cross a pole?",
    correctAnswer: "10",
    explanation: "Speed = 54 km/h = 15 m/s, Time = Distance / Speed = 150 / 15 = 10 sec",
  },
  {
    question: "If A can do a job in 8 days and B in 12, how long will both take together?",
    correctAnswer: "4.8",
    explanation: "Work together = 1/8 + 1/12 = 5/24 ⇒ 24/5 = 4.8 days",
  },
  {
    question: "Which number doesn't belong: 1, 4, 9, 16, 20, 36?",
    correctAnswer: "20",
    explanation: "All others are perfect squares",
  },
  {
    question: "What comes next: 3, 7, 15, 31, ?",
    correctAnswer: "63",
    explanation: "Each term: ×2 + 1 → 3×2+1=7, 7×2+1=15...",
  },
  {
    question: "If 3 pens cost ₹45, how much for 7 pens?",
    correctAnswer: "105",
    explanation: "Cost per pen = 45/3 = 15, then 15×7 = ₹105",
  },
  {
    question: "The average of 10, 20, 30, 40, 50 is?",
    correctAnswer: "30",
    explanation: "(10+20+30+40+50)/5 = 150/5 = 30",
  },
  {
    question: "Speed of car is 60 km/h. Time to travel 90 km?",
    correctAnswer: "1.5",
    explanation: "Time = Distance / Speed = 90 / 60 = 1.5 hr",
  },
  {
    question: "Simplify: (3 + 2)²",
    correctAnswer: "25",
    explanation: "(3+2)² = 5² = 25",
  },
  {
    question: "What is 10% of 250?",
    correctAnswer: "25",
    explanation: "10% of 250 = (10/100) × 250 = 25",
  },
];

const AptitudeSolver = () => {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [badge, setBadge] = useState("");
  const navigate = useNavigate();

  const checkAnswer = () => {
    const correct = aptitudeQuestions[current].correctAnswer;
    const trimmed = answer.trim();

    if (trimmed === correct) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong. Correct: ${correct}`);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    const next = current + 1;
    if (next < aptitudeQuestions.length) {
      setCurrent(next);
      setAnswer("");
      setFeedback("");
      setShowExplanation(false);
    } else {
      setShowResult(true);
      const finalScore = score;
      if (finalScore === aptitudeQuestions.length) {
        setBadge("🏆 Aptitude Master");
      } else if (finalScore >= 7) {
        setBadge("🥈 Aptitude Achiever");
      } else {
        setBadge("🥉 Aptitude Explorer");
      }
    }
  };

  const restartQuiz = () => {
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
      <h1 style={styles.title}>🧠 Aptitude Solver</h1>

      {!showResult ? (
        <div style={styles.quizBox}>
          <h2>
            Q{current + 1}: {aptitudeQuestions[current].question}
          </h2>
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your Answer"
            style={styles.input}
            disabled={showExplanation}
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
                💡 Explanation: {aptitudeQuestions[current].explanation}
              </p>
              <button onClick={handleNext} style={styles.nextButton}>
                ➡️ Next
              </button>
            </>
          )}
        </div>
      ) : (
        <div style={styles.resultBox}>
          <h2>✅ Your Score: {score} / {aptitudeQuestions.length}</h2>
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
    background: "#fff9f0",
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
    width: "200px",
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

export default AptitudeSolver;
