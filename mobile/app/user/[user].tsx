import {
  ActivityIndicator,
  FlatListProps,
  StyleSheet,
  View,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedView } from "@/common/ThemedView";
import { ThemedText } from "@/common/ThemedText";
import { ThemedSafeAreaView } from "@/common/ThemedSafeAreaView";
import {
  User,
  UserAnswersQuery,
  UserQuestionsQuery,
} from "@/gql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { GET_USER_ANSWERS, GET_USER_QUESTIONS } from "@/store/graphql/queries";
import { HeaderBack } from "@/common/navigation/HeaderBack";
import { formatDistanceToNow, format, fromUnixTime } from "date-fns";
import { ThemedTabs } from "@/common/ThemedTabs";
import { FlatList } from "react-native-gesture-handler";
import { useContext, useState } from "react";
import { Avatar } from "@/common/Avatar";
import { Question } from "@/common/Question";
import { Answer } from "@/common/Answer";
import { GlobalContext } from "@/store/context/global";

function UserQuestionsTab({
  userId,
  ListHeaderComponent,
}: { userId: number } & Pick<
  FlatListProps<UserQuestionsQuery["userQuestions"][number]>,
  "ListHeaderComponent"
>) {
  const { uiStore } = useContext(GlobalContext);
  const { loading, data, error } = useQuery(GET_USER_QUESTIONS, {
    variables: { userId, limit: 10, offset: 0 },
  });
  const navigation = useNavigation();

  const handleAvatarPress = (item: UserQuestionsQuery["userQuestions"][0]) => {
    // @ts-ignore-next-line // problems with expo router being typed automatically
    navigation.navigate({ name: `user/[user]`, params: item.author });
  };
  const handleQuestionPress = (
    item: UserQuestionsQuery["userQuestions"][0]
  ) => {
    uiStore.selectedQuestion = item;
    // @ts-ignore-next-line // problems with expo router being typed automatically
    navigation.navigate({
      name: `question/[question]`,
      params: item,
    });
  };
  if (loading) {
    return (
      <ThemedText>
        Loading... <ActivityIndicator />{" "}
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
      data={data?.userQuestions}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Question
          authorName={item.author.name}
          onPress={() => handleQuestionPress(item)}
          onAvatarPress={() => handleAvatarPress(item)}
          title={item.title}
          createdAt={item.createdAt}
          description={item.description}
          key={item.id}
        />
      )}
      style={styles.tab}
      ListEmptyComponent={
        <ThemedView>
          <ThemedText>No questions yet!!</ThemedText>
        </ThemedView>
      }
    />
  );
}

function UserAnswersTab({
  userId,
  ListHeaderComponent,
}: { userId: number } & Pick<
  FlatListProps<UserAnswersQuery["userAnswers"][number]>,
  "ListHeaderComponent"
>) {
  const navigation = useNavigation();
  const { uiStore } = useContext(GlobalContext);
  const { loading, data, error } = useQuery(GET_USER_ANSWERS, {
    variables: { userId, limit: 10, offset: 0 },
  });

  const handleAvatarPress = (
    item: UserAnswersQuery["userAnswers"][number]["author"]
  ) => {
    console.warn(item);
    // @ts-ignore-next-line
    navigation.navigate({ name: `user/[user]`, params: item });
  };
  const handleAnswerPress = (item: UserAnswersQuery["userAnswers"][number]) => {
    uiStore.selectedQuestion = item.question;
    // @ts-ignore-next-line problems with expo having the typed router
    navigation.navigate({
      name: `question/[question]`,
      params: item.question,
    });
  };

  if (loading) {
    return (
      <ThemedText>
        Loading... <ActivityIndicator />{" "}
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
      style={styles.tab}
      contentContainerStyle={styles.list}
      data={data?.userAnswers}
      renderItem={({ item }) => (
        <Answer
          onPress={() => handleAnswerPress(item)}
          onAvatarPress={() => handleAvatarPress(item.author)}
          answer={item.answer}
          question={item.question}
          authorName={item.author.name}
          createdAt={item.createdAt}
          replyTo
          key={item.id}
        />
      )}
      ListEmptyComponent={
        <ThemedView>
          <ThemedText>No answers done yet!!</ThemedText>
        </ThemedView>
      }
    />
  );
}

const tabs = ["questions", "answers"] as const;

const DisplayOnlyOne: React.FC<React.PropsWithChildren<{ show: boolean }>> = ({
  show,
  children,
}) => {
  return (
    <View style={{ display: show ? "flex" : "none", flexGrow: 1 }}>
      {children}
    </View>
  );
};

export default function UserScreen() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(tabs[0]);
  const local = useLocalSearchParams<User & { id: string }>();
  const userId = Number(local.id);
  const handleActiveTab = (tab: string) => {
    setActiveTab(tab as (typeof tabs)[number]);
  };

  const header = (
    <ThemedView style={styles.header}>
      <Avatar size={96} name={local.name!} />
      <ThemedText type="subtitle">{local.name}</ThemedText>

      <ThemedText>
        <ThemedText type="defaultSemiBold">
          {formatDistanceToNow(local.birthday!)} old (
          {format(local.birthday!, "MM-dd-yyyy")}).
        </ThemedText>
      </ThemedText>
      <ThemedText>
        Joined the clinic at{" "}
        <ThemedText type="defaultSemiBold">
          {format(fromUnixTime(Number(local.createdAt)), "MMM d 'at' h:m a")}
        </ThemedText>
      </ThemedText>
      <ThemedTabs
        defaultTab={activeTab}
        onTabPress={handleActiveTab}
        tabs={tabs}
      />
    </ThemedView>
  );

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <HeaderBack />
      </ThemedView>
      {header}
      <ThemedView style={styles.contentContainer}>
        <DisplayOnlyOne show={activeTab === tabs[0]}>
          <UserQuestionsTab userId={userId} />
        </DisplayOnlyOne>
        <DisplayOnlyOne show={activeTab === tabs[1]}>
          <UserAnswersTab userId={userId} />
        </DisplayOnlyOne>
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  header: { flexShrink: 0, gap: 5 },
  contentContainer: {
    flexGrow: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 30,
  },
});
