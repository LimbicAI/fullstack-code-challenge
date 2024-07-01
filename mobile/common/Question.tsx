import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemedView } from "./ThemedView";
import { Avatar } from "./Avatar";
import { ThemedText } from "./ThemedText";
import { StyleSheet } from "react-native";
import { formatDistance } from "date-fns";

export const Question: React.FC<{
  size?: "large" | "default";
  authorName?: string;
  title: string;
  description: string;
  createdAt: number;
  onAvatarPress?: () => void;
  onPress?: () => void;
  type?: "default" | "borderless";
}> = ({
  size,
  authorName,
  title,
  createdAt,
  description,
  onAvatarPress,
  onPress,
  type = "default",
}) => {
  return (
    <TouchableOpacity style={[styles.opacity, styles[type]]} onPress={onPress}>
      <ThemedView style={styles.titleContainer}>
        <Avatar
          size={size == "large" ? 56 : 32}
          name={authorName}
          onPress={onAvatarPress}
        />
        <ThemedView style={styles.title}>
          <ThemedText type={size == "large" ? "defaultSemiBold" : "default"}>
            {authorName}
          </ThemedText>
          <ThemedText type="small">
            {formatDistance(new Date(createdAt), new Date())}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.postContent}>
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
        <ThemedText type="description">{description}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  opacity: {
    flexGrow: 1,
    borderRadius: 6,
    padding: 10,
    width: "100%",
    marginTop: 10,
  },
  default: {
    borderWidth: 1,
  },
  borderless: {},
  titleContainer: { flexDirection: "row", flexGrow: 1, alignItems: "center" },
  title: { marginLeft: 6, lineHeight: 10 },
  postContent: { marginTop: 4, gap: 2 },
});
