import { ActivityIndicator, Image, StyleSheet } from "react-native";

import { HelloWave } from "@/common/HelloWave";
import { ThemedText } from "@/common/ThemedText";
import { ThemedView } from "@/common/ThemedView";
import { useQuery } from "@apollo/client";
import { GET_QUESTIONS } from "@/store/graphql/queries";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { ThemedSafeAreaView } from "@/common/ThemedSafeAreaView";
import { QuestionsQuery } from "@/gql/__generated__/graphql";
import { useNavigation } from "expo-router";
import { Question } from "@/common/Question";
import { useContext } from "react";
import { GlobalContext } from "@/store/context/global";
import { ThemedButton } from "@/common/ThemedButton";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { uiStore } = useContext(GlobalContext);
  const { loading, error, data, refetch, fetchMore } = useQuery(GET_QUESTIONS, {
    variables: { offset: 0, limit: 10 },
  });
  const handleAvatarPress = (item: QuestionsQuery["questions"][0]) => {
    // @ts-ignore-next-line
    navigation.navigate({ name: "user/[user]", params: item.author });
  };
  const handleQuestionPress = (item: QuestionsQuery["questions"][0]) => {
    uiStore.selectedQuestion = item;
    // @ts-ignore-next-line
    navigation.navigate({
      name: "question/[question]",
      params: item,
    });
  };

  const handleAddQuestion = () => {
    uiStore.selectedQuestion = null;
    // @ts-ignore-next-line
    navigation.navigate({
      name: "question/new",
    });
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <FlatList
        data={data?.questions}
        style={styles.list}
        renderItem={({ item }) => (
          <Question
            createdAt={item.createdAt}
            authorName={item.author.name}
            onPress={() => handleQuestionPress(item)}
            onAvatarPress={() => handleAvatarPress(item)}
            title={item.title}
            description={item.description}
            key={item.id}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => refetch({ limit: 10, offset: 0 })}
          />
        }
        ListFooterComponent={
          <ActivityIndicator animating={loading} hidesWhenStopped />
        }
        ListHeaderComponent={
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Questions.</ThemedText>
            <ThemedButton
              type="small"
              textType="description"
              onPress={handleAddQuestion}
              icon={<Ionicons name="add" color="white" size={24} />}
            >
              Add
            </ThemedButton>
          </ThemedView>
        }
        onEndReached={() =>
          fetchMore({ variables: { offset: data?.questions?.length } })
        }
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  list: {
    flexGrow: 1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  otter: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    position: "absolute",
  },
});
