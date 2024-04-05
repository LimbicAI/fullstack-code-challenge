import React, { useState } from 'react';
import apiService from '../services/api';
import '../styles/QuestionForm.css';

interface Props {
  onQuestionAdded: () => void;
}

const QuestionForm: React.FC<Props> = ({ onQuestionAdded }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createQuestion({ title, body });
      onQuestionAdded();
      setTitle('');
      setBody('');
      setShowModal(false);
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <>
      {!showModal && (
        <button onClick={handleShowModal} className="add-question-btn">Add Question</button>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Add New Question</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="input-field" />
              <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} required className="input-field" />
              <button type="submit" className="submit-btn">Add Question</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionForm;
