import { DELETE_QUESTION } from "@/store/graphql/mutations";
import { GET_QUESTION_ANSWERS } from "@/store/graphql/queries";
import { useMutation } from "@apollo/client";
import { useActionSheet } from "../useActionSheet";
import { useNavigation } from "expo-router";

const questionActionMenuItems = [
  { label: "Cancel", value: "cancel" },

  { label: "Edit post", value: "edit" },
  { label: "Delete post", value: "delete" },
];

export const useQuestionActionSheet = ({
  questionAnswersId,
}: {
  questionAnswersId: number;
}) => {
  const navigation = useNavigation();
  const [deleteMutation] = useMutation(DELETE_QUESTION, {
    variables: { questionId: questionAnswersId },
    refetchQueries: [
      { query: GET_QUESTION_ANSWERS, variables: { questionAnswersId } },
    ],
  });

  const handleQuestionActionMenuOnPress = async (
    item: (typeof questionActionMenuItems)[number]
  ) => {
    switch (item.value) {
      case "delete": {
        await deleteMutation();
        navigation.goBack();
        break;
      }
      case "edit": {
        // @ts-ignore-next-line
        navigation.navigate({ name: "question/new", params: { edit: true } });
      }
      default: {
        break;
      }
    }
  };

  const handleAnswerOnLongPress = useActionSheet({
    items: questionActionMenuItems,
    onPress: handleQuestionActionMenuOnPress,
    cancelButtonIndex: 0,
    destructiveButtonIndex: 2,
  });

  return handleAnswerOnLongPress;
};
