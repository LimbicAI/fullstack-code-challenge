import React, {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import * as api from "../api/questions";

import log from "../utils/logger";

const initialState: QuestionState = {
  questions: [],
};

type Action =
  | {
      type: "LIST_RESPONSE";
      payload: { questions: Question[] };
    }
  | {
      type: "CREATE";
      payload: {
        question: Question["question"];
        callback: (response: ApiPostResponse & Question) => void;
      };
    }
  | {
      type: "CREATE_RESPONSE";
      payload: ApiPostResponse & Question;
    }
  | {
      type: "EDIT";
      payload: {
        callback: (response: ApiPostResponse & Question) => void;
      } & Question;
    }
  | {
      type: "EDIT_RESPONSE";
      payload: ApiPostResponse & Question;
    }
  | {
      type: "DELETE";
      payload: {
        id: Question["id"];
        callback: (response: ApiPostResponse) => void;
      };
    }
  | {
      type: "DELETE_RESPONSE";
      payload: ApiPostResponse;
    };

export const reducer = (
  currentState: QuestionState,
  action: Action
): QuestionState => {
  // TODO: Replace with better deep copy
  let newState: QuestionState = JSON.parse(JSON.stringify(currentState));
  console.log("info", "ACTION", action);

  switch (action.type) {
    case "LIST_RESPONSE": {
      const { questions } = action.payload;
      newState.questions = questions;
      break;
    }
    case "CREATE": {
      const { question, callback } = action.payload;

      api.create(question).then(callback);
      break;
    }
    case "CREATE_RESPONSE": {
      const { id, question, success } = action.payload;

      if (!success) break;

      newState.questions.push({ id, question });
      break;
    }
    case "EDIT": {
      const { id, question, callback } = action.payload;

      const i = newState.questions.findIndex((q) => q.id === id);
      if (i === -1) {
        throw new Error("Invalid question");
      }

      newState.questions[i].question = question;
      api.edit({ id, question }).then(callback);
      break;
    }
    case "EDIT_RESPONSE": {
      const { id, question, success } = action.payload;

      if (!success) break;

      const i = newState.questions.findIndex((q) => q.id === id);
      if (i === -1) {
        throw new Error("Invalid question");
      }

      newState.questions[i].question = question;
      break;
    }
    case "DELETE": {
      const { id, callback } = action.payload;

      const i = newState.questions.findIndex((q) => q.id === id);
      if (i === -1) {
        throw new Error("Invalid question");
      }

      newState.questions.splice(i, 1);
      api.del(id).then(callback);
      break;
    }
    case "DELETE_RESPONSE": {
      // TODO: error handling for failed optimistic update
      break;
    }
    default: {
      log("error", "Unexpected action", action);
      break;
    }
  }

  console.log("info", "NEW_STATE", newState);
  return newState;
};

export const QuestionsContext = createContext<
  [QuestionState, Dispatch<Action>]
>([initialState, () => {}]);

export function QuestionStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuestionsContext.Provider value={[state, dispatch]}>
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestionState(): [QuestionState, Dispatch<Action>] {
  const [state, dispatch] = useContext(QuestionsContext);

  if (state === undefined || dispatch === undefined) {
    throw new Error("Provider not found");
  }

  const getQuestions = useCallback(async () => {
    const response = await api.list();
    dispatch({ type: "LIST_RESPONSE", payload: { questions: response } });
  }, [dispatch]);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return [state, dispatch];
}
