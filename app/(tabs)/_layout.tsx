import { useTheme } from "@/context/ThemeContext";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,

        tabBarInactiveTintColor: theme.textPrimary,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="tasks/index"
        options={{
          headerShown: false,
          title: "Tasks",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 26, fontWeight: "bold" },
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tasks" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar/index"
        options={{
          headerShown: false,
          title: "Calendar",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 26, fontWeight: "bold" },
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-number-sharp" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
