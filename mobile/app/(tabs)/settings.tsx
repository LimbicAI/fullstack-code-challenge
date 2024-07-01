import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/common/ThemedText";
import { ThemedButton } from "@/common/ThemedButton";
import useAuth from "@/hooks/useAuth";

export default function UsersScreen() {
  const { logout } = useAuth();
  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText style={styles.text}>
          Thank you for trying it out!
        </ThemedText>
        <ThemedButton onPress={logout}>Logout</ThemedButton>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 10,
  },
});
