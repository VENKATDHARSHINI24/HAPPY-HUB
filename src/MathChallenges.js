import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MathChallenges = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [level, setLevel] = useState(1);
  const [badge, setBadge] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const navigate = useNavigate();

  // ✅ Move generateQuestion outside useEffect dependency warning
  const generateQuestion = (level) => {
    const num1 = Math.floor(Math.random() * (level * 10));
    const num2 = Math.floor(Math.random() * (level * 10)) || 1;
    const operator = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];

    let correctAnswer;
    switch (operator) {
      case "+": correctAnswer = num1 + num2; break;
      case "-": correctAnswer = num1 - num2; break;
      case "*": correctAnswer = num1 * num2; break;
      case "/": correctAnswer = parseFloat((num1 / num2).toFixed(2)); break;
      default: break;
    }

    return {
      question: `${num1} ${operator} ${num2}`,
      correctAnswer: correctAnswer.toString(),
      explanation: `${num1} ${operator} ${num2} = ${correctAnswer}`,
    };
  };

  useEffect(() => {
    const newQuestions = [];
    for (let i = 0; i < 5; i++) {
      newQuestions.push(generateQuestion(level));
    }
    setQuestions(newQuestions);
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setFeedback("");
    setShowFeedback(false);
    setAnswer("");
    setIsAnswerCorrect(false);
  }, [level]);

  const checkAnswer = () => {
    const correct = questions[current].correctAnswer;
    const trimmed = answer.trim();

    const isCorrect = trimmed === correct;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore(score + 1);
      setFeedback("✅ Correct Answer!");
    } else {
      setFeedback(`❌ Incorrect. Correct answer: ${correct}`);
    }

    setShowFeedback(true);
  };

  const goToNext = () => {
    const isLast = current === questions.length - 1;

    if (isLast) {
      setShowResult(true);
      const finalScore = score + (isAnswerCorrect ? 0 : 0); // score already updated if correct
      if (finalScore === 5) setBadge("🏆 Gold Badge");
      else if (finalScore >= 3) setBadge("🥈 Silver Badge");
      else setBadge("🥉 Bronze Badge");
    } else {
      setCurrent(current + 1);
      setAnswer("");
      setShowFeedback(false);
      setFeedback("");
      setIsAnswerCorrect(false);
    }
  };

  const handleNextLevel = () => setLevel(level + 1);
  const handleBack = () => navigate("/dashboard");

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>🧠 Math Challenge - Level {level}</h1>
      <div style={styles.grid}>
        {!showResult ? (
          <div style={styles.card}>
            <h2 style={styles.question}>Q{current + 1}: {questions[current]?.question}</h2>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer"
              style={styles.input}
              disabled={showFeedback}
            />
            {!showFeedback ? (
              <button
                onClick={checkAnswer}
                style={styles.button}
                disabled={answer.trim() === ""}
              >
                🚀 Submit
              </button>
            ) : (
              <>
                <p style={styles.feedback}>{feedback}</p>
                <p style={styles.explanation}>
                  📘 Explanation: {questions[current]?.explanation}
                </p>
                <button onClick={goToNext} style={styles.nextBtn}>
                  ➡️ Next
                </button>
              </>
            )}
          </div>
        ) : (
          <div style={styles.result}>
            <h2>🎉 Well Done!</h2>
            <p>Score: {score} / 5</p>
            <p>Badge: {badge}</p>
            <button onClick={handleNextLevel} style={styles.button}>➕ Next Level</button>
            <button onClick={handleBack} style={{ ...styles.button, background: "#777" }}>🔙 Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Comic Sans MS, cursive, sans-serif",
    background: "linear-gradient(to bottom, #f0f8ff, #d6eaf8)",
    minHeight: "100vh",
    padding: "30px",
    textAlign: "center",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#2c3e50",
  },
  grid: {
    display: "grid",
    placeItems: "center",
  },
  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "20px",
    width: "300px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
  },
  question: {
    marginBottom: "15px",
    fontSize: "20px",
    color: "#2e4053",
  },
  input: {
    width: "80%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  nextBtn: {
    padding: "10px 20px",
    background: "#e67e22",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  feedback: {
    fontSize: "16px",
    marginTop: "10px",
    color: "#2c3e50",
    fontWeight: "bold",
  },
  explanation: {
    fontSize: "14px",
    marginTop: "5px",
    color: "#34495e",
  },
  result: {
    background: "#f0fff0",
    padding: "30px",
    borderRadius: "20px",
    width: "300px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
  },
};

export default MathChallenges;
