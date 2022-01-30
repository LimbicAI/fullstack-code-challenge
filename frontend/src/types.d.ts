interface ApiPostResponse {
  success: boolean;
}

interface Question {
  id: number;
  question: string;
}

interface QuestionState {
  questions: Question[];
}

interface UserAnswer {
  id: number;
  answer: string;
  question: number;
}

interface User {
  id: number;
  name: string;
  answers: UserAnswer[];
}

interface UserState {
  users: User[];
  activeUser?: User["id"];
}
