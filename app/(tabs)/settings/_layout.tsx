import { useTheme } from "@/context/ThemeContext";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.surface,
        },
        headerTintColor: theme.textPrimary,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "600" as const,
        },
        headerShadowVisible: !theme.backgroundImage,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 26, fontWeight: "bold" },
        }}
      />

      <Stack.Screen name="categories" options={{ title: "Categories" }} />
      <Stack.Screen name="theme" options={{ title: "Themes" }} />
    </Stack>
  );
}
