import { createContext, useContext } from 'react';

import answerService from '../services/AnswerService';

const AnswerStoreContext = createContext(answerService);

export const useAnswerStore = () => useContext(AnswerStoreContext);
