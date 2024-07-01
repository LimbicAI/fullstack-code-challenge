import { StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput } from "react-native-gesture-handler";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

export type ThemedTextProps = Parameters<typeof TextInput>[0] & {
  lightColor?: string;
  darkColor?: string;
  error?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  error,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <ThemedView>
      <TextInput
        style={[
          { color },
          type === "default" ? styles.default : undefined,
          type === "title" ? styles.title : undefined,
          type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
          type === "subtitle" ? styles.subtitle : undefined,
          type === "link" ? styles.link : undefined,
          style,
        ]}
        {...rest}
      />
      {error ? <ThemedText type="error">{error}</ThemedText> : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: Colors.light.link,
  },
  error: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.light.error,
  },
});
