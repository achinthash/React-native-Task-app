import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 26, fontWeight: "bold" },
        }}
      />

      <Stack.Screen name="categories" options={{ title: "Categories" }} />
      {/*
      <Stack.Screen 
        name="theme" 
        options={{ title: "Theme" }} 
      /> */}
    </Stack>
  );
}
