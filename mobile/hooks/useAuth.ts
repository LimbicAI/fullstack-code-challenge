import { GlobalContext } from "@/store/context/global";
import { useRouter } from "expo-router";
import { useContext } from "react";

export default function useAuth() {
  const router = useRouter();
  const { auth } = useContext(GlobalContext);
  async function authenticate(userId: number) {
    await auth.authenticateWith(userId);
    router.navigate("/(tabs)");
  }
  async function logout() {
    auth.logout();
    router.replace("/auth");
  }
  return {
    isAuthenticated: auth.isLoggedIn,
    authenticate,
    logout,
    error: auth.error,
  };
}
