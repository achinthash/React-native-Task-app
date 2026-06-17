const { width } = Dimensions.get("window");
const COLOR_SIZE = width / 5;
const TEXTURE_SIZE = (width - 56) / 4;
const SCENERY_WIDTH = (width - 40) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },

  colorSquare: {
    width: COLOR_SIZE,
    height: COLOR_SIZE,
    margin: 4,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
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
  selectedCard: {
    borderWidth: 3,
    borderColor: "#FFFFFF",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
});

import { ThemeName, themes, useTheme } from "@/context/ThemeContext";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MainScreen() {
  const { theme, activeTheme, setActiveTheme } = useTheme();

  const isActive = (name: ThemeName) => activeTheme === name;

  // colors
  const colorThemes = (Object.keys(themes) as ThemeName[]).filter(
    (name) => !themes[name].backgroundImage,
  );

  // background images
  const imageThemes = (Object.keys(themes) as ThemeName[]).filter(
    (name) => themes[name].backgroundImage,
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          {" "}
          Pure Color{" "}
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {colorThemes.map((themeName) => {
            const item = themes[themeName];
            const selected = isActive(themeName);
            return (
              <View key={themeName} style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => setActiveTheme(themeName)}
                  style={[
                    styles.colorSquare,
                    { backgroundColor: item.accent },
                    selected && styles.selectedCard,
                  ]}
                />
              </View>
            );
          })}
        </View>

        {/* Background Image Themes */}
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          {" "}
          Scenery{" "}
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {imageThemes.map((themeName) => {
            const item = themes[themeName];
            const selected = isActive(themeName);

            return (
              <View key={themeName} style={{ alignItems: "center" }}>
                <TouchableOpacity onPress={() => setActiveTheme(themeName)}>
                  <ImageBackground
                    source={item.backgroundImage}
                    style={[
                      styles.sceneryCard,
                      selected && styles.selectedCard,
                    ]}
                    imageStyle={{ borderRadius: 16 }}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
