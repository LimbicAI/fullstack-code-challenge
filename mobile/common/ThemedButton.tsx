import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  ActivityIndicator,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText, ThemedTextProps } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import { ReactElement, ReactNode } from "react";

export type ThemedButton = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  loading?: boolean;
  type?: "default" | "lg" | "xl" | "small";
  icon?: ReactNode;
  textType?: ThemedTextProps["type"];
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  type = "default",
  icon,
  textType,
  children,
  loading,
  ...rest
}: ThemedButton) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "button");

  return (
    <TouchableOpacity
      {...rest}
      style={[
        style,
        styles.defaultStyling,
        styles[type],
        { backgroundColor: color },
      ]}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator />
      ) : icon ? (
        icon
      ) : (
        <ThemedText
          lightColor={Colors.dark.text}
          darkColor={Colors.light.text}
          type={textType}
        >
          {children}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultStyling: {
    borderRadius: 8,
  },
  default: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  lg: {
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  xl: {
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});
