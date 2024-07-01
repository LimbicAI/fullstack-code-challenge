import { ActionSheetIOS, useColorScheme } from "react-native";

export function useActionSheet({
  onPress,
  items,
  destructiveButtonIndex,
  cancelButtonIndex = 0,
  disabledButtonIndices,
}: {
  onPress: (item: { label: string; value: string }) => void;
  items: { label: string; value: string }[];
  cancelButtonIndex: number;
  destructiveButtonIndex?: number;
  disabledButtonIndices?: number[];
}) {
  const theme = useColorScheme() || "light";
  const handleOnPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: items.map((item) => item.label),
        destructiveButtonIndex,
        cancelButtonIndex: cancelButtonIndex,
        userInterfaceStyle: theme,
        disabledButtonIndices,
      },
      (index) => {
        onPress(items[index]);
      }
    );
  return handleOnPress;
}
