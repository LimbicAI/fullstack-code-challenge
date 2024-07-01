import { useThemeColor } from "@/hooks/useThemeColor";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

interface ThemedSafeAreaViewProps extends SafeAreaViewProps {
  lightColor?: string;
  darkColor?: string;
}

export function ThemedSafeAreaView({
  lightColor,
  darkColor,
  style,
  edges = ["top"],
  ...rest
}: ThemedSafeAreaViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <SafeAreaView
      {...rest}
      style={[style, { backgroundColor }]}
      edges={edges}
    />
  );
}
