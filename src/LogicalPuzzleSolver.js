import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const logicalPuzzleQuestions = [
  {
    question: "A man is looking at a photo of someone. His friend asks: 'Who is it?' He replies: 'Brothers and sisters, I have none. But that man's father is my father's son.' Who is in the photo?",
    correctAnswer: "His son",
    explanation: "‘My father’s son’ is himself, so the man in the photo is his son.",
  },
  {
    question: "You see a boat filled with people. It has not sunk, but when you look again, you don’t see a single person. Why?",
    correctAnswer: "All were married",
    explanation: "‘Single person’ refers to marital status. All were married.",
  },
  {
    question: "In a family of six members A, B, C, D, E and F, there are two married couples. A is a doctor and father of E. F is the grandmother of E. B is the wife of A. D is the brother of E. Who is C?",
    correctAnswer: "D’s sister",
    explanation: "Family breakdown shows C must be E’s sister, hence D’s sister.",
  },
  {
    question: "If 2 pencils cost 8 cents, then how much do 5 pencils cost?",
    correctAnswer: "20",
    explanation: "Cost per pencil = 4 cents. So, 5 pencils = 5×4 = 20 cents.",
  },
  {
    question: "A clock shows 3:15. What is the angle between the hour and minute hand?",
    correctAnswer: "7.5",
    explanation: "Minute hand at 90°, hour hand at 97.5° ⇒ difference = 7.5°.",
  },
  {
    question: "In a race of 100 meters, A beats B by 10 meters and B beats C by 10 meters. By how many meters does A beat C?",
    correctAnswer: "19",
    explanation: "When A finishes, B is at 90m; C is at 81m ⇒ A beats C by 19m.",
  },
  {
    question: "You have 3 switches outside a room. Only one switch turns on a bulb inside. You can enter the room only once. How do you find the correct switch?",
    correctAnswer: "Turn on 1, wait, turn off, turn on 2, check bulb heat",
    explanation: "Turn on one, wait, turn off. Turn on another. Enter and check which bulb is on or warm.",
  },
  {
    question: "Two girls were born to the same mother, on the same day, at the same time, in the same year, yet they are not twins. How?",
    correctAnswer: "They are triplets",
    explanation: "They’re part of triplets (or more), so not *only* twins.",
  },
  {
    question: "A farmer has 17 sheep. All but 9 run away. How many are left?",
    correctAnswer: "9",
    explanation: "‘All but 9’ means 9 stayed; the rest ran away.",
  },
  {
    question: "What comes next in the series: 1, 11, 21, 1211, 111221, ?",
    correctAnswer: "312211",
    explanation: "Look-and-say pattern: describes the previous number (e.g., 111221 means ‘three 1s, two 2s, one 1’ = 312211).",
  },
];

const LogicalPuzzleSolver = () => {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [badge, setBadge] = useState("");
  const navigate = useNavigate();

  const checkAnswer = () => {
    const correct = logicalPuzzleQuestions[current].correctAnswer.toLowerCase();
    const trimmed = answer.trim().toLowerCase();

    if (trimmed === correct) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong. Correct: ${logicalPuzzleQuestions[current].correctAnswer}`);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    const next = current + 1;
    if (next < logicalPuzzleQuestions.length) {
      setCurrent(next);
      setAnswer("");
      setFeedback("");
      setShowExplanation(false);
    } else {
      setShowResult(true);
      const finalScore = score;
      if (finalScore === logicalPuzzleQuestions.length) {
        setBadge("🏆 Logic Mastermind");
      } else if (finalScore >= 7) {
        setBadge("🥈 Logical Thinker");
      } else {
        setBadge("🥉 Puzzle Explorer");
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
      <h1 style={styles.title}>🧩 Logical Puzzle Solver</h1>

      {!showResult ? (
        <div style={styles.quizBox}>
          <h2>
            Q{current + 1}: {logicalPuzzleQuestions[current].question}
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
                💡 Explanation: {logicalPuzzleQuestions[current].explanation}
              </p>
              <button onClick={handleNext} style={styles.nextButton}>
                ➡️ Next
              </button>
            </>
          )}
        </div>
      ) : (
        <div style={styles.resultBox}>
          <h2>✅ Your Score: {score} / {logicalPuzzleQuestions.length}</h2>
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
    background: "#f0f7ff",
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
    marginTop: "15px",
    padding: "10px 20px",
    fontSize: "16px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    margin: "10px",
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

export default LogicalPuzzleSolver;
