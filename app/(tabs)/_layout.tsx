import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "teal",
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
