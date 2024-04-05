import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import UsersList from './components/UsersList';
import QuestionsList from './components/QuestionsList';
import AnswerForm from './components/AnswerForm';
import './styles/App.css'; // Import the CSS file for styling

const Main: React.FC = () => {
  return (
    <div className="main-container">
      <h1 className="main-title">Questionnaires App</h1>
      <ul className="main-menu">
        <li><Link to="/users" className="menu-item">Users</Link></li>
        <li><Link to="/questions" className="menu-item">Questions</Link></li>
        <li><Link to="/add-answer" className="menu-item">Add Answer</Link></li>
      </ul>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/questions" element={<QuestionsList />} />
        <Route path="/add-answer" element={<AnswerForm />} />
        {/* Add a "Not Found" route for unmatched paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
