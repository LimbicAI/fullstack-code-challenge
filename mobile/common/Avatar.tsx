import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import { TouchableOpacity } from "react-native-gesture-handler";

function getTwoLetters(name: string) {
  const splitted = name.split(" ");

  if (splitted.length == 1) {
    return name.slice(0, 2);
  }
  return `${splitted[0][0]}${splitted[1][0]}`;
}

export function Avatar({
  name = "",
  size = 16,
  fontSize,
  lightColor,
  darkColor,
  onPress,
}: {
  name?: string;
  size?: number;
  fontSize?: number;
  lightColor?: string;
  darkColor?: string;
  onPress?: () => void;
}) {
  const twoLetters = getTwoLetters(name);
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint"
  );
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView
        style={[styles.avatar, { width: size, height: size, borderColor }]}
      >
        <ThemedText
          style={{ fontSize: fontSize || size * 0.33, lineHeight: 0 }}
          type="defaultSemiBold"
        >
          {twoLetters}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 1000,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
