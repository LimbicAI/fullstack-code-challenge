import React, { useEffect, useState, ChangeEvent } from 'react';
import apiService from '../services/api';
import QuestionForm from './QuestionForm';
import '../styles/QuestionsList.css';

interface Question {
  _id: string;
  title: string;
  body: string;
}

const QuestionsList: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editedQuestion, setEditedQuestion] = useState<Question>({
    _id: '',
    title: '',
    body: ''
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await apiService.getQuestions();
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleEditQuestion = (id: string) => {
    const questionToEdit = questions.find(question => question._id === id);
    if (questionToEdit) {
      setEditedQuestion({
        _id: questionToEdit._id,
        title: questionToEdit.title,
        body: questionToEdit.body
      });
      setShowEditModal(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedQuestion(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.editQuestion(editedQuestion._id, editedQuestion);
      const updatedQuestions = questions.map(question =>
        question._id === editedQuestion._id ? editedQuestion : question
      );
      setQuestions(updatedQuestions);
      setEditedQuestion({ _id: '', title: '', body: '' });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error editing question:', error);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    try {
      await apiService.deleteQuestion(id);
      setQuestions(prevQuestions => prevQuestions.filter(question => question._id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleQuestionAdded = async () => {
    try {
      const response = await apiService.getQuestions();
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  return (
    <div className="questions-list-container">
      <h2 className="questions-title">Questions List</h2>
      <QuestionForm onQuestionAdded={handleQuestionAdded} />
      <ul className="questions-list">
        {questions.map(question => (
          <li key={question._id} className="question-item">
            <div>
              <h3>{question.title}</h3>
              <p>{question.body}</p>
            </div>
            <div className="question-actions">
              <button onClick={() => handleEditQuestion(question._id)}>Edit</button>
              <button onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
            <h2>Edit Question</h2>
            <form onSubmit={handleSubmitEdit}>
              <div className="form-group">
                <label htmlFor="edit-title">Title:</label>
                <input
                  type="text"
                  id="edit-title"
                  name="title"
                  value={editedQuestion.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-body">Body:</label>
                <textarea
                  id="edit-body"
                  name="body"
                  value={editedQuestion.body}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsList;
