import { useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// import { View, Text, TouchableOpacity } from 'react-native';

import {
  getAllCategories,
  getTasks,
  Task,
  updateTaskStatus,
} from "@/database/tasksService";
import { Ionicons } from "@expo/vector-icons";

type CategoryId = "all" | "no-category" | number;

type Category = {
  id: CategoryId;
  name: string;
  color: string;
  icon: string;
};

import { router } from "expo-router";

export default function TasksList() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    Previous: true,
    Today: false, //  open by default
    Future: true,
  });

  const markStatus = async (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "completed" ? "pending" : "completed",
            }
          : t,
      ),
    );

    try {
      await updateTaskStatus(
        id,
        tasks.find((t) => t.id === id)?.status === "completed"
          ? "pending"
          : "completed",
      );
    } catch (error) {
      console.log(error);
    }
  };

  const taskDetails = async (id: number) => {
    router.push(`/tasks/${id}`);
  };

  // fetch categories
  const fetchAllCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response ?? []);
    } catch (error) {
      console.log(error);
      setCategories([]);
    }
  };

  // fetch tasks
  const fetchAllTasks = async () => {
    try {
      const response = await getTasks(500);
      setTasks(response?.tasks ?? []);
    } catch (error) {
      console.log(error);
      setTasks([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // This runs every time you navigate BACK to this screen
      init();
    }, []),
  );

  const init = async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchAllCategories(), fetchAllTasks()]);
    } finally {
      setIsLoading(false);
    }
  };

  const myCatgoies: Category[] = [
    { color: "#7C6FFF", icon: "school", id: "all", name: "All" },
    {
      color: "#6b7280",
      icon: "close-circle-outline",
      id: "no-category",
      name: "No Category",
    },
    ...categories,
  ];

  const filteredTasks = tasks.filter((t) => {
    if (activeCategory === "all") return true;

    if (activeCategory === "no-category") {
      return t.category_id === null;
    }

    return t.category_id === activeCategory;
  });

  const sections = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0)).getTime();
    const tomorrowStart = todayStart + 86400000;

    const previous: Task[] = [];
    const today: Task[] = [];
    const future: Task[] = [];

    for (const t of filteredTasks) {
      const taskTime = new Date(
        `${t.scheduled_date}T${t.time || "00:00"}`,
      ).getTime();

      if (taskTime < todayStart) {
        previous.push(t);
      } else if (taskTime >= todayStart && taskTime < tomorrowStart) {
        today.push(t);
      } else {
        future.push(t);
      }
    }

    return [
      { title: "Previous", data: previous },
      { title: "Today", data: today },
      { title: "Future", data: future },
    ];
  }, [filteredTasks]);

  const toggle = (title: string) => {
    setCollapsed((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const finalSections = useMemo(() => {
    return sections.map((s) => ({
      ...s,
      data: collapsed[s.title] ? [] : s.data,
    }));
  }, [sections, collapsed]);

  const SECTION_CONFIG = {
    Previous: {
      icon: "checkmark-done-outline",
      color: "#059669",
      bg: "#ecfdf5",
    },
    Today: {
      icon: "today-outline",
      color: "#2563eb",
      bg: "#eff6ff",
    },
    Future: {
      icon: "time-outline",
      color: "#64748b",
      bg: "#f1f5f9",
    },
  } as const;

  type SectionKey = keyof typeof SECTION_CONFIG;

  const renderHeader = ({ section }: any) => {
    const config = SECTION_CONFIG[section.title as SectionKey];

    return (
      <TouchableOpacity
        onPress={() => toggle(section.title)}
        activeOpacity={0.7}
        style={{
          backgroundColor: config.bg,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 16,
          marginTop: 4,
          // backgroundColor: "#FFFFFF",
          // Soft shadow for a modern look
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
          borderWidth: 1,
          borderColor: "#F3F4F6", // Subtle border for definition
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Optional: Add a subtle icon background */}
          <View
            style={{
              backgroundColor: "#F3F4F6",
              padding: 6,
              borderRadius: 8,
              marginRight: 12,
            }}
          >
            <Ionicons
              name={config.icon as any}
              size={18}
              color={config.color as any}
            />
          </View>

          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              letterSpacing: 1,
              color: config.color,
            }}
          >
            {section.title}
          </Text>
        </View>
        <Ionicons
          name={collapsed[section.title] ? "chevron-down" : "chevron-up"}
          size={18}
          color={config.color}
        />
      </TouchableOpacity>
    );
  };

  const PRIORITY_CONFIG = {
    0: {
      label: "No Priority",
      color: "#94a3b8",
      icon: "remove-circle-outline",
    },
    1: {
      label: "Low",
      color: "#3b82f6",
      icon: "arrow-down-outline",
    },
    2: {
      label: "Medium",
      color: "#f59e0b",
      icon: "remove-outline",
    },
    3: {
      label: "High",
      color: "#ef4444",
      icon: "flame-outline",
    },
  } as const;

  const renderItem = ({ item }: { item: Task }) => {
    // Logic to handle colors - defaults to blue if not provided
    const categoryColor = item.category_color || "#6b7280";
    const isCompleted = item.status === "completed";

    const priority = PRIORITY_CONFIG[item.priority as 1 | 2 | 3];

    return (
      <TouchableOpacity
        onPress={() => taskDetails(item.id)}
        style={[
          styles.taskCard,
          { borderLeftWidth: 4, borderLeftColor: priority.color },
        ]}
        activeOpacity={0.8}
      >
        <View style={styles.taskRow}>
          <Pressable onPress={() => markStatus(item.id)}>
            <Ionicons
              name={isCompleted ? "checkmark-circle" : "ellipse-outline"}
              size={26}
              color={isCompleted ? "#10b981" : "#cbd5e1"}
            />
          </Pressable>

          <View style={styles.textContainer}>
            <Text
              style={[styles.taskTitle, isCompleted && styles.completedText]}
            >
              {item.title}
            </Text>

            <Text className="text-xs mt-1">
              {item.note ? `${item.note.slice(0, 20)}...` : " "}
            </Text>
            {/* note goes here   */}

            <View style={styles.metaRow}>
              {/* LEFT SIDE */}
              <View
                style={{ backgroundColor: `${categoryColor}15` }}
                className="flex-row items-center px-2.5 py-1 rounded-full"
              >
                <Ionicons
                  name={(item.category_icon as any) || "bookmark-outline"}
                  size={12}
                  color={categoryColor}
                />
                <Text
                  style={{ color: categoryColor }}
                  className="text-[10px] font-bold ml-1 uppercase tracking-tight"
                >
                  {item.category_name || "Uncategorized"}
                </Text>
              </View>

              {/* RIGHT SIDE */}
              <View className="flex-row items-center gap-3">
                {/* if attachment */}
                {/* <Ionicons
                  name="notifications-outline"
                  size={14}
                  color="#94a3b8"
                />
              */}
                {/* if repeat or  */}
                {/* <Ionicons name="attach-outline" size={14} color="#94a3b8" /> */}

                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={14} color="#94a3b8" />
                  <Text className="text-slate-400 text-[12px] ml-1">
                    {item.scheduled_date}
                    {item.time ? ` : ${item.time}` : ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="p-2 ">
      <FlatList
        horizontal
        // refreshing={isLoading}
        // onRefresh={getcateall}
        showsHorizontalScrollIndicator={false}
        data={myCatgoies}
        renderItem={({ item }) => {
          const isActive = activeCategory === item.id;
          return (
            <Pressable
              className="mb-2"
              onPress={() => setActiveCategory(item.id)}
              style={[
                {
                  marginRight: 8,
                  borderWidth: 1.5,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor: "#F3F4F6",
                  gap: 6,
                },
                isActive && {
                  backgroundColor: item.color,
                  borderColor: item.color + "55",
                },
                !isActive && { borderColor: item.color + "55" },
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={18}
                color={isActive ? "#FFF" : item.color}
              />

              <Text
                style={[
                  {
                    fontSize: 13,
                    fontWeight: "600",
                    color: item.color,
                  },
                  { color: isActive ? "#fff" : item.color },
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />

      <SectionList
        sections={finalSections}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        renderSectionHeader={renderHeader}
        stickySectionHeadersEnabled
        onEndReachedThreshold={0.3}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingHorizontal: 8,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    elevation: 2,
  },
  taskRow: { flexDirection: "row", alignItems: "center" },
  textContainer: { flex: 1, marginLeft: 15 },
  taskTitle: { fontSize: 16, fontWeight: "600", color: "#334155" },
  completedText: { textDecorationLine: "line-through", color: "#cbd5e1" },
  metaRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
