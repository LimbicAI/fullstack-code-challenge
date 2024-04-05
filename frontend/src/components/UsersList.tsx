import React, { useEffect, useState } from 'react';
import apiService from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/UsersList.css'; // Import the CSS file for styling

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiService.getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleShowAnswers = async (userId: string) => {
    try {
      const response = await apiService.getUserAnswers(userId);
      setUserAnswers(response.data);
      setSelectedUserId(userId);
    } catch (error) {
      console.error('Error fetching user answers:', error);
    }
  };

  const handleDeleteAnswer = async (answerId: string) => {
    try {
      await apiService.deleteAnswer(answerId);
      setUserAnswers(prevAnswers => prevAnswers.filter(answer => answer._id !== answerId));
    } catch (error) {
      console.error('Error deleting answer:', error);
    }
  };

  return (
    <div className="users-list-container">
      <h2 className="list-title">Users List</h2>
      <ul className="users-list">
        {users.map(user => (
          <li key={user._id} className="user-item">
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <button className="show-answers-btn" onClick={() => handleShowAnswers(user._id)}>Show All Answers</button>
            {selectedUserId === user._id && userAnswers && userAnswers.length > 0 && (
              <ul className="user-answers-list">
                {userAnswers.map(answer => (
                  <li key={answer._id} className="answer-item">
                    <p className="answer-info">Question: {answer.questionId ? answer.questionId.title : 'N/A'}</p>
                    <p className="answer-info">Answer: {answer.body}</p>
                    <button className="delete-answer-btn" onClick={() => handleDeleteAnswer(answer._id)}>Delete Answer</button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
};

export default UsersList;
