import NewTasks from "@/app/tasks/newTasks";
import { useTheme } from "@/context/ThemeContext";
import { getTasksCalendar } from "@/database/tasksService";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { router, useFocusEffect } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  ImageBackground,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CalendarList, DateData } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

interface MarkedDate {
  marked?: boolean;
  dotColor?: string;
  selected?: boolean;
  selectedColor?: string;
}

interface MarkedDatesMap {
  [date: string]: MarkedDate;
}

interface GroupedTasks {
  [date: string]: TaskWithCategory[];
}
interface TaskWithCategory {
  id: number;
  title: string;
  note: string | null;
  scheduled_date: string;
  time: string | null;
  priority: number; // Changed from string to number
  status: string;
  category_id: number | null;
  created_at: string;
  updated_at: string;
  category_name: string | null;
  category_icon: string | null;
  category_color: string | null;
}
export default function CalendarScreen() {
  const { theme } = useTheme();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [tasksByDate, setTasksByDate] = useState<GroupedTasks>({});

  // 2. Performance: Fetch tasks for a specific month range
  const loadMonthTasks = async (year: number, month: number) => {
    // Creating range for the specific month
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    const startDate = `${year}-${monthStr}-01`;
    const endDate = `${year}-${monthStr}-31`;

    const tasks = await getTasksCalendar(startDate, endDate);

    // Group tasks by date string
    const grouped: GroupedTasks = tasks.reduce((acc: GroupedTasks, task) => {
      const date = task.scheduled_date;
      if (!acc[date]) acc[date] = [];

      acc[date].push({
        ...task,
        note: task.note ?? "",
        category_name: task.category_name ?? "Uncategorized",
        category_color: task.category_color ?? "#6366f1",
        category_icon: task.category_icon ?? "bookmark-outline",
      });

      return acc;
    }, {});

    // Merge with existing state so user can scroll back/forth smoothly
    setTasksByDate((prev) => ({ ...prev, ...grouped }));
  };

  useFocusEffect(
    useCallback(() => {
      // This runs every time you navigate BACK to this screen
      const now = new Date();
      loadMonthTasks(now.getFullYear(), now.getMonth() + 1);
    }, []),
  );

  // Initial load for current month
  useEffect(() => {}, []);

  // 3. Mark dates on the calendar using TypeScript
  const markedDates = useMemo((): MarkedDatesMap => {
    const marks: MarkedDatesMap = {};

    Object.keys(tasksByDate).forEach((date) => {
      marks[date] = {
        marked: true,
        dotColor: "#6366f1",
      };
    });

    if (selectedDate) {
      marks[selectedDate] = {
        ...(marks[selectedDate] || {}),
        selected: true,
        selectedColor: "#6366f1",
      };
    }

    return marks;
  }, [tasksByDate, selectedDate]);

  const selectedTasks = selectedDate ? tasksByDate[selectedDate] || [] : [];

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Make the top snap point high enough to clear the keyboard
  const snapPoints = useMemo(() => ["60%", "92%"], []);

  // Manually snap UP when keyboard opens, restore when it closes
  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onShow = () => bottomSheetModalRef.current?.snapToIndex(1);
    const onHide = () => bottomSheetModalRef.current?.snapToIndex(0);

    const showSub = Keyboard.addListener(showEvent, onShow);
    const hideSub = Keyboard.addListener(hideEvent, onHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.4}
      />
    ),
    [],
  );

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const taskDetails = async (id: number) => {
    router.push(`/tasks/${id}`);
  };

  const content = (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/*Floating new task button  */}
      <View className="z-10 right-6  bottom-6 absolute">
        <Pressable
          className="rounded-full bg-blue-500 p-5"
          onPress={handlePresentModalPress}
        >
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
      </View>

      {/* New task View BottomSheet  */}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        // ↓ remove keyboardBehavior entirely — we handle it manually above
        keyboardBlurBehavior="restore"
        backgroundStyle={{ backgroundColor: "#ffffff" }}
        enablePanDownToClose={false} // ← disable swipe to close
        enableHandlePanningGesture={false} // ← disable dragging the handle
        enableContentPanningGesture={false} // ← disable dragging the content
      >
        <BottomSheetScrollView
          contentContainerStyle={{ padding: 10 }}
          keyboardShouldPersistTaps="handled"
        >
          <NewTasks />
        </BottomSheetScrollView>
      </BottomSheetModal>

      <View style={styles.container}>
        <CalendarList
          horizontal
          pagingEnabled
          onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
          // 4. Performance: Triggered when user swiped to a new month
          onVisibleMonthsChange={(months) => {
            if (months.length > 0) {
              loadMonthTasks(months[0].year, months[0].month);
            }
          }}
          style={{
            backgroundColor: "transparent",
          }}
          markedDates={markedDates}
          theme={{
            calendarBackground: "transparent",
            textDayFontSize: 14,
            textMonthFontSize: 14,
            textMonthFontWeight: "bold",
            todayTextColor: "#ff0000",
            selectedDayBackgroundColor: "#6366f1",
            selectedDayTextColor: "#ffffff",
            textDayHeaderFontSize: 12,

            //  calendarBackground: "transparent",

            //  DAY NAMES (Mon, Tue, ...)
            textSectionTitleColor: "#2563EB",

            //  MONTH TITLE (May 2026)
            monthTextColor: "#1E293B",

            // textMonthFontSize: 16,
            // textMonthFontWeight: "bold",

            //  DAYS (1,2,3...)
            dayTextColor: "#334155",

            //  TODAY
            // todayTextColor: "#EF4444",

            //  SELECTED DAY
            // selectedDayBackgroundColor: "#6366f1",
            // selectedDayTextColor: "#ffffff",

            //  Disabled days (prev/next month)
            textDisabledColor: "#cbd5e1",
          }}
        />

        <View style={styles.taskContainer}>
          <Text style={styles.heading}>{selectedDate || "Select a date"}</Text>

          {selectedTasks.length === 0 ? (
            <Text style={styles.empty}>No tasks</Text>
          ) : (
            <FlatList
              data={selectedTasks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => taskDetails(item.id)}
                  style={[
                    item.status === "completed"
                      ? styles.completedCard
                      : styles.card,
                    { borderLeftColor: item.category_color || "#6366f1" },
                  ]}
                >
                  <View style={styles.cardHeader}>
                    <Text
                      style={[
                        styles.taskTitle,
                        item.status === "completed" && styles.completedText,
                      ]}
                    >
                      {item.title}
                    </Text>

                    <Text style={styles.taskTime}>{item.time}</Text>
                  </View>
                  {item.note ? (
                    <Text
                      style={[
                        item.status === "completed"
                          ? styles.completedNote
                          : styles.note,
                      ]}
                    >
                      {item.note ? `${item.note.slice(0, 20)}...` : " "}
                    </Text>
                  ) : null}

                  <View style={styles.metaRow}>
                    {/* LEFT SIDE */}
                    <View
                      style={{ backgroundColor: `${item.category_color}15` }}
                      className="flex-row items-center px-2.5 py-1 rounded-full "
                    >
                      <Ionicons
                        name={item.category_icon as any}
                        size={12}
                        color={item.category_color as any}
                      />
                      <Text
                        style={{ color: item.category_color as any }}
                        className="text-[10px] font-bold ml-1 uppercase tracking-tight"
                      >
                        {item.category_name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );

  if (!theme.backgroundImage) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        {content}
      </View>
    );
  }

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={theme.backgroundImage}
      resizeMode={theme.category === "texture" ? "repeat" : "cover"}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
        }}
      >
        {content}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }, //backgroundColor: "#f8fafc"
  taskContainer: { flex: 1, padding: 16 },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1e293b",
  },
  empty: { color: "#94a3b8", textAlign: "center", marginTop: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    // Shadow for iOS/Android
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  completedCard: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    // Shadow for iOS/Android
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  taskTitle: { fontSize: 15, fontWeight: "600", color: "#334155" },
  completedText: { textDecorationLine: "line-through", color: "#cbd5e1" },
  taskTime: { fontSize: 12, color: "#64748b" },
  note: { fontSize: 13, color: "#64748b", marginBottom: 6 },
  completedNote: {
    fontSize: 13,
    textDecorationLine: "line-through",
    color: "#cbd5e1",
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: "#94a3b8",
    textTransform: "uppercase",
  },
  metaRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
