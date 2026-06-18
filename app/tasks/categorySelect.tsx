import { useTheme } from "@/context/ThemeContext";
import { getAllCategories } from "@/database/tasksService";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const { theme } = useTheme();
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
            style={[styles.modalContainer, { backgroundColor: theme.surface }]}
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

      <Text
        className="font-bold text-center mb-4 text-xl"
        style={{ color: theme.textPrimary }}
      >
        Select Category
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid} className="mb-4">
          <TouchableOpacity
            style={[styles.card, { borderColor: theme.border }]}
            onPress={() => {
              setIsNewCategoryModalVisible(true);
            }}
          >
            <Ionicons name="add" size={20} color={theme.textMuted} />
            <Text
              className="ml-2 font-semibold "
              style={{ color: theme.textMuted }}
            >
              New Category
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { borderColor: theme.border }]}
            onPress={() => {
              setSelectedCategory(null);
              onDone();
            }}
          >
            <Ionicons
              name="close-circle-outline"
              size={20}
              color={theme.textMuted}
            />
            <Text
              className="ml-2 font-semibold "
              style={{ color: theme.textMuted }}
            >
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

                  { borderColor: theme.border },
                  isSelected && {
                    borderColor: item.color,
                    backgroundColor: item.color + "20",
                  },
                ]}
              >
                <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon as any} size={18} color="#fff" />
                </View>

                <Text
                  className="text-base font-medium"
                  style={[
                    isSelected && {
                      color: item.color,
                    },
                    { color: theme.textMuted },
                  ]}
                >
                  {item.name}
                </Text>
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
