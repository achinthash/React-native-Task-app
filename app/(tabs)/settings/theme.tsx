import {
  AppThemeName,
  ColorName,
  SceneryName,
  TextureName,
  useTheme,
} from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const COLOR_SIZE = width / 5;
const TEXTURE_SIZE = (width - 56) / 4;
const SCENERY_WIDTH = (width - 40) / 2;

export default function ThemeScreen() {
  const { theme, colors, textures, sceneries, activeTheme, setActiveTheme } =
    useTheme();

  const renderCheck = (isSelected: boolean) =>
    isSelected ? (
      <View style={styles.checkBadge}>
        <Ionicons name="checkmark" size={18} color="#FFF" />
      </View>
    ) : null;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Pure Color
        </Text>
        <View style={styles.colorGrid}>
          {Object.entries(colors).map(([key, item]) => {
            const themeKey = key as ColorName;
            const isSelected = activeTheme === themeKey;

            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.85}
                onPress={() => setActiveTheme(themeKey)}
                style={[
                  styles.colorSquare,
                  { backgroundColor: item.accent },
                  isSelected && styles.selectedTile,
                ]}
              >
                {renderCheck(isSelected)}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Texture
        </Text>
        <View style={styles.textureGrid}>
          {Object.entries(textures).map(([key, item]) => {
            const textureKey = key as TextureName;
            const isSelected = activeTheme === textureKey;

            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.85}
                onPress={() => setActiveTheme(textureKey)}
                style={[styles.textureTile, isSelected && styles.selectedTile]}
              >
                <Image
                  source={item.backgroundImage}
                  style={styles.tileImage}
                  resizeMode="cover"
                />
                <View style={styles.imageScrim} />
                {renderCheck(isSelected)}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Scenery
        </Text>
        <View style={styles.sceneryGrid}>
          {Object.entries(sceneries).map(([key, item]) => {
            const sceneryKey = key as SceneryName;
            const isSelected = activeTheme === sceneryKey;

            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.85}
                onPress={() => setActiveTheme(sceneryKey as AppThemeName)}
                style={[styles.sceneryCard, isSelected && styles.selectedTile]}
              >
                <Image
                  source={item.backgroundImage}
                  style={styles.tileImage}
                  resizeMode="cover"
                />
                <View style={styles.imageScrim} />
                <Text style={styles.sceneryTitle}>{item.name}</Text>
                {renderCheck(isSelected)}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginTop: 18,
  },
  subtitle: {
    fontSize: 14,
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  colorSquare: {
    width: COLOR_SIZE,
    height: COLOR_SIZE,
    margin: 4,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  textureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
  },
  textureTile: {
    width: TEXTURE_SIZE,
    height: TEXTURE_SIZE,
    margin: 4,
    borderRadius: 14,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  sceneryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
  },
  sceneryCard: {
    width: SCENERY_WIDTH,
    height: 110,
    margin: 4,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: "#E8F4F8",
  },
  selectedTile: {
    borderWidth: 3,
    borderColor: "#FFFFFF",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
  tileImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  imageScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },
  checkBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    borderWidth: 1,
    borderColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  sceneryTitle: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
