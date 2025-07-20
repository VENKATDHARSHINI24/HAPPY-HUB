import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import Dashboard from "./Dashboard";
import MathChallenges from "./MathChallenges";
import AptitudeSolver from "./AptitudeSolver";
import SentenceBuilder from "./SentenceBuilder";
import LogicalPuzzleSolver from "./LogicalPuzzleSolver";
import GrammarHunt from "./GrammarHunt";
import QuickQuiz from "./QuickQuiz"; // ✅ Add this

import "./Login.css";
import "./Signup.css";
import "./Dashboard.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/math" element={<MathChallenges />} />
        <Route path="/aptitude" element={<AptitudeSolver />} />
        <Route path="/sentence" element={<SentenceBuilder />} />
        <Route path="/logical" element={<LogicalPuzzleSolver />} />
        <Route path="/grammar" element={<GrammarHunt />} />
        <Route path="/quickquiz" element={<QuickQuiz />} /> {/* ✅ Correct route */}
      </Routes>
    </Router>
  );
}

export default App;
