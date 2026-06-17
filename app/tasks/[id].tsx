import {
  deleteTask,
  getTaskById,
  updateTask,
  updateTaskStatus,
} from "@/database/tasksService";

import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, MD3LightTheme, Menu, PaperProvider } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";

import { SafeAreaView } from "react-native-safe-area-context";
import CategorySelect from "./categorySelect";
import DateSelect from "./dateSelect";

type Task = {
  id: number;
  title: string;
  note: string | null;
  scheduled_date: string;
  time: string | null;
  priority: number;
  status: string;
  category_id: number | null;
  created_at: string;
  updated_at: string;
  category_name: string | null;
  category_icon: string | null;
  category_color: string | null;
};

type Category = {
  id: number;
  name: string;
  icon: string;
  color: string;
};

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState<Task | null>(null);
  const [initialTask, setInitialTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const paperTheme = useMemo(
    () => ({
      ...MD3LightTheme,
      colors: {
        ...MD3LightTheme.colors,
        primary: theme.primary,
        onPrimary: theme.textOnPrimary,
        primaryContainer: theme.primaryContainer,
        onPrimaryContainer: theme.textOnPrimary,
        background: theme.background,
        onBackground: theme.textPrimary,
        surface: theme.surface,
        onSurface: theme.textPrimary,
        surfaceVariant: theme.primaryContainer,
        onSurfaceVariant: theme.textSecondary,
        outline: theme.border,
      },
    }),
    [theme],
  );

  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visiblePriority, setVisiblePriority] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  // States for the form
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState("pending");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await getTaskById(Number(id));
        setTask(response);
        setInitialTask(response);

        if (response) {
          setTitle(response.title);
          setNote(response.note || "");
          setPriority(response.priority);
          setStatus(response.status);
          setSelectedTime(response.time ?? null);
          setSelectedDate(response.scheduled_date);

          if (response.category_id) {
            setSelectedCategory({
              id: response.category_id,
              name: response.category_name || "Category",
              icon: response.category_icon || " list",
              color: response.category_color || "#000",
            });
          } else {
            setSelectedCategory(null);
          }
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) getTask();
  }, [id]);

  const PRIORITY_MAP: Record<number, { label: string; color: string }> = {
    0: { label: "No Priority", color: "text-black" },
    1: { label: "Low", color: "text-green-500" },
    2: { label: "Medium", color: "text-yellow-600" },
    3: { label: "High", color: "text-red-500" },
  };

  const onDismiss = useCallback(() => {
    setTimeModalVisible(false);
  }, []);

  const handleTimeConfirm = ({ hours, minutes }: any) => {
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    setSelectedTime(formattedTime);
    setTimeModalVisible(false);
  };

  // 2. Add a useEffect for Auto-saving (Debounced)
  useEffect(() => {
    if (!task || !initialTask) return;

    const hasChanged =
      title !== initialTask.title ||
      note !== (initialTask.note || "") ||
      selectedDate !== initialTask.scheduled_date ||
      selectedTime !== initialTask.time ||
      priority !== initialTask.priority ||
      status !== initialTask.status ||
      Number(selectedCategory?.id ?? null) !==
        Number(initialTask.category_id ?? null);

    if (!hasChanged) return;

    const delayDebounceFn = setTimeout(async () => {
      try {
        await updateTask(
          title,
          note,
          selectedDate,
          selectedTime ?? "",
          priority,
          status,
          selectedCategory?.id ?? null,
          Number(id),
        );

        setInitialTask({
          ...initialTask!,
          title,
          note,
          scheduled_date: selectedDate,
          time: selectedTime,
          priority,
          status,
          category_id: selectedCategory ? selectedCategory.id : null,
        });
        console.log("Auto-saved changes");
      } catch (error) {
        console.error("Failed to auto-save:", error);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [
    title,
    note,
    selectedDate,
    selectedTime,
    priority,
    status,
    selectedCategory,
    task,
    initialTask,
    id,
  ]);

  // delete category
  const handleDelete = (id: number) => {
    Alert.alert(
      "Delete task",
      "Are you sure want to Delete this task! this action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteSelectedTask(id),
          style: "destructive",
        },
      ],
    );
  };

  const deleteSelectedTask = async (id: number) => {
    try {
      const response = await deleteTask(id);

      if (response.success) {
        router.back();
      } else {
        Alert.alert("Error", "Failed to delete task");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong while deleting task");
    }
  };

  const markStatus = async (id: number) => {
    const prevStatus = status;
    const newStatus = status === "completed" ? "pending" : "completed";

    setStatus(newStatus);

    try {
      await updateTaskStatus(id, newStatus);
    } catch (error) {
      console.log(error);
      setStatus(prevStatus); // rollback
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaView
        className="flex-1 "
        style={{ backgroundColor: theme.background }}
        edges={["top", "left", "right"]}
      >
        {/* category select modal  */}
        <Modal
          visible={categoryModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setCategoryModalVisible(false)}
        >
          {/* OUTSIDE */}
          <Pressable
            style={styles.overlay}
            onPress={() => setCategoryModalVisible(false)}
          >
            {/* INSIDE (prevent close) */}
            <Pressable
              onPress={(e) => e.stopPropagation()}
              style={[
                styles.modalContainer,
                { backgroundColor: theme.surface },
              ]}
            >
              <CategorySelect
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                onDone={() => setCategoryModalVisible(false)}
              />
            </Pressable>
          </Pressable>
        </Modal>

        {/* Date select modal*/}
        <Modal
          visible={isDateModalVisible}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.overlay}>
            <View
              className="w-[90%]  rounded-2xl p-4"
              style={{ backgroundColor: theme.surface }}
            >
              <DateSelect
                onCancel={() => setDateModalVisible(false)}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onConfirm={(date, time) => {
                  setSelectedDate(date);
                  setSelectedTime(time);
                  setDateModalVisible(false);
                }}
              />
            </View>
          </View>
        </Modal>

        {/* time select modal*/}

        <TimePickerModal
          visible={isTimeModalVisible}
          onDismiss={onDismiss}
          onConfirm={handleTimeConfirm}
          hours={12}
          minutes={30}
          label="Select time"
          uppercase={false}
          cancelLabel="Cancel"
          confirmLabel="Ok"
          animationType="fade"
        />

        {/* note select modal  */}
        <Modal
          visible={noteModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setNoteModalVisible(false)}
        >
          {/* OUTSIDE */}
          <Pressable
            style={styles.overlay}
            onPress={() => setNoteModalVisible(false)}
          >
            {/* INSIDE (prevent close) */}
            <Pressable
              onPress={(e) => e.stopPropagation()}
              style={[
                styles.modalContainer,
                { backgroundColor: theme.surface },
              ]}
            >
              <View
                className="flex-col "
                style={{
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                }}
              >
                <View className="flex-row justify-between items-center mb-2 ">
                  <Text
                    className="text-lg font-bold "
                    style={{ color: theme.textPrimary }}
                  >
                    Add Note
                  </Text>
                  <Pressable onPress={() => setNoteModalVisible(false)}>
                    <Text className="text-blue-500 font-semibold">Done</Text>
                  </Pressable>
                </View>

                <TextInput
                  value={note}
                  onChangeText={setNote}
                  placeholder="Enter additional details..."
                  placeholderTextColor={theme.textMuted}
                  multiline
                  textAlignVertical="top"
                  autoFocus={true}
                  className="text-base text-gray-800  p-4 rounded-xl border  "
                  style={{
                    minHeight: 220,
                    maxHeight: 220,
                    borderColor: theme.border,
                    color: theme.textMuted,
                  }}
                />
              </View>
            </Pressable>
          </Pressable>
        </Modal>

        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#555" />
          </TouchableOpacity>

          <Menu
            visible={visibleMenu}
            onDismiss={() => setVisibleMenu(false)}
            contentStyle={{
              backgroundColor: theme.surface,
              borderRadius: 8,
            }}
            anchor={
              <Button onPress={() => setVisibleMenu(!visibleMenu)}>
                <Ionicons name="ellipsis-vertical" size={20} color="#555" />
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                markStatus(Number(id));
              }}
              titleStyle={{ color: theme.textPrimary }}
              title={status === "pending" ? "Mark as Done" : "Mark as Undone"}
            />
            <Menu.Item
              onPress={() => {}}
              titleStyle={{ color: theme.textPrimary }}
              title="Print"
            />
            <Menu.Item
              onPress={() => {}}
              titleStyle={{ color: theme.textPrimary }}
              title="Share"
            />
            <Menu.Item
              onPress={() => {
                handleDelete(Number(id));
              }}
              titleStyle={{ color: theme.error }}
              title="Delete"
            />
          </Menu>
        </View>

        <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            className="text-3xl font-semibold  mb-8"
            style={{ color: theme.textPrimary }}
          />

          <View className="mb-10">
            {/* Priority */}
            <TouchableOpacity
              className="flex-row items-center justify-between py-4 border-b "
              style={{ borderColor: theme.border }}
              onPress={() => setVisiblePriority(true)} // Open menu when row is clicked
            >
              <View className="flex-row items-center">
                <View className="w-10 items-center">
                  <Ionicons
                    name="alert-circle-outline"
                    size={22}
                    color={theme.textPrimary}
                  />
                </View>
                <View className="flex-row items-center">
                  <Text
                    className=" text-base"
                    style={{ color: theme.textPrimary }}
                  >
                    Priority
                  </Text>
                </View>
              </View>
              <View className={` py-1 rounded-md`}>
                <Menu
                  visible={visiblePriority}
                  onDismiss={() => setVisiblePriority(false)}
                  contentStyle={{
                    backgroundColor: theme.surface,
                    borderRadius: 8,
                  }}
                  anchor={
                    <View
                      className="px-3 py-2 rounded-md  flex-row items-center"
                      style={{ backgroundColor: theme.primaryContainer }}
                    >
                      <Text style={{ color: theme.textMuted }}>
                        {PRIORITY_MAP[priority]?.label}
                      </Text>
                      <Ionicons
                        name="chevron-down"
                        size={14}
                        color={theme.textPrimary}
                        style={{ marginLeft: 4 }}
                      />
                    </View>
                  }
                >
                  <Menu.Item
                    titleStyle={{ color: theme.textPrimary }}
                    onPress={() => {
                      setPriority(3);
                      setVisiblePriority(false);
                    }}
                    title="High"
                  />
                  <Menu.Item
                    titleStyle={{ color: theme.textPrimary }}
                    onPress={() => {
                      setPriority(2);
                      setVisiblePriority(false);
                    }}
                    title="Medium"
                  />
                  <Menu.Item
                    titleStyle={{ color: theme.textPrimary }}
                    onPress={() => {
                      setPriority(1);
                      setVisiblePriority(false);
                    }}
                    title="Low"
                  />

                  <Menu.Item
                    titleStyle={{ color: theme.textPrimary }}
                    onPress={() => {
                      setPriority(0);
                      setVisiblePriority(false);
                    }}
                    title="No Priority"
                  />
                </Menu>
              </View>
            </TouchableOpacity>

            {/* Category  */}
            <TouchableOpacity
              className="flex-row items-center justify-between py-4 border-b "
              style={{ borderColor: theme.border }}
            >
              <View className="flex-row items-center">
                <View className="w-10 items-center">
                  <Ionicons
                    name="pricetag-outline"
                    size={22}
                    color={theme.textPrimary}
                  />
                </View>
                <View className="flex-row items-center">
                  <Text
                    className=" text-base"
                    style={{ color: theme.textPrimary }}
                  >
                    Category
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => setCategoryModalVisible(true)}
                className="px-3 py-2 rounded-md "
                style={{ backgroundColor: theme.primaryContainer }}
              >
                <Text style={{ color: theme.textMuted }}>
                  {selectedCategory?.name || "No Category"}
                </Text>
              </Pressable>
            </TouchableOpacity>

            {/* Scheduled Date */}
            <TouchableOpacity
              className="flex-row items-center justify-between py-4 border-b "
              style={{ borderColor: theme.border }}
            >
              <View className="flex-row items-center">
                <View className="w-10 items-center">
                  <Ionicons
                    name="calendar-outline"
                    size={22}
                    color={theme.textPrimary}
                  />
                </View>
                <View className="flex-row items-center">
                  <Text
                    className=" text-base"
                    style={{ color: theme.textPrimary }}
                  >
                    Scheduled Date
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => setDateModalVisible(true)}
                className="px-3 py-2 rounded-md "
                style={{ backgroundColor: theme.primaryContainer }}
              >
                <Text style={{ color: theme.textMuted }}>{selectedDate}</Text>
              </Pressable>
            </TouchableOpacity>

            {/* Time & Reminder */}
            <TouchableOpacity
              className="flex-row items-center justify-between py-4 border-b "
              style={{ borderColor: theme.border }}
            >
              <View className="flex-row items-center">
                <View className="w-10 items-center">
                  <Ionicons
                    name="time-outline"
                    size={22}
                    color={theme.textPrimary}
                  />
                </View>
                <View className="flex-row items-center">
                  <Text
                    className="text-base"
                    style={{ color: theme.textPrimary }}
                  >
                    Time & Reminder
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => setTimeModalVisible(true)}
                className="px-3 py-2 rounded-md "
                style={{ backgroundColor: theme.primaryContainer }}
              >
                <Text style={{ color: theme.textMuted }}>
                  {selectedTime || "add"}
                </Text>
              </Pressable>
            </TouchableOpacity>

            {/* Notes */}
            <TouchableOpacity
              className="flex-row items-center justify-between py-4 border-b "
              style={{ borderColor: theme.border }}
            >
              <View className="flex-row items-center">
                <View className="w-10 items-center">
                  <Ionicons
                    name="document-text-outline"
                    size={22}
                    color={theme.textPrimary}
                  />
                </View>
                <View className="flex-row items-center">
                  <Text
                    className="text-base"
                    style={{ color: theme.textPrimary }}
                  >
                    Notes
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => setNoteModalVisible(true)}
                className="px-3 py-2 rounded-md "
                style={{ backgroundColor: theme.primaryContainer }}
              >
                <Text style={{ color: theme.textMuted }}>
                  {note
                    ? note.length > 20
                      ? `${note.slice(0, 20)}...`
                      : note
                    : "Add note"}
                </Text>
              </Pressable>
            </TouchableOpacity>

            {/* Attachment */}
            <TouchableOpacity
              className="flex-row items-center justify-between py-4 border-b "
              style={{ borderColor: theme.border }}
            >
              <View className="flex-row items-center">
                <View className="w-10 items-center">
                  <Ionicons
                    name="attach-outline"
                    size={22}
                    color={theme.textPrimary}
                  />
                </View>
                <View className="flex-row items-center">
                  <Text
                    className=" text-base"
                    style={{ color: theme.textPrimary }}
                  >
                    Attachment
                  </Text>
                </View>
              </View>
              <View className={`px-3 py-1 rounded-md `}>
                <Text style={{ color: theme.textMuted }}>add</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "75%",
    borderRadius: 20,
    padding: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    width: "48%",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});
