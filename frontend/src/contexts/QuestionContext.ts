import { createContext, useContext } from 'react';

import questionService from '../services/QuestionService';

const QuestionStoreContext = createContext(questionService);

export const useQuestionStore = () => useContext(QuestionStoreContext);
