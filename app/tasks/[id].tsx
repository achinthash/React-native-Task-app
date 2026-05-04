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

type TaskStatus = "pending" | "completed";

import {
  deleteTask,
  getTaskById,
  updateTask,
  updateTaskStatus,
} from "@/database/tasksService";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
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
import { Button, Menu, PaperProvider } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";

import { SafeAreaView } from "react-native-safe-area-context";
import CategorySelect from "./categorySelect";
import DateSelect from "./dateSelect";

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState<Task | null>(null);
  const [initialTask, setInitialTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

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
        console.log(response);

        if (response) {
          setTitle(response.title);
          setNote(response.note || "");
          setPriority(response.priority);
          setStatus(response.status);
          setSelectedTime(response.time);
          setSelectedDate(response.scheduled_date);

          if (response.category_id) {
            setSelectedCategory({
              id: response.category_id,
              name: response.category_name || "Category",
              icon: response.category_icon || " list",
              color: response.category_color || "#000",
            });
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
  }, [setTimeModalVisible]);

  const handleTimeConfirm = ({ hours, minutes }: any) => {
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    setSelectedTime(formattedTime);
    setTimeModalVisible(false);
  };

  console.log(id);

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
      selectedCategory?.id !== initialTask.category_id;

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
          Number(selectedCategory?.id),
          Number(id),
        );
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
    const newStatus = status === "completed" ? "pending" : "completed";
    setStatus(newStatus);

    try {
      await updateTaskStatus(id, newStatus);
    } catch (error) {
      console.log(error);
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
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
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
            style={styles.modalContainer}
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
          <View style={{}} className="w-[90%] bg-[#fff] rounded-2xl p-4">
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
            style={styles.modalContainer}
          >
            <View className="flex-col">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold text-gray-700">
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
                multiline
                textAlignVertical="top"
                autoFocus={true}
                className="text-base text-gray-800 bg-gray-50 p-4 rounded-xl"
                style={{ minHeight: 220, maxHeight: 220 }}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <PaperProvider>
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#555" />
          </TouchableOpacity>

          <Menu
            visible={visibleMenu}
            onDismiss={() => setVisibleMenu(!visibleMenu)}
            contentStyle={{
              backgroundColor: "white",
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
              titleStyle={{ color: "black" }}
              title={status === "pending" ? "Mark as Done" : "Mark as Undone"}
            />
            <Menu.Item
              onPress={() => {}}
              titleStyle={{ color: "black" }}
              title="Print"
            />
            <Menu.Item
              onPress={() => {}}
              titleStyle={{ color: "black" }}
              title="Share"
            />
            <Menu.Item
              onPress={() => {
                handleDelete(Number(id));
              }}
              titleStyle={{ color: "black" }}
              title="Delete"
            />
          </Menu>
        </View>

        <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            className="text-3xl font-semibold text-gray-800 mb-8"
          />

          <View className="mb-10">
            {/* Priority */}
            <TouchableOpacity
              className="flex-row items-center justify-between py-4 border-b border-gray-100"
              onPress={() => setVisiblePriority(true)} // Open menu when row is clicked
            >
              <View className="flex-row items-center">
                <View className="w-10 items-center">
                  <Ionicons
                    name="alert-circle-outline"
                    size={22}
                    color="#999"
                  />
                </View>
                <View className="flex-row items-center">
                  <Text className="text-gray-500 text-base">Priority</Text>
                </View>
              </View>
              <View className={` py-1 rounded-md`}>
                <Menu
                  visible={visiblePriority}
                  onDismiss={() => setVisiblePriority(!visiblePriority)}
                  contentStyle={{ backgroundColor: "white", borderRadius: 8 }}
                  anchor={
                    <View className="px-3 py-2 rounded-md bg-gray-100 flex-row items-center">
                      <Text className={"text-black"}>
                        {PRIORITY_MAP[priority]?.label}
                      </Text>
                      <Ionicons
                        name="chevron-down"
                        size={14}
                        color="#999"
                        style={{ marginLeft: 4 }}
                      />
                    </View>
                  }
                >
                  <Menu.Item
                    titleStyle={{ color: "black" }}
                    onPress={() => {
                      setPriority(3);
                      setVisiblePriority(false);
                    }}
                    title="High"
                  />
                  <Menu.Item
                    titleStyle={{ color: "black" }}
                    onPress={() => {
                      setPriority(2);
                      setVisiblePriority(false);
                    }}
                    title="Medium"
                  />
                  <Menu.Item
                    titleStyle={{ color: "black" }}
                    onPress={() => {
                      setPriority(1);
                      setVisiblePriority(false);
                    }}
                    title="Low"
                  />

                  <Menu.Item
                    titleStyle={{ color: "black" }}
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
            <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 items-center">
                  <Ionicons name="pricetag-outline" size={22} color="#999" />
                </View>
                <View className="flex-row items-center">
                  <Text className="text-gray-500 text-base">Category</Text>
                </View>
              </View>

              <Pressable
                onPress={() => setCategoryModalVisible(true)}
                className="px-3 py-2 rounded-md bg-gray-100"
              >
                <Text> {selectedCategory?.name || "No Category"}</Text>
              </Pressable>
            </TouchableOpacity>

            {/* Scheduled Date */}
            <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 items-center">
                  <Ionicons name="calendar-outline" size={22} color="#999" />
                </View>
                <View className="flex-row items-center">
                  <Text className="text-gray-500 text-base">
                    Scheduled Date
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => setDateModalVisible(true)}
                className="px-3 py-2 rounded-md bg-gray-100"
              >
                <Text>{selectedDate}</Text>
              </Pressable>
            </TouchableOpacity>

            {/* Time & Reminder */}
            <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 items-center">
                  <Ionicons name="time-outline" size={22} color="#999" />
                </View>
                <View className="flex-row items-center">
                  <Text className="text-gray-500 text-base">
                    Time & Reminder
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => setTimeModalVisible(true)}
                className="px-3 py-2 rounded-md bg-gray-100"
              >
                <Text>{selectedTime || "add"}</Text>
              </Pressable>
            </TouchableOpacity>

            {/* Notes */}
            <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 items-center">
                  <Ionicons
                    name="document-text-outline"
                    size={22}
                    color="#999"
                  />
                </View>
                <View className="flex-row items-center">
                  <Text className="text-gray-500 text-base">Notes</Text>
                </View>
              </View>
              <Pressable
                onPress={() => setNoteModalVisible(true)}
                className="px-3 py-2 rounded-md bg-gray-100"
              >
                <Text>
                  {note
                    ? note.length > 20
                      ? `${note.slice(0, 20)}...`
                      : note
                    : "Add note"}
                </Text>
              </Pressable>
            </TouchableOpacity>

            {/* Attachment */}
            <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 items-center">
                  <Ionicons name="attach-outline" size={22} color="#999" />
                </View>
                <View className="flex-row items-center">
                  <Text className="text-gray-500 text-base">Attachment</Text>
                </View>
              </View>
              <View className={`px-3 py-1 rounded-md `}>
                <Text className={`text-base `}>add</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </PaperProvider>
    </SafeAreaView>
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
    backgroundColor: "#fff",
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
