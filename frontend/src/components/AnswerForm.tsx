import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import '../styles/AnswerForm.css';
import { Link } from 'react-router-dom';

const AnswerForm: React.FC = () => {
  const [body, setBody] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');

  useEffect(() => {
    const fetchUsersAndQuestions = async () => {
      try {
        const usersResponse = await apiService.getUsers();
        const questionsResponse = await apiService.getQuestions();
        setUsers(usersResponse.data);
        setQuestions(questionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsersAndQuestions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body || !selectedUser || !selectedQuestion) return;

    try {
      await apiService.createAnswer({ body, userId: selectedUser, questionId: selectedQuestion });
      setBody('');
      setSelectedUser('');
      setSelectedQuestion('');
    } catch (error) {
      console.error('Error creating answer:', error);
    }
  };

  return (
    <div className="answer-form-container">
      <h2 className="form-title">Add New Answer</h2>
      <form onSubmit={handleSubmit}>
        <select className="select-input" value={selectedUser} onChange={e => setSelectedUser(e.target.value)} required>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        <select className="select-input" value={selectedQuestion} onChange={e => setSelectedQuestion(e.target.value)} required>
          <option value="">Select Question</option>
          {questions.map(question => (
            <option key={question._id} value={question._id}>
              {question.title}
            </option>
          ))}
        </select>
        <textarea
          className="text-area-input"
          placeholder="Your Answer"
          value={body}
          onChange={e => setBody(e.target.value)}
          required
        />
        <button className="submit-button" type="submit">Add Answer</button>
      </form>
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
};

export default AnswerForm;
