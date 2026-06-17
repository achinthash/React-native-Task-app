import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AddCategoryScreen from "@/app/tasks/AddCategoryScreen";
import EditCategory from "@/app/tasks/EditCategory";
import { useTheme } from "@/context/ThemeContext";
import { deleteCategory, getAllCategories } from "@/database/tasksService";
import { ActivityIndicator } from "react-native";

type Category = {
  id: number;
  name: string;
  icon: string;
  color: string;
};

export default function CategoriesScreen() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] =
    useState(false);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categories, setCategories] = useState<Category[]>([]);

  // loadCategories
  const loadCategories = async () => {
    try {
      setIsLoading(true);

      const response = await getAllCategories();
      setCategories(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // delete category
  const handleDelete = (id: number) => {
    Alert.alert(
      "Delete category",
      "Are you sure want to Delete this category! this action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteSelectedCategory(id),
          style: "destructive",
        },
      ],
    );
  };
  const deleteSelectedCategory = async (id: number) => {
    try {
      const response = await deleteCategory(id);

      if (response.success) {
        loadCategories();
      } else {
        Alert.alert("Error", "Failed to delete category");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong while deleting category");
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="teal" />
      </View>
    );
  }

  const content = (
    <View style={{ flex: 1, padding: 16 }}>
      {/* HEADER BUTTON */}
      <TouchableOpacity
        onPress={() => setIsNewCategoryModalVisible(true)}
        style={{
          backgroundColor: theme.primaryContainer,
          padding: 12,
          borderRadius: 10,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: theme.textPrimary, fontWeight: "600" }}>
          + Add Category
        </Text>
      </TouchableOpacity>

      {/* new category modal*/}
      <Modal
        visible={isNewCategoryModalVisible}
        transparent={true}
        // animationType="fade"
        onRequestClose={() => setIsNewCategoryModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            style={{ backgroundColor: theme.surface }}
            className=" m-5 p-4 rounded-3xl items-center shadow-xl w-[90%] max-h-[90%]"
          >
            <AddCategoryScreen
              onCancel={() => setIsNewCategoryModalVisible(false)}
              onDone={() => {
                setIsNewCategoryModalVisible(false);
                loadCategories();
              }}
            />
          </View>
        </View>
      </Modal>

      {/* edit category modal*/}
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        // animationType="fade"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            style={{ backgroundColor: theme.surface }}
            className=" m-5 p-4 rounded-3xl items-center shadow-xl w-[90%] max-h-[90%]"
          >
            {selectedCategory && (
              <EditCategory
                category={selectedCategory}
                onCancel={() => {
                  setIsEditModalVisible(false);
                  setSelectedCategory(null);
                }}
                onDone={() => {
                  setIsEditModalVisible(false);
                  setSelectedCategory(null);
                  loadCategories();
                }}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* LIST */}
      <FlatList
        refreshing={isLoading}
        onRefresh={loadCategories}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
            }}
          >
            {/* LEFT */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: item.color,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                <Ionicons name={item.icon as any} size={16} color="#fff" />
              </View>

              <Text style={{ fontSize: 15, color: theme.textMuted }}>
                {item.name}
              </Text>
            </View>

            {/* RIGHT ACTIONS */}
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory(item);
                  setIsEditModalVisible(true);
                }}
              >
                <Ionicons
                  name="create-outline"
                  size={20}
                  color={theme.textMuted}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={20} color={theme.error} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
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
      resizeMode={"cover"}
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
