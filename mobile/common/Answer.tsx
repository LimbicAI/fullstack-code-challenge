import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemedView } from "./ThemedView";
import { Avatar } from "./Avatar";
import { ThemedText } from "./ThemedText";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDistance } from "date-fns";

export const Answer: React.FC<{
  onAvatarPress: () => void;
  onPress?: () => void;
  onLongPress?: () => void;
  authorName: string;
  answer: string;
  createdAt: number;
  question?: {
    title: string;
    description: string;
    author: {
      name: string;
    };
  };
  replyTo?: boolean;
}> = ({
  authorName,
  answer,
  createdAt,
  onAvatarPress,
  onPress,
  onLongPress,
  question,
  replyTo,
}) => {
  return (
    <TouchableOpacity
      style={styles.opacity}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {replyTo ? (
        <ThemedView style={styles.replyContainer}>
          <Ionicons
            size={18}
            name="return-up-back-outline"
            style={styles.icon}
          />
          <ThemedText type="author">{question?.author.name}</ThemedText>
        </ThemedView>
      ) : null}
      <ThemedView style={styles.answerContainer}>
        <Avatar size={32} name={authorName} onPress={onAvatarPress} />
        <ThemedView style={styles.titleContainer}>
          <ThemedText>
            <ThemedText type="author">{authorName}</ThemedText>
            <ThemedText type="small">
              {" · "}
              <ThemedText type="small">
                {formatDistance(new Date(createdAt), new Date())}
              </ThemedText>
            </ThemedText>
          </ThemedText>
          <ThemedText type="description" lineBreakMode="head">
            {answer}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  opacity: {
    borderWidth: 1,
    flexGrow: 1,
    borderRadius: 6,
    padding: 10,
    width: "100%",
    marginTop: 10,
  },
  replyContainer: { flexDirection: "row", flexGrow: 1, marginBottom: 4 },

  answerContainer: {
    flexDirection: "row",
    flexGrow: 1,
  },
  titleContainer: {
    marginLeft: 10,
    flexShrink: 1,
  },
  icon: { marginRight: 4 },
});
