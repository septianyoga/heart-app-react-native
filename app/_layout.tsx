import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";

export default function RootLayout() {
  return (
    <AlertNotificationRoot>
      <StatusBar barStyle="light-content" backgroundColor="#54c42e" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login/index" />
      </Stack>
    </AlertNotificationRoot>
  )
}
