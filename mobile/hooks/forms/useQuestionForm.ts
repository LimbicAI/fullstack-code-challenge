import * as z from "zod";
import { AddQuestionMutationVariables } from "@/gql/__generated__/graphql";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { ADD_QUESTION, EDIT_QUESTION } from "@/store/graphql/mutations";
import { GET_QUESTIONS, GET_QUESTION_ANSWERS } from "@/store/graphql/queries";
import { useContext } from "react";
import { GlobalContext } from "@/store/context/global";

const schema = z
  .object({
    title: z.string().min(3),
    description: z.string().min(1),
  })
  .required();

export const useQuestionForm = (props: {
  defaultValues: (AddQuestionMutationVariables & { id?: number }) | null;
  edit?: boolean;
}) => {
  const { uiStore } = useContext(GlobalContext);
  const addQueryMutation = useMutation(ADD_QUESTION, {
    refetchQueries: [GET_QUESTIONS],
  });

  const editQueryMutation = useMutation(EDIT_QUESTION, {
    variables: { questionId: props.defaultValues?.id },
    refetchQueries: [
      GET_QUESTIONS,
      {
        query: GET_QUESTION_ANSWERS,
        variables: { questionAnswersId: props.defaultValues?.id },
      },
    ],
    onCompleted(data) {
      if (
        data.editQuestion?.id &&
        uiStore.selectedQuestion?.id == data.editQuestion?.id
      ) {
        uiStore.setSelectedQuestion(data.editQuestion);
      }
    },
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: props.defaultValues || { title: "", description: "" },
  });
  const [mutation, { loading, data, error }] = props.edit
    ? editQueryMutation
    : addQueryMutation;

  const handleSubmit = (callBackFn?: (values: typeof schema._type) => void) =>
    form.handleSubmit(async (values) => {
      try {
        const { data } = await mutation({ variables: values });

        callBackFn?.(data);
      } catch (error) {}
    });

  return { ...form, handleSubmit, loading, error, data };
};
