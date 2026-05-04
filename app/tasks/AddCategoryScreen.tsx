import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { createCategory } from "@/database/tasksService";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { useState } from "react";

export default function AddCategoryScreen({ onDone, onCancel }: any) {
  type IconName = ComponentProps<typeof Ionicons>["name"];
  const ICONSNAMES: IconName[] = [
    "briefcase",
    "person",
    "cart",
    "fitness",
    "book",
    "school",
    "home",
    "airplane",
    "heart",
    "wallet",
    "game-controller",
    "restaurant",
  ];

  const COLORS: string[] = [
    "#3B82F6", // Blue 500
    "#8B5CF6", // Violet 500
    "#10B981", // Emerald 500
    "#F59E0B", // Amber 500
    "#EF4444", // Red 500
    "#14B8A6", // Teal 500
    "#6366F1", // Indigo 500
    "#EC4899", // Pink 500
    "#F97316", // Orange 500
    "#06B6D4", // Cyan 500
    "#84CC16", // Lime 500
    "#64748B", // Slate 500
  ];

  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState(ICONSNAMES[0]);

  const iconRows = [];
  for (let i = 0; i < ICONSNAMES.length; i += 2) {
    iconRows.push(ICONSNAMES.slice(i, i + 2));
  }

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Please enter a category name");
      return;
    }

    try {
      const response = await createCategory(
        name.trim(),
        selectedIcon,
        selectedColor,
      );

      if (response.success) {
        onDone?.();
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while saving category");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="">
      <Text className="mb-1 font-bold text-center  text-[24px]">
        Create Category
      </Text>

      <Text className="text-base font-semibold mt-4 mb-1 color-[#374151]">
        Category Name
      </Text>
      <TextInput
        className="border border-[#E5E7EB] rounded-xl p-4 text-base "
        value={name}
        onChangeText={setName}
        placeholder="e.g. Study, Work"
        placeholderTextColor="#9CA3AF"
      />

      {/* Choose Icon */}
      <Text className="text-base font-semibold mt-4 mb-1 color-[#374151]">
        Choose Icon
      </Text>

      <ScrollView
        className=""
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
      >
        {iconRows.map((pair, index) => (
          <View key={index}>
            {pair.map((icon) => {
              const selected = selectedIcon === icon;

              return (
                <TouchableOpacity
                  className="m-1 "
                  key={icon}
                  onPress={() => setSelectedIcon(icon)}
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    backgroundColor: selected ? "#3B82F6" : "#E5E7EB",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons
                    name={icon as any}
                    size={20}
                    color={selected ? "#fff" : "#374151"}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/*  Choose Color */}
      <Text className="text-base font-semibold mt-4 mb-1 color-[#374151]">
        Choose Color
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 8 }}
      >
        {COLORS.map((color) => {
          const isSelected = selectedColor === color;

          return (
            <TouchableOpacity
              key={color}
              onPress={() => setSelectedColor(color)}
              style={{
                width: 42,
                height: 42,
                borderRadius: 999,
                marginRight: 10,
                backgroundColor: color,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#111",
                transform: [{ scale: isSelected ? 1.1 : 1 }],
              }}
            >
              {isSelected && (
                <Ionicons name="checkmark-sharp" size={16} color="white" />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* PREVIEW */}
      <Text className="text-base font-semibold mt-4 mb-1 color-[#374151]">
        Preview
      </Text>

      <View
        className="mt-[10px] p-[14px] rounded-xl flex-row gap-[10px] items-center "
        style={{ borderWidth: 2, borderColor: selectedColor }}
      >
        <Ionicons name={selectedIcon} size={22} color={selectedColor} />
        <Text
          className="text-lg font-semibold"
          style={[{ color: selectedColor }]}
        >
          {name || "Category Name"}
        </Text>
      </View>

      <View className="flex flex-row gap-4 items-end justify-end  mt-4 p-2">
        <Pressable onPress={onCancel}>
          <Text className="text-blue-400 font-semibold capitalize text-lg">
            CANCEL
          </Text>
        </Pressable>
        <Pressable onPress={handleSave}>
          <Text className="text-blue-400 font-semibold capitalize text-lg">
            DONE
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
