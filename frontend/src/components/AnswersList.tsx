// src/components/AnswersList.tsx
import React, { useEffect, useState } from 'react';
import apiService from '../services/api';

interface Props {
  userId: string;
}

const AnswersList: React.FC<Props> = ({ userId }) => {
  const [answers, setAnswers] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await apiService.getUserAnswers(userId);
        setAnswers(response.data);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    fetchAnswers();
  }, [userId]);

  return (
    <div>
      <h2>Answers List for User</h2>
      <ul>
        {answers.map(answer => (
          <li key={answer._id}>
            <p>{answer.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnswersList;

