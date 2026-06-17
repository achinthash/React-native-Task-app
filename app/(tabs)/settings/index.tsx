import { useTheme } from "@/context/ThemeContext";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import React from "react";

export default function Settings() {
  const { theme } = useTheme();
  const sectionTextStyle = [styles.sectionText, { color: theme.textPrimary }];
  const cardStyle = [styles.card, { backgroundColor: theme.surface }];
  const iconBoxStyle = [
    styles.iconBox,
    { backgroundColor: theme.primaryContainer, borderColor: theme.border },
  ];
  const itemTextStyle = [styles.itemText, { color: theme.textMuted }];
  const iconColor = theme.accent;
  const chevronColor = theme.textMuted;

  const content = (
    <ScrollView
      style={{
        backgroundColor: theme.backgroundImage
          ? "transparent"
          : theme.background,
      }}
    >
      <Text style={sectionTextStyle}> GENERAL </Text>

      <View style={cardStyle}>
        <TouchableOpacity className="flex-row items-center justify-between p-4    ">
          <View className="flex-row items-center gap-4">
            <View style={iconBoxStyle}>
              <MaterialIcons
                name="account-circle"
                size={22}
                color={iconColor}
              />
            </View>
            <Text style={itemTextStyle}>Account</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color={chevronColor} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4    ">
          <View className="flex-row items-center gap-4">
            <View style={iconBoxStyle}>
              <MaterialIcons name="notifications" size={22} color={iconColor} />
            </View>
            <Text style={itemTextStyle}>Notification</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color={chevronColor} />
        </TouchableOpacity>
      </View>

      <Text style={sectionTextStyle}> APP </Text>

      <View style={cardStyle}>
        <TouchableOpacity className="flex-row items-center justify-between p-4    ">
          <View className="flex-row items-center gap-4">
            <View style={iconBoxStyle}>
              <MaterialIcons name="schedule" size={22} color={iconColor} />
            </View>
            <Text style={itemTextStyle}>Schedule View</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color={chevronColor} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/settings/categories")}
          className="flex-row items-center justify-between p-4    "
        >
          <View className="flex-row items-center gap-4">
            <View style={iconBoxStyle}>
              <MaterialIcons name="label" size={22} color={iconColor} />
            </View>
            <Text style={itemTextStyle}>Categories</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color={chevronColor} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/settings/theme")}
          className="flex-row items-center justify-between p-4    "
        >
          <View className="flex-row items-center gap-4">
            <View style={iconBoxStyle}>
              <MaterialIcons name="palette" size={22} color={iconColor} />
            </View>
            <Text style={itemTextStyle}>Theme</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color={chevronColor} />
        </TouchableOpacity>
      </View>

      <Text style={sectionTextStyle}> ABOUT </Text>

      <View style={cardStyle}>
        <TouchableOpacity
          onPress={() => router.push("/settings/about")}
          className="flex-row items-center justify-between p-4    "
        >
          <View className="flex-row items-center gap-4">
            <View style={iconBoxStyle}>
              <MaterialIcons name="info" size={22} color={iconColor} />
            </View>
            <Text style={itemTextStyle}>About App</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color={chevronColor} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/settings/support")}
          className="flex-row items-center justify-between p-4    "
        >
          <View className="flex-row items-center gap-4">
            <View style={iconBoxStyle}>
              <MaterialIcons name="support" size={22} color={iconColor} />
            </View>
            <Text style={itemTextStyle}>Help & Support</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color={chevronColor} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  if (!theme.backgroundImage) {
    return <View style={{ flex: 1 }}>{content}</View>;
  }

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={theme.backgroundImage}
    >
      <View style={styles.overlay}>{content}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  sectionText: {
    fontSize: 16,
    margin: 16,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
  },
  itemText: {
    fontSize: 18,
  },
});
