import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sentenceQuestions = [
  {
    question: "Rearrange: always / punctual / he / is",
    correctAnswer: "he is always punctual",
    explanation: "Correct structure: Subject (he) + verb (is) + adverb (always) + adjective (punctual)",
  },
  {
    question: "Rearrange: been / have / we / years / for / friends / ten",
    correctAnswer: "we have been friends for ten years",
    explanation: "Present perfect: 'have been' with 'for duration'",
  },
  {
    question: "Rearrange: not / yet / they / arrived / have",
    correctAnswer: "they have not yet arrived",
    explanation: "Present perfect negative + adverb placement: 'not yet arrived'",
  },
  {
    question: "Rearrange: breakfast / always / I / before / coffee / have",
    correctAnswer: "I always have coffee before breakfast",
    explanation: "Adverb 'always' goes after subject (I); verb is 'have coffee'; time phrase 'before breakfast'",
  },
  {
    question: "Rearrange: the / to / station / I / walked / quickly",
    correctAnswer: "I walked quickly to the station",
    explanation: "Adverb 'quickly' before prepositional phrase 'to the station'",
  },
  {
    question: "Rearrange: hardly / he / speaks / in / public",
    correctAnswer: "he hardly speaks in public",
    explanation: "'Hardly' modifies the verb 'speaks'",
  },
  {
    question: "Rearrange: when / called / you / she / was / sleeping",
    correctAnswer: "she was sleeping when you called",
    explanation: "Past continuous 'was sleeping' + simple past 'you called'",
  },
  {
    question: "Rearrange: meeting / important / an / we / have / at / 10",
    correctAnswer: "we have an important meeting at 10",
    explanation: "Order: Subject + verb + article + adjective + noun + time phrase",
  },
  {
    question: "Rearrange: the / well / went / she / exam / in",
    correctAnswer: "she went well in the exam",
    explanation: "Subject + verb + adverb + prepositional phrase",
  },
  {
    question: "Rearrange: rarely / I / late / am",
    correctAnswer: "I am rarely late",
    explanation: "Be verb structure: Subject + be verb + adverb + adjective",
  },
];

const SentenceBuilder = () => {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [badge, setBadge] = useState("");
  const navigate = useNavigate();

  const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, " ");

  const checkAnswer = () => {
    const correct = sentenceQuestions[current].correctAnswer;
    const trimmed = normalize(answer);
    const expected = normalize(correct);

    if (trimmed === expected) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong. Correct: "${correct}"`);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    const next = current + 1;
    if (next < sentenceQuestions.length) {
      setCurrent(next);
      setAnswer("");
      setFeedback("");
      setShowExplanation(false);
    } else {
      setShowResult(true);
      const finalScore = score;
      if (finalScore === sentenceQuestions.length) {
        setBadge("🏆 English Sentence Master");
      } else if (finalScore >= 7) {
        setBadge("🥈 Grammar Achiever");
      } else {
        setBadge("🥉 Grammar Explorer");
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
      <h1 style={styles.title}>✍️ Sentence Builder</h1>

      {!showResult ? (
        <div style={styles.quizBox}>
          <h2>
            Q{current + 1}: {sentenceQuestions[current].question}
          </h2>
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type the correct sentence"
            style={styles.input}
            disabled={showExplanation} // Disable input while showing explanation
          />
          <br />
          {!showExplanation ? (
            <button onClick={checkAnswer} style={styles.button} disabled={showExplanation}>
              Submit
            </button>
          ) : (
            <>
              <p style={styles.feedback}>{feedback}</p>
              <p style={styles.explanation}>
                💡 Explanation: {sentenceQuestions[current].explanation}
              </p>
              <button onClick={handleNext} style={styles.nextButton}>
                ➡️ Next
              </button>
            </>
          )}
        </div>
      ) : (
        <div style={styles.resultBox}>
          <h2>✅ Your Score: {score} / {sentenceQuestions.length}</h2>
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
    background: "#f0f8ff",
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
    width: "300px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
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
  nextButton: {
    padding: "10px 20px",
    fontSize: "16px",
    background: "#007bff",
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
    background: "#e3fcec",
    padding: "25px",
    borderRadius: "15px",
    display: "inline-block",
  },
};

export default SentenceBuilder;
