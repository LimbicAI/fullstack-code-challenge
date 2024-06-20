import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import QuestionsPage from "./pages/QuestionsPage";
import UserAnswersPage from "./pages/UserAnswersPage";
import { RootStoreProvider } from "./stores/RootStoreContext";
import AnswerPage from "./pages/AnswerPage";

const App: React.FC = () => (
  <RootStoreProvider>
    <Router>
      <header className="header">
        <h1>Limbic App</h1>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/questions">Questions</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/users/:userId/answers" element={<UserAnswersPage />} />
          <Route
            path="/questions/:questionId/answer"
            element={<AnswerPage />}
          />
        </Routes>
      </main>
    </Router>
  </RootStoreProvider>
);

export default App;
