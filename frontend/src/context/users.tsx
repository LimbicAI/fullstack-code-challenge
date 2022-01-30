import React, {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import * as api from "../api/users";

import log from "../utils/logger";

const initialState: UserState = {
  users: [],
};

type Action =
  | {
      type: "SET_ACTIVE_USER";
      payload: { id: User["id"] };
    }
  | {
      type: "REMOVE_ACTIVE_USER";
    }
  | {
      type: "LIST_RESPONSE";
      payload: { users: User[] };
    }
  | {
      type: "READ";
      payload: { id: User["id"]; callback: (response: User) => void };
    }
  | {
      type: "READ_RESPONSE";
      payload: User;
    }
  | {
      type: "CREATE_ANSWER";
      payload: {
        question: UserAnswer["question"];
        answer: UserAnswer["answer"];
        callback: (response: ApiPostResponse & UserAnswer) => void;
      };
    }
  | {
      type: "CREATE_ANSWER_RESPONSE";
      payload: ApiPostResponse & UserAnswer;
    }
  | {
      type: "EDIT_ANSWER";
      payload: {
        callback: (response: ApiPostResponse & UserAnswer) => void;
      } & UserAnswer;
    }
  | {
      type: "EDIT_ANSWER_RESPONSE";
      payload: ApiPostResponse & UserAnswer;
    }
  | {
      type: "DELETE_ANSWER";
      payload: {
        id: UserAnswer["id"];
        callback: (response: ApiPostResponse) => void;
      };
    }
  | {
      type: "DELETE_ANSWER_RESPONSE";
      payload: ApiPostResponse;
    };

export const reducer = (currentState: UserState, action: Action): UserState => {
  // TODO: Replace with better deep copy
  let newState: UserState = JSON.parse(JSON.stringify(currentState));
  console.log("info", "ACTION", action);

  switch (action.type) {
    case "SET_ACTIVE_USER": {
      const { id } = action.payload;

      newState.activeUser = id;
      break;
    }
    case "REMOVE_ACTIVE_USER": {
      newState.activeUser = undefined;
      break;
    }
    case "LIST_RESPONSE": {
      const { users } = action.payload;
      newState.users = users;
      break;
    }
    case "READ": {
      const { id, callback } = action.payload;
      api.read(id).then(callback);
      break;
    }
    case "READ_RESPONSE": {
      const { id, name, answers } = action.payload;

      const index = newState.users.findIndex((u) => u.id === id);

      if (index === -1) {
        newState.users.push({ id, name, answers });
        break;
      }

      newState.users[index] = {
        ...newState.users[index],
        answers,
      };
      break;
    }
    case "CREATE_ANSWER": {
      const { answer, question, callback } = action.payload;

      if (newState.activeUser === undefined) {
        throw new Error("No active user");
      }

      api
        .createAnswer(newState.activeUser, { answer, question })
        .then(callback);
      break;
    }
    case "CREATE_ANSWER_RESPONSE": {
      const { id, question, answer, success } = action.payload;

      if (!success) break;

      if (newState.activeUser === undefined) {
        throw new Error("No active user");
      }

      const userIndex = newState.users.findIndex(
        (u) => u.id === newState.activeUser
      );

      newState.users[userIndex].answers.push({
        id,
        question,
        answer,
      });
      break;
    }
    case "EDIT_ANSWER": {
      const { id, answer, question, callback } = action.payload;

      if (newState.activeUser === undefined) {
        throw new Error("No active user");
      }

      const userIndex = newState.users.findIndex(
        (u) => u.id === newState.activeUser
      );

      const i = newState.users[userIndex].answers.findIndex((a) => a.id === id);
      if (i === -1) {
        throw new Error("Invalid answer");
      }

      newState.users[newState.activeUser].answers[i] = {
        id,
        answer,
        question,
      };
      api
        .editAnswer(newState.activeUser, { id, answer, question })
        .then(callback);
      break;
    }
    case "EDIT_ANSWER_RESPONSE": {
      const { id, question, answer, success } = action.payload;

      if (!success) break;

      if (newState.activeUser === undefined) {
        throw new Error("No active user");
      }

      const userIndex = newState.users.findIndex(
        (u) => u.id === newState.activeUser
      );

      const i = newState.users[userIndex].answers.findIndex((a) => a.id === id);
      if (i === -1) {
        throw new Error("Invalid answer");
      }

      newState.users[userIndex].answers[i] = {
        id,
        answer,
        question,
      };
      break;
    }
    case "DELETE_ANSWER": {
      const { id, callback } = action.payload;

      if (newState.activeUser === undefined) {
        throw new Error("No active user");
      }

      const userIndex = newState.users.findIndex(
        (u) => u.id === newState.activeUser
      );

      const i = newState.users[userIndex].answers.findIndex((a) => a.id === id);
      if (i === -1) {
        throw new Error("Invalid answer");
      }

      newState.users[userIndex].answers.splice(i, 1);
      api.delAnswer(newState.activeUser, id).then(callback);
      break;
    }
    case "DELETE_ANSWER_RESPONSE": {
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

export const UsersContext = createContext<[UserState, Dispatch<Action>]>([
  initialState,
  () => {},
]);

export function UserStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UsersContext.Provider value={[state, dispatch]}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUserState(): [UserState, Dispatch<Action>] {
  const [state, dispatch] = useContext(UsersContext);

  if (state === undefined || dispatch === undefined) {
    throw new Error("Provider not found");
  }

  const getUsers = useCallback(async () => {
    const response = await api.list();
    dispatch({ type: "LIST_RESPONSE", payload: { users: response } });
  }, [dispatch]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return [state, dispatch];
}
