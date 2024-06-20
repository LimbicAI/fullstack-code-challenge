export type User = {
  id: number;
  name: string;
};

export type Question = {
  id: number;
  title: string;
  content: string;
  userId: number;
};

export type Answer = {
  id: number;
  content: string;
  questionId: number;
  userId: number;
};

export type AppState = {
  users: User[];
  questions: Question[];
};

export type AppAction =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "SET_QUESTIONS"; payload: Question[] };
