import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getAllCategories } from "@/database/tasksService";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import AddCategoryScreen from "./AddCategoryScreen";

type Category = {
  id: number;
  name: string;
  icon: string;
  color: string;
};

export default function CategorySelect({
  onDone,
  selectedCategory,
  setSelectedCategory,
}: any) {
  const [cateories, setCategories] = useState<Category[]>([]);
  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] =
    useState(false);

  const loadCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <View>
      {/* new category modal*/}
      <Modal
        visible={isNewCategoryModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsNewCategoryModalVisible(false)}
      >
        {/* OUTSIDE */}
        <Pressable
          style={styles.overlay}
          onPress={() => setIsNewCategoryModalVisible(false)}
        >
          {/* INSIDE (prevent close) */}
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={styles.modalContainer}
          >
            <AddCategoryScreen
              onCancel={() => setIsNewCategoryModalVisible(false)}
              onDone={() => {
                setIsNewCategoryModalVisible(false);
                loadCategories();
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>

      <Text className="font-bold text-center mb-4 text-xl">
        Select Category
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid} className="mb-4">
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setIsNewCategoryModalVisible(true);
            }}
          >
            <Ionicons name="add" size={20} color="#000" />
            <Text className="ml-2 font-semibold text-[#374151]">
              New Category
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setSelectedCategory(null);
              onDone();
            }}
          >
            <Ionicons name="close-circle-outline" size={20} color="#6b7280" />
            <Text className="ml-2 font-semibold text-[#374151]">
              No Category
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {cateories.map((item) => {
            const isSelected = selectedCategory?.id === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setSelectedCategory(item);
                  onDone();
                }}
                style={[
                  styles.card,
                  isSelected && {
                    borderColor: item.color,
                    backgroundColor: item.color + "20",
                  },
                ]}
              >
                <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon as any} size={18} color="#fff" />
                </View>

                <Text className="text-base font-medium">{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
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
