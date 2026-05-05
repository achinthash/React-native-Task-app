import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";

import { PaperProvider } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";

import { CalendarList, DateData } from "react-native-calendars";

type Props = {
  selectedDate: string;
  selectedTime: string | null;
  onConfirm: (date: string, time: string | null) => void;
  onCancel: () => void;
};

export default function DateSelect({
  onConfirm,
  onCancel,
  selectedDate,
  selectedTime,
}: Props) {
  const { width: screenWidth } = useWindowDimensions();

  const CALENDAR_WIDTH = useMemo(() => screenWidth - 60, [screenWidth]);

  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState(
    selectedDate || new Date().toISOString().split("T")[0],
  );
  const [tempTime, setTempTime] = useState<string | null>(selectedTime);

  const onDismiss = useCallback(() => {
    setTimeModalVisible(false);
  }, [setTimeModalVisible]);

  const handleTimeConfirm = ({ hours, minutes }: any) => {
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    setTempTime(formattedTime);
    console.log({ hours, minutes }); // d
    setTimeModalVisible(false);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const now = new Date();

  // Today
  const today = formatDate(now);

  // Inside your DateSelect component
  // useEffect(() => {
  //   setTempDate(selectedDate || today);
  //   setTempTime(selectedTime);
  // }, [selectedDate, selectedTime]);

  useEffect(() => {
    setTempDate(selectedDate || new Date().toISOString().split("T")[0]);
    setTempTime(selectedTime);
  }, [selectedDate, selectedTime]);

  // Tomorrow
  const tomorrowObj = new Date();
  tomorrowObj.setDate(now.getDate() + 1);
  const tomorrow = formatDate(tomorrowObj);

  // 3 Days Later
  const threeDaysObj = new Date();
  threeDaysObj.setDate(now.getDate() + 3);
  const threeDaysLater = formatDate(threeDaysObj);

  // This Sunday
  const sundayObj = new Date();
  const daysUntilSunday = 7 - now.getDay();
  sundayObj.setDate(
    now.getDate() + (daysUntilSunday === 0 ? 7 : daysUntilSunday),
  );
  const thisSunday = formatDate(sundayObj);

  return (
    <View>
      {/* theme={customTheme} */}
      <PaperProvider>
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
      </PaperProvider>

      <CalendarList
        horizontal={true}
        pagingEnabled={true}
        calendarWidth={CALENDAR_WIDTH} // Matches container for perfect snapping
        hideArrows={false}
        hideExtraDays={false}
        scrollEnabled={true}
        showScrollIndicator={false}
        // This ensures only one month is visible at a time
        staticHeader={true}
        onDayPress={(day: DateData) => setTempDate(day.dateString)}
        theme={{
          calendarBackground: "#ffffff",
          textDayFontSize: 14,
          textMonthFontSize: 14,
          textMonthFontWeight: "bold",
          todayTextColor: "#ff0000",
          selectedDayBackgroundColor: "#4A90E2",
          selectedDayTextColor: "#ffffff",
        }}
        markedDates={
          tempDate
            ? {
                [tempDate]: {
                  selected: true,
                  selectedColor: "#4A90E2",
                  selectedTextColor: "#ffffff",
                },
              }
            : {}
        }
      />

      {/* <CalendarList
        horizontal={true}
        pagingEnabled
        // calendarWidth={screenWidth}
        // calendarHeight={300}
        hideArrows={false}
        hideExtraDays={false}
        scrollEnabled={true}
        showScrollIndicator={false}
        calendarWidth={300}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        // Theme Styling
        theme={{
          calendarBackground: "#ffffff",
          textDayFontSize: 14,
          textDayFontWeight: "400",
          textDayFontFamily: "System",
          textMonthFontSize: 14,
          textMonthFontWeight: "bold",
          textDayHeaderFontSize: 12,
          textDayHeaderFontWeight: "600",
          dayTextColor: "#2d4150",
          monthTextColor: "#000000",
          textSectionTitleColor: "#b6c1cd",
          todayTextColor: "#ff0000",
          selectedDayBackgroundColor: "#4A90E2",
          selectedDayTextColor: "#ffffff",
          //   dotColor: "orange",
          //   selectedDotColor: "#ffffff",
        }}
        // Marks the selected date
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: "#4A90E2",
            selectedTextColor: "#ffffff",
            // dotColor: "orange",
            // marked: true,
          },
        }}
      /> */}

      <View className="flex flex-row p-4 w-full gap-3 flex-wrap ">
        <Pressable
          onPress={() => setTempDate(today)}
          className={`px-3 rounded-md  text-white ${tempDate === today ? "bg-blue-400" : "bg-gray-200"} `}
        >
          <Text
            className={` py-3 text-sm px-2 ${tempDate === today ? "text-white" : "text-gray-500"} `}
          >
            Today
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setTempDate(tomorrow)}
          className={`px-3 rounded-md  text-white ${tempDate === tomorrow ? "bg-blue-400" : "bg-gray-200"} `}
        >
          <Text
            className={` py-3 text-sm px-2 ${tempDate === tomorrow ? "text-white" : "text-gray-500"} `}
          >
            Tomorrow
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setTempDate(threeDaysLater)}
          className={`px-3 rounded-md  text-white ${tempDate === threeDaysLater ? "bg-blue-400" : "bg-gray-200"} `}
        >
          <Text
            className={` py-3 text-sm px-2 ${tempDate === threeDaysLater ? "text-white" : "text-gray-500"} `}
          >
            3 Days Later
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setTempDate(thisSunday)}
          className={`px-3 rounded-md  text-white ${tempDate === thisSunday ? "bg-blue-400" : "bg-gray-200"} `}
        >
          <Text
            className={` py-3 text-sm px-2 ${tempDate === thisSunday ? "text-white" : "text-gray-500"} `}
          >
            This Sunday
          </Text>
        </Pressable>
      </View>

      <View className="bg-white px-4 rounded-xl">
        {/* Time */}

        <Pressable
          onPress={() => setTimeModalVisible(true)}
          className="flex-row items-center justify-between py-3 border-b border-gray-200"
        >
          <View className="flex-row items-center gap-3">
            <Feather name="clock" size={18} color="#6b7280" />
            <Text className="text-gray-600 text-base">Time</Text>
          </View>
          <Text className="text-gray-400 text-base">{tempTime || "No"}</Text>
        </Pressable>

        {/* Reminder */}
        <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
          <View className="flex-row items-center gap-3">
            <MaterialIcons
              name="notifications-none"
              size={18}
              color="#6b7280"
            />
            <Text className="text-gray-600 text-base">Reminder</Text>
          </View>
          <Text className="text-gray-400 text-base">05:22</Text>
        </View>

        {/* Repeat */}
        <View className="flex-row items-center justify-between py-3">
          <View className="flex-row items-center gap-3">
            <Feather name="repeat" size={18} color="#6b7280" />
            <Text className="text-gray-600 text-base">Repeat</Text>
          </View>
          <Text className="text-gray-400 text-base">No</Text>
        </View>
      </View>

      <View className="flex flex-row gap-4 items-end justify-end  mt-4 p-2">
        <Pressable onPress={onCancel}>
          <Text className="text-blue-400 font-semibold capitalize text-lg">
            CANCEL
          </Text>
        </Pressable>
        <Pressable onPress={() => onConfirm(tempDate, tempTime)}>
          <Text className="text-blue-400 font-semibold capitalize text-lg">
            DONE
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
