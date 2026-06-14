import "@/global.css";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Notifications from "expo-notifications";

import { useEffect } from "react";
import { Platform } from "react-native";

import { ThemeProvider } from "@/context/ThemeContext";

Notifications.setNotificationHandler({
  handleNotification:
    async (): Promise<Notifications.NotificationBehavior> => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,

      //  NEW required fields (SDK 53+)
      shouldShowBanner: true,
      shouldShowList: true,
    }),
});

export default function RootLayout() {
  useEffect(() => {
    async function configureNotifications() {
      // 2. REQUEST PERMISSIONS
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }

      // 3. ANDROID CHANNEL (Crucial for Expo Go)
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    }

    configureNotifications();
  }, []);

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />

            <Stack.Screen
              name="tasks/newTasks"
              options={{
                // presentation: "formSheet",
                title: "new",
                headerShown: false,
                headerTitleAlign: "center",
                presentation: "formSheet", //  use this first
                gestureEnabled: true, // ensure swipe works
                headerTitleStyle: {
                  fontSize: 26,
                  fontWeight: "bold",
                },
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
