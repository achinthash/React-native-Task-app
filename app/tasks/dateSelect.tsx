import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";

import { TimePickerModal } from "react-native-paper-dates";

import { useTheme } from "@/context/ThemeContext";
import { CalendarList, DateData } from "react-native-calendars";
type Props = {
  selectedDate: string;
  selectedTime: string | null;
  onConfirm: (date: string, time: string | null) => void;
  onCancel: () => void;
};

import { MD3LightTheme, PaperProvider } from "react-native-paper";

export default function DateSelect({
  onConfirm,
  onCancel,
  selectedDate,
  selectedTime,
}: Props) {
  const { theme } = useTheme();

  const paperTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: theme.primary,
      onPrimary: theme.primary,
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
  };

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
      <PaperProvider theme={paperTheme}>
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
          calendarBackground: theme.surface,
          monthTextColor: theme.textPrimary,
          dayTextColor: theme.textPrimary,
          textSectionTitleColor: theme.textMuted,
          textDisabledColor: theme.textMuted,
          arrowColor: theme.primary,
          textDayFontSize: 14,
          textMonthFontSize: 14,
          textMonthFontWeight: "bold",
          todayTextColor: theme.primary,
          selectedDayBackgroundColor: theme.primary,
          selectedDayTextColor: theme.textOnPrimary,
        }}
        markedDates={
          tempDate
            ? {
                [tempDate]: {
                  selected: true,
                  selectedColor: theme.primary,
                  selectedTextColor: theme.textOnPrimary,
                },
              }
            : {}
        }
      />

      <View
        className="flex flex-row p-4 w-full gap-3 flex-wrap "
        style={{ backgroundColor: theme.surface }}
      >
        <Pressable
          onPress={() => setTempDate(today)}
          className="px-3 rounded-md"
          style={{
            backgroundColor:
              tempDate === today ? theme.primary : theme.primaryContainer,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Text
            className="py-3 text-sm px-2 font-medium"
            style={{
              color: tempDate === today ? theme.textPrimary : theme.textMuted,
            }}
          >
            Today
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setTempDate(tomorrow)}
          className="px-3 rounded-md"
          style={{
            backgroundColor:
              tempDate === tomorrow ? theme.primary : theme.primaryContainer,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Text
            className="py-3 text-sm px-2 font-medium"
            style={{
              color:
                tempDate === tomorrow ? theme.textPrimary : theme.textMuted,
            }}
          >
            Tomorrow
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setTempDate(threeDaysLater)}
          className="px-3 rounded-md"
          style={{
            backgroundColor:
              tempDate === threeDaysLater
                ? theme.primary
                : theme.primaryContainer,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Text
            className="py-3 text-sm px-2 font-medium"
            style={{
              color:
                tempDate === threeDaysLater
                  ? theme.textPrimary
                  : theme.textMuted,
            }}
          >
            3 Days Later
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setTempDate(thisSunday)}
          className="px-3 rounded-md"
          style={{
            backgroundColor:
              tempDate === thisSunday ? theme.primary : theme.primaryContainer,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Text
            className="py-3 text-sm px-2 font-medium"
            style={{
              color:
                tempDate === thisSunday ? theme.textPrimary : theme.textMuted,
            }}
          >
            This Sunday
          </Text>
        </Pressable>
      </View>

      <View
        className=" px-4 rounded-xl"
        style={{ backgroundColor: theme.surface }}
      >
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
          <Text
            className=" font-semibold capitalize text-lg"
            style={{ color: theme.textMuted }}
          >
            CANCEL
          </Text>
        </Pressable>
        <Pressable onPress={() => onConfirm(tempDate, tempTime)}>
          <Text
            className=" font-semibold capitalize text-lg"
            style={{ color: theme.textMuted }}
          >
            DONE
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
