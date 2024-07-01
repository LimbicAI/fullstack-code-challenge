import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ApolloProvider } from "@apollo/client";

import { useColorScheme } from "@/hooks/useColorScheme";
import client from "@/clients/apollo";
import { GlobalContext } from "@/store/context/global";
import auth from "@/store/mobx/auth";
import useLoadStores from "@/hooks/useLoadStores";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import uiStore from "@/store/mobx/uiStore";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "auth",
};

export default function Layout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const storesLoaded = useLoadStores();

  useEffect(() => {
    if (loaded && storesLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, storesLoaded]);
  if (!loaded || !storesLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ApolloProvider client={client}>
        <GlobalContext.Provider value={{ auth, uiStore }}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack initialRouteName="auth">
              <Stack.Screen
                name="question"
                options={{ headerShown: false, presentation: "modal" }}
              />

              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="auth"
                options={{ headerShown: false, presentation: "modal" }}
              />
              <Stack.Screen
                name="user/[user]"
                options={{
                  presentation: "card",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="question/[question]"
                options={{
                  presentation: "card",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="question/new"
                options={{
                  presentation: "fullScreenModal",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="+not-found"
                options={{ headerShown: false }}
              />
            </Stack>
          </ThemeProvider>
        </GlobalContext.Provider>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}
