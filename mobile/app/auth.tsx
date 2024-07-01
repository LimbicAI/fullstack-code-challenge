import { Image, StyleSheet } from "react-native";

import { HelloWave } from "@/common/HelloWave";
import ParallaxScrollView from "@/common/ParallaxScrollView";
import { ThemedText } from "@/common/ThemedText";
import { ThemedView } from "@/common/ThemedView";
import { ThemedButton } from "@/common/ThemedButton";
import useAuth from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { observer } from "mobx-react-lite";

function LoginScreen() {
  const { authenticate, isAuthenticated, error } = useAuth();
  const handleAuthentication = async () => {
    await authenticate(Math.round(Math.random() * 20));
  };

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Authenticate here</ThemedText>
        <HelloWave />
      </ThemedView>

      {error && error.message ? (
        <ThemedView>
          <ThemedText>{error?.message || "Something went wrong"}</ThemedText>
        </ThemedView>
      ) : null}

      <ThemedView>
        <ThemedButton type="default" onPress={handleAuthentication}>
          Authenticate me
        </ThemedButton>
      </ThemedView>
    </ParallaxScrollView>
  );
}

export default observer(LoginScreen);

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
