import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { questionValidationSchema } from "./validationSchema";
import { useQuestion } from "../../contexts/QuestionContext";
import { Question } from "../../types";

type Props = {
  afterSubmit?: () => void;
  initialValues?: Question;
};

const QuestionForm: React.FC<Props> = ({
  initialValues = { title: "", uuid: "" },
  afterSubmit = () => {},
}) => {
  const { editQuestion, addQuestion } = useQuestion();
  const isEditMode = !!initialValues.title && !!initialValues.uuid;

  const buttonLabel = (isSubmitting: boolean) => {
    if (isEditMode) {
      return isSubmitting ? "Updating..." : "Update";
    } else {
      return isSubmitting ? "Submitting..." : "Submit";
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          question: initialValues.title,
          uuid: initialValues.uuid,
        }}
        validationSchema={questionValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (isEditMode) {
            editQuestion(initialValues.uuid, values.question);
          } else {
            await addQuestion(values.question);
          }
          setSubmitting(false);
          afterSubmit();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="question"
                className="block text-gray-700 font-bold mb-2"
              >
                Question
              </label>
              <Field
                type="text"
                as="textarea"
                id="question"
                name="question"
                className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="question"
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

export default QuestionForm;
