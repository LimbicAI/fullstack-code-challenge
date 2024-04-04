import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { questionValidationSchema } from "./validationSchema";
import { useAnswer } from "../../contexts/AnswerContext";
import { Answer } from "../../types";
import { useQuestion } from "../../contexts/QuestionContext";

type Props = {
  afterSubmit?: () => void;
  initialValues?: Answer;
};

const AnswerForm: React.FC<Props> = ({
  initialValues = {
    content: "",
    uuid: "",
    questionId: "",
    question: { title: "", id: "" },
  },
  afterSubmit = () => {},
}) => {
  const { editAnswer, addAnswer } = useAnswer();
  const { selectedQuestion } = useQuestion();

  const isEditMode = !!initialValues.content && !!initialValues.uuid;

  const buttonLabel = (isSubmitting: boolean) => {
    if (isEditMode) {
      return isSubmitting ? "Updating..." : "Update";
    } else {
      return isSubmitting ? "Submitting..." : "Submit";
    }
  };

  console.log(initialValues);

  return (
    <>
      <h3 className="text-xl font-bold mb-4">
        Question: {selectedQuestion?.title}
      </h3>
      <Formik
        initialValues={{
          answer: initialValues.content,
          uuid: initialValues.uuid,
        }}
        validationSchema={questionValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (isEditMode) {
            editAnswer(initialValues.uuid, values.answer);
          } else {
            selectedQuestion?.uuid &&
              (await addAnswer(values.answer, selectedQuestion?.uuid));
          }
          setSubmitting(false);
          afterSubmit();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="answer"
                className="block text-gray-700 font-bold mb-2"
              >
                Answer
              </label>
              <Field
                type="text"
                as="textarea"
                id="answer"
                name="answer"
                className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="answer"
                component="div"
                className="text-red-500 mt-1 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-600"
            >
              {buttonLabel(isSubmitting)}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AnswerForm;
