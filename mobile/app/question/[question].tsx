import {
  ActivityIndicator,
  FlatListProps,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedSafeAreaView } from "@/common/ThemedSafeAreaView";
import {
  QuestionAnswersQuery,
  QuestionAnswersQueryVariables,
  Question as QuestionType,
} from "@/gql/__generated__/graphql";
import { ThemedText } from "@/common/ThemedText";
import { QueryResult, useMutation, useQuery } from "@apollo/client";
import { GET_QUESTION_ANSWERS } from "@/store/graphql/queries";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { Answer } from "@/common/Answer";
import { ThemedView } from "@/common/ThemedView";
import { Question } from "@/common/Question";
import React, { ComponentProps, useContext } from "react";
import { GlobalContext } from "@/store/context/global";
import { observer } from "mobx-react-lite";
import { HeaderBack } from "@/common/navigation/HeaderBack";
import { Menu } from "@/common/ActionMenu";
import { AnswerForm } from "@/forms/Answer";
import { useAnswerForm } from "@/hooks/forms/useAnswerForm";
import { DELETE_ANSWER, DELETE_QUESTION } from "@/store/graphql/mutations";
import { useActionSheet } from "@/hooks/useActionSheet";
import { useAnswerActionSheet } from "@/hooks/actionsheets/useAnswerActionSheet";
import { useQuestionActionSheet } from "@/hooks/actionsheets/useQuestionActionSheet";

const NewAnswer = React.memo(function NewAnswer({
  questionId,
}: {
  questionId: number;
}) {
  const form = useAnswerForm({ defaultValues: { questionId } });

  const handleSubmit = form.onSubmit(() => {
    form.reset({ questionId, answer: "" });
  });

  return (
    <AnswerForm
      control={form.control}
      editable
      loading={form.loading}
      onSubmit={handleSubmit}
    />
  );
});

function Answers({
  loading,
  error,
  refetch,
  fetchMore,
  data,
  onAvatarPress,
  onAnswerLongPress,
  ListHeaderComponent,
}: QueryResult<QuestionAnswersQuery, QuestionAnswersQueryVariables> &
  Pick<
    FlatListProps<QuestionAnswersQuery["questionAnswers"][number]>,
    "ListHeaderComponent"
  > & {
    onAvatarPress: (
      item: QuestionAnswersQuery["questionAnswers"][number]["author"]
    ) => void;
    onAnswerLongPress: (
      item: QuestionAnswersQuery["questionAnswers"][number]
    ) => void;
  }) {
  if (loading) {
    return (
      <ThemedText>
        Loading... <ActivityIndicator />
      </ThemedText>
    );
  }
  if (error) {
    return (
      <ThemedText>
        {(error && error.message) || "Something went wrong"}
      </ThemedText>
    );
  }

  return (
    <FlatList
      data={data?.questionAnswers}
      style={{ height: "100%" }}
      ListHeaderComponent={ListHeaderComponent}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => refetch({ limit: 10, offset: 0 })}
        />
      }
      ListFooterComponent={
        <ActivityIndicator animating={loading} hidesWhenStopped />
      }
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Answer
          onAvatarPress={() => onAvatarPress(item.author)}
          onLongPress={() => onAnswerLongPress(item)}
          answer={item.answer}
          question={item.question}
          authorName={item.author.name}
          createdAt={item.createdAt}
          key={item.id}
        />
      )}
      stickyHeaderIndices={[0, data?.questionAnswers?.length || 1]}
      ListEmptyComponent={
        <ThemedView>
          <ThemedText>No answers done yet!!</ThemedText>
        </ThemedView>
      }
      onEndReached={() =>
        fetchMore({ variables: { offset: data?.questionAnswers?.length } })
      }
    />
  );
}

const SelectedQuestion = observer(
  ({
    selectedQuestion,
    onAvatarPress,
  }: {
    selectedQuestion: QuestionType;
    onAvatarPress: (item: QuestionType["author"]) => void;
  }) => {
    return (
      <ThemedView>
        <Question
          size="large"
          type="borderless"
          createdAt={selectedQuestion.createdAt}
          authorName={selectedQuestion?.author.name}
          title={selectedQuestion.title as string}
          description={selectedQuestion.description as string}
          onAvatarPress={() => onAvatarPress(selectedQuestion.author)}
        />
      </ThemedView>
    );
  }
);

function QuestionScreen() {
  const { uiStore, auth } = useContext(GlobalContext);
  const navigation = useNavigation();
  const selectedQuestion = uiStore.selectedQuestion as QuestionType;
  const questionAnswersId = Number(selectedQuestion.id);
  const queryResult = useQuery(GET_QUESTION_ANSWERS, {
    variables: { questionAnswersId },
  });

  const handleAnswerOnLongPress = useAnswerActionSheet({ questionAnswersId });

  const handleActions = useQuestionActionSheet({
    questionAnswersId,
  });
  const handleAvatarPress = (
    item: QuestionAnswersQuery["questionAnswers"][0]["author"]
  ) => {
    // @ts-ignore-next-line
    navigation.navigate({ name: `user/[user]`, params: item });
  };

  return (
    <ThemedSafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ThemedView style={styles.actionContainer}>
        <HeaderBack />
        {selectedQuestion.author.id === auth?.user?.id && (
          <Menu onPress={handleActions} />
        )}
      </ThemedView>
      <Answers
        onAvatarPress={handleAvatarPress}
        onAnswerLongPress={handleAnswerOnLongPress}
        ListHeaderComponent={
          <SelectedQuestion
            selectedQuestion={selectedQuestion}
            onAvatarPress={handleAvatarPress}
          />
        }
        {...queryResult}
      />
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-65}>
        <ThemedView style={styles.input}>
          <NewAnswer questionId={questionAnswersId} />
        </ThemedView>
      </KeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
}

export default observer(QuestionScreen);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    position: "relative",
    justifyContent: "center",
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 10,
    gap: 4,
  },
  actionContainer: {
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: { marginBottom: 65 },
  list: {
    flexShrink: 0,
    paddingBottom: 80,
  },
});
