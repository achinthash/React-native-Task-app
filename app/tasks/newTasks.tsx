import { useTheme } from "@/context/ThemeContext";
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
  const { theme } = useTheme();
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
          <View
            // style={{ backgroundColor: "#000000" }}
            className="w-[90%]   rounded-2xl p-4"
            style={{
              backgroundColor: theme.surface,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
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
            style={[
              styles.modalContainer,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
                borderWidth: 1,
              },
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
              { backgroundColor: theme.surface, width: "90%" },
            ]}
          >
            <View className="flex-col">
              <View className="flex-row justify-between items-center mb-2">
                <Text
                  style={{
                    color: theme.text,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Add Note
                </Text>
                <Pressable onPress={() => setNoteModalVisible(false)}>
                  <Text style={{ color: theme.primary, fontWeight: "600" }}>
                    Done
                  </Text>
                </Pressable>
              </View>

              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="Enter additional details..."
                multiline
                textAlignVertical="top"
                autoFocus={true}
                style={{
                  minHeight: 220,
                  maxHeight: 220,
                  backgroundColor: theme.surfaceSecondary,
                  color: theme.text,
                  fontSize: 16,
                }}
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
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: theme.surface, width: "80%" },
            ]}
          >
            <Text
              style={{
                color: theme.text,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 16,
                fontSize: 20,
              }}
            >
              Select Priority
            </Text>

            {Object.entries(PRIORITY_MAP).map(([key, value]) => {
              // Dynamic priority coloring based on theme if possible, or standard status colors
              const getPriorityColor = () => {
                if (value.label.toLowerCase().includes("high"))
                  return theme.danger;
                if (value.label.toLowerCase().includes("med"))
                  return theme.warning;
                return theme.success;
              };

              return (
                <Pressable
                  key={key}
                  className="py-4 flex-row justify-between items-center"
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                  }}
                  onPress={() => {
                    setPriority(Number(key));
                    setPriorityModalVisible(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: getPriorityColor(),
                    }}
                  >
                    {value.label}
                  </Text>
                  {priority === Number(key) && (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color={theme.primary}
                    />
                  )}
                </Pressable>
              );
            })}
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
          className="  rounded-lg p-3  "
          style={{
            minHeight: 70,
            maxHeight: 70,
            fontSize: 16,
            textAlignVertical: "top",
            backgroundColor: theme.surfaceSecondary,
            color: theme.text,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        />

        <View className="w-full flex-row justify-between items-center mb-2 p-2">
          {/* LEFT SIDE */}
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => setCategoryModalVisible(true)}
              className="px-3 py-2 rounded-md "
              style={{
                backgroundColor: theme.primarySoft,
              }}
            >
              <Text
                style={{
                  color: theme.primaryDark,
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                {selectedCategory?.name || "No Category"}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setDateModalVisible(true)}
              className="p-2 rounded-xl"
              style={{ backgroundColor: theme.primarySoft }}
            >
              <Ionicons name="calendar" size={18} color={theme.primaryDark} />
            </Pressable>

            <Pressable
              onPress={() => setNoteModalVisible(true)}
              className="p-2 rounded-md "
              style={{ backgroundColor: theme.primarySoft }}
            >
              <Ionicons
                name="document-text-outline"
                size={18}
                color={theme.primaryDark}
              />
            </Pressable>

            {/* Priority */}
            <Pressable
              onPress={() => setPriorityModalVisible(true)}
              className="px-3 py-2 rounded-md  flex-row items-center"
              style={{ backgroundColor: theme.primarySoft }}
            >
              <Text
                style={{
                  color: theme.primaryDark,
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                {PRIORITY_MAP[priority]?.label}
              </Text>
            </Pressable>
          </View>

          {/* RIGHT SIDE */}
          <Pressable
            onPress={submitTask}
            className="p-3.5 rounded-full  "
            style={{ backgroundColor: theme.primary }}
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
