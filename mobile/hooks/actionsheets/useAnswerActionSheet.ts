import { DELETE_ANSWER } from "@/store/graphql/mutations";
import { GET_QUESTION_ANSWERS } from "@/store/graphql/queries";
import { useMutation } from "@apollo/client";
import { useActionSheet } from "../useActionSheet";
import { useContext } from "react";
import { GlobalContext } from "@/store/context/global";
import { Answer } from "@/gql/__generated__/graphql";

const answerActionMenuItems = [
  { label: "Cancel", value: "cancel" },

  { label: "Edit answer", value: "edit", disabled: true },
  { label: "Delete answer", value: "delete" },
];

export const useAnswerActionSheet = ({
  questionAnswersId,
}: {
  questionAnswersId: number;
}) => {
  const { uiStore } = useContext(GlobalContext);
  const [deleteAnswerMutation] = useMutation(DELETE_ANSWER, {
    refetchQueries: [
      { query: GET_QUESTION_ANSWERS, variables: { questionAnswersId } },
    ],
  });

  const handleAnswerActionMenuOnPress = async (
    item: (typeof answerActionMenuItems)[number]
  ) => {
    switch (item.value) {
      case "delete": {
        await deleteAnswerMutation({
          variables: { answerId: uiStore.selectedAnswer?.id! },
        });
        break;
      }
      case "edit": {
        // @ts-ignore-next-line
        // navigation.navigate({ name: "question/new", params: { edit: true } });
      }
      default: {
        break;
      }
    }
    uiStore.setSelectedAnswer(null);
  };
  const handleAnswerOnLongPress = useActionSheet({
    items: answerActionMenuItems,
    onPress: handleAnswerActionMenuOnPress,
    cancelButtonIndex: 0,
    destructiveButtonIndex: 2,
    disabledButtonIndices: [1],
  });

  return (item: Answer) => {
    uiStore.setSelectedAnswer(item);
    handleAnswerOnLongPress();
  };
};
