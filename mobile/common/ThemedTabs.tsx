import { useState } from "react";
import { StyleSheet, ScrollView, ScrollViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemedText } from "./ThemedText";

export type ThemedTabsProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
  tabs: readonly string[];
  defaultTab?: string;
  onTabPress: (tab: string) => void;
};

export function ThemedTabs({
  style,
  tabs,
  defaultTab,
  lightColor,
  onTabPress,
  darkColor,
  ...rest
}: ThemedTabsProps) {
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tabIconSelected"
  );

  const [selected, setSelected] = useState<string>(defaultTab ?? tabs[0]);

  const handleTabPress = (tab: string) => () => {
    onTabPress(tab);
    setSelected(tab);
  };
  return (
    <ScrollView
      {...rest}
      horizontal
      style={[styles.scrollViewContainer, style]}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          style={[{ borderColor }, styles[`${selected === tab}`]]}
          onPress={handleTabPress(tab)}
        >
          <ThemedText>{tab}</ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    columnGap: 4,
    flexGrow: 1,
    flexShrink: 0,
  },
  true: {
    borderBottomWidth: 1,
    padding: 6,
    marginRight: 10,
  },
  false: {
    padding: 6,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: "transparent",
  },
});
