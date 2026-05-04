import { createTask } from "@/database/tasksService";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { PaperProvider } from "react-native-paper";
import CategorySelect from "./categorySelect";
import DateSelect from "./dateSelect";

type Category = {
  id: number;
  name: string;
  icon: string;
  color: string;
};

type TaskStatus = "pending" | "completed";

export default function NewTasks() {
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [priorityModalVisible, setPriorityModalVisible] = useState(false);

  const [title, setTitle] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [note, setNote] = useState("");
  const [priority, setPriority] = useState<number>(0);
  const [status, setStatus] = useState<TaskStatus>("pending");

  const PRIORITY_MAP: Record<number, { label: string; color: string }> = {
    0: { label: "No Priority", color: "text-black" },
    1: { label: "Low", color: "text-green-500" },
    2: { label: "Medium", color: "text-yellow-600" },
    3: { label: "High", color: "text-red-500" },
  };

  const submitTask = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Title is required");
      return;
    }

    if (!selectedDate) {
      Alert.alert("Validation", "Scheduled date is required");
      return;
    }

    // const parsedDate = new Date(selectedDate);

    // if (selectedDate) {
    //   Alert.alert("Validation", "Invalid date format (use YYYY-MM-DD)");
    //   return;
    // }

    try {
      const response = await createTask(
        title,
        note,
        selectedDate,
        String(selectedTime),
        Number(priority),
        status,
        selectedCategory?.id ?? null,
      );

      if (response.success) {
        Alert.alert("Success", response.message);
        setTitle("");
        setNote("");
        // setPriority("3");
        // setmyDate("");
        // setStatus("pending");

        if (selectedTime) {
          const triggerDate = new Date(`${selectedDate}T${selectedTime}:00`);

          // const showsNote = note.slice(0,20)

          if (triggerDate > new Date()) {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: title,
                body: note ? `${note.slice(0, 20)}...` : "",
              },
              trigger: {
                type: SchedulableTriggerInputTypes.DATE,
                date: triggerDate,
                channelId: "default",
              },
            });
          } else {
            // SCENARIO B: No time selected.
            // Option 1: Schedule for a default "Start of Day" time (e.g., 9:00 AM)
            const defaultTime = "09:00";
            const triggerDate = new Date(`${selectedDate}T${defaultTime}:00`);

            // Only schedule if 9 AM hasn't passed yet for that day
            if (triggerDate > new Date()) {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "Today's Task ",
                  body: title,
                },
                trigger: {
                  type: SchedulableTriggerInputTypes.DATE,
                  date: triggerDate,
                  channelId: "default",
                },
              });
            }
          }
        }
      } else {
        Alert.alert("Error", response.message);

        console.log(response);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <PaperProvider>
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
              // setSelectedTime={setSelectedTime}
              onConfirm={(date, time) => {
                setSelectedDate(date);
                setSelectedTime(time);
                setDateModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>

      {/* category select Modal */}
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

      {/* priority select Modal */}
      <Modal
        visible={priorityModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPriorityModalVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setPriorityModalVisible(false)}
        >
          <View style={styles.modalContainer} className="w-[80%]">
            <Text className="font-bold text-center mb-4 text-xl">
              Select Priority
            </Text>

            {Object.entries(PRIORITY_MAP).map(([key, value]) => (
              <Pressable
                key={key}
                className="py-4 border-b border-gray-100 flex-row justify-between items-center"
                onPress={() => {
                  setPriority(Number(key));
                  setPriorityModalVisible(false);
                }}
              >
                <Text
                  className="text-base font-medium"
                  style={{
                    color:
                      value.color === "text-green-500"
                        ? "#22c55e"
                        : value.color === "text-yellow-600"
                          ? "#ca8a04"
                          : value.color === "text-red-500"
                            ? "#ef4444"
                            : "black",
                  }}
                >
                  {value.label}
                </Text>
                {priority === Number(key) && (
                  <Ionicons name="checkmark" size={20} color="#3b82f6" />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      <View className=" p-2">
        <BottomSheetTextInput
          autoFocus={true}
          placeholder="What's on your mind?"
          multiline={true}
          numberOfLines={5}
          value={title}
          onChangeText={setTitle}
          className="bg-gray-100 border border-gray-300 rounded-lg p-3 text-xl "
          style={{
            minHeight: 70,
            maxHeight: 70,
            fontSize: 16,
            textAlignVertical: "top",
          }}
        />

        <View className="w-full flex-row justify-between items-center mb-2 p-2">
          {/* LEFT SIDE */}
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => setCategoryModalVisible(true)}
              className="px-3 py-2 rounded-md bg-gray-100"
            >
              <Text>{selectedCategory?.name || "No Category"}</Text>
            </Pressable>

            <Pressable
              onPress={() => setDateModalVisible(true)}
              className="p-2 rounded-md bg-gray-100"
            >
              <Ionicons name="calendar-outline" size={20} color="black" />
            </Pressable>

            <Pressable
              onPress={() => setNoteModalVisible(true)}
              className="p-2 rounded-md bg-gray-100"
            >
              <Ionicons name="document-text-outline" size={20} color="black" />
            </Pressable>

            {/* Priority */}
            <Pressable
              onPress={() => setPriorityModalVisible(true)}
              className="px-3 py-2 rounded-md bg-gray-100 flex-row items-center"
            >
              <Text className="text-sm font-medium">
                {PRIORITY_MAP[priority]?.label}
              </Text>
              <Ionicons
                name="chevron-down"
                size={14}
                color="#999"
                style={{ marginLeft: 4 }}
              />
            </Pressable>
          </View>

          {/* RIGHT SIDE */}
          <Pressable
            onPress={submitTask}
            className="p-3.5 rounded-full bg-blue-400 "
          >
            <FontAwesome5
              className="rotate-45"
              name="location-arrow"
              size={16}
              color="white"
            />
          </Pressable>
        </View>
      </View>
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
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
  },
});
