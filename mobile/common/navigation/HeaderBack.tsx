import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedButton } from "../ThemedButton";
import { useNavigation } from "expo-router";

export function HeaderBack() {
  const { goBack } = useNavigation();
  return (
    <ThemedButton
      icon={<Ionicons name="chevron-back" size={16} />}
      onPress={goBack}
      type="default"
      lightColor="transparent"
      darkColor="transparent"
      style={{ paddingLeft: 0 }}
    />
  );
}
