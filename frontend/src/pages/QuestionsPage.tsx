import { AnswerForm, Modal, QuestionForm } from "../components";
import { useAnswer } from "../contexts/AnswerContext";
import { useAuth } from "../contexts/AuthContext";
import { useQuestion } from "../contexts/QuestionContext";
import { useModal } from "../hooks";

const QuestionsPage = () => {
  const { questions, removeQuestion, selectedQuestion, setSelectedQuestion } =
    useQuestion();
  const { getAnswer, setSelectedAnswer, selectedAnswer } = useAnswer();
  const { isShowing: isShowingQuestionModal, toggle: toggleQuestionModal } =
    useModal();
  const { isShowing: isShowingAnswerModal, toggle: toggleAnswerModal } =
    useModal();
  const { user } = useAuth();

  return (
    <div className="bg-white">
      <Modal
        show={isShowingAnswerModal}
        onCloseButtonClick={toggleAnswerModal}
        title="Answer"
      >
        <AnswerForm
          initialValues={selectedAnswer || undefined}
          afterSubmit={toggleAnswerModal}
        />
      </Modal>
      <Modal
        show={isShowingQuestionModal}
        onCloseButtonClick={toggleQuestionModal}
        title="Update Question"
      >
        <QuestionForm
          initialValues={selectedQuestion || undefined}
          afterSubmit={toggleQuestionModal}
        />
      </Modal>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Questions from Your Therapist
          </h2>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Below are the questions from your therapist. You can answer them as
            needed.
          </p>
        </div>
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
            {questions.map((question) => (
              <div key={question.uuid}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  {question.title}
                </dt>
                <div className="flex mt-2">
                  {user?.role !== "patient" && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedQuestion(question);
                          toggleQuestionModal();
                        }}
                        className="px-3 py-1 mr-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:bg-indigo-200"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => removeQuestion(question.uuid)}
                        className="px-3 py-1 mr-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:bg-red-200"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {user?.role === "patient" && (
                    <button
                      onClick={() => {
                        toggleAnswerModal();
                        const answer = getAnswer(question.uuid);
                        setSelectedQuestion(question);
                        setSelectedAnswer(answer);
                      }}
                      className="px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-md hover:bg-green-200 focus:outline-none focus:bg-green-200"
                    >
                      Answer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
