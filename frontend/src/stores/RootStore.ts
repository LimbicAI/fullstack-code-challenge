import UserStore from "./UserStore";
import QuestionStore from "./QuestionStore";
import AnswerStore from "./AnswerStore";

class RootStore {
  userStore = new UserStore();
  questionStore = new QuestionStore();
  answerStore = new AnswerStore();
}

export default RootStore;
