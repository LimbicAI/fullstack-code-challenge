import { StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedSafeAreaView } from "@/common/ThemedSafeAreaView";
import { ThemedView } from "@/common/ThemedView";
import { useContext } from "react";
import { GlobalContext } from "@/store/context/global";
import { observer } from "mobx-react-lite";
import { HeaderBack } from "@/common/navigation/HeaderBack";
import { ThemedButton } from "@/common/ThemedButton";
import { useQuestionForm } from "@/hooks/forms/useQuestionForm";
import { QuestionForm } from "@/forms/Question";

function NewQuestionScreen() {
  const { uiStore } = useContext(GlobalContext);
  const navigation = useNavigation();
  const selectedQuestion = uiStore.selectedQuestion;
  const edit = selectedQuestion != null;
  const { control, handleSubmit, loading } = useQuestionForm({
    defaultValues: uiStore.selectedQuestion,
    edit,
  });

  const onSubmit = handleSubmit(() => {
    navigation.goBack();
  });

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedView style={styles.actionContainer}>
        <HeaderBack />
        <ThemedButton
          type="small"
          textType="description"
          onPress={onSubmit}
          loading={loading}
        >
          {edit ? "Save" : "Create"}
        </ThemedButton>
      </ThemedView>
      <QuestionForm control={control} />
    </ThemedSafeAreaView>
  );
}

export default observer(NewQuestionScreen);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 10,
    gap: 4,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
});
