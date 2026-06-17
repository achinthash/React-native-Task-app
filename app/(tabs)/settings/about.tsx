import { useTheme } from "@/context/ThemeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AboutScreen() {
  const { theme } = useTheme();

  const cardStyle = [
    styles.card,
    { backgroundColor: theme.surface, borderColor: theme.border },
  ];
  const itemTextStyle = [styles.itemText, { color: theme.textPrimary }];
  const subtitleTextStyle = [styles.subtitleText, { color: theme.textMuted }];

  const content = (
    <ScrollView
      style={{
        backgroundColor: theme.backgroundImage
          ? "transparent"
          : theme.background,
      }}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Branding Header Area */}
      <View style={styles.brandContainer}>
        <View
          style={[
            styles.logoIconBox,
            { backgroundColor: theme.primaryContainer },
          ]}
        >
          <MaterialIcons name="task" size={40} color={theme.primary} />
        </View>
        <Text style={[styles.appName, { color: theme.textPrimary }]}>
          Horizon Tasks
        </Text>
        <Text style={[styles.appVersion, { color: theme.textMuted }]}>
          Version 1.0.0 (Build 2026)
        </Text>
      </View>

      {/* Main Philosophy Description Paragraph */}
      <View style={cardStyle}>
        <View style={styles.paddingBox}>
          <Text
            style={[styles.descriptionHeader, { color: theme.textPrimary }]}
          >
            Our Mission
          </Text>
          <Text style={[styles.descriptionBody, { color: theme.textMuted }]}>
            Horizon Tasks blends contextual atmosphere designs with minimal
            visual productivity systems. We map natural visual environments into
            digital workflow structures to keep your day focused, peaceful, and
            beautifully organized.
          </Text>
        </View>
      </View>

      {/* Meta Specs Checklist Block */}
      <Text style={[styles.sectionText, { color: theme.primary }]}>
        APPLICATION DETAILS
      </Text>
      <View style={cardStyle}>
        <View style={styles.rowItem}>
          <Text style={itemTextStyle}>Developer</Text>
          <Text style={subtitleTextStyle}>Achintha Shashika </Text>
        </View>
        <View
          style={[
            styles.rowItem,
            { borderTopWidth: 1, borderTopColor: theme.border },
          ]}
        >
          <Text style={itemTextStyle}>Framework</Text>
          <Text style={subtitleTextStyle}>React Native (Expo)</Text>
        </View>
        <View
          style={[
            styles.rowItem,
            { borderTopWidth: 1, borderTopColor: theme.border },
          ]}
        >
          <Text style={itemTextStyle}>Last Updated</Text>
          <Text style={subtitleTextStyle}>June 2026</Text>
        </View>
      </View>

      {/* Legal Actions Section */}
      <Text style={[styles.sectionText, { color: theme.primary }]}>
        LEGAL & ACCORD
      </Text>
      <View style={cardStyle}>
        <TouchableOpacity style={styles.interactiveRow}>
          <Text style={itemTextStyle}>Terms of Service</Text>
          <MaterialIcons name="open-in-new" size={18} color={theme.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.interactiveRow,
            { borderTopWidth: 1, borderTopColor: theme.border },
          ]}
        >
          <Text style={itemTextStyle}>Privacy Policy</Text>
          <MaterialIcons name="open-in-new" size={18} color={theme.textMuted} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  if (!theme.backgroundImage) {
    return <View style={styles.container}>{content}</View>;
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
  container: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.12)" },
  scrollContent: { paddingBottom: 32 },
  brandContainer: { alignItems: "center", marginVertical: 32 },
  logoIconBox: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  appName: { fontSize: 24, fontWeight: "700", letterSpacing: 0.5 },
  appVersion: { fontSize: 13, marginTop: 4, fontWeight: "500" },
  paddingBox: { padding: 20 },
  descriptionHeader: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 1,
  },
  descriptionBody: { fontSize: 15, lineHeight: 22, fontWeight: "400" },
  sectionText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 24,
    marginTop: 24,
    marginBottom: 8,
    letterSpacing: 1,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  interactiveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  itemText: { fontSize: 15, fontWeight: "500" },
  subtitleText: { fontSize: 15, fontWeight: "400" },
});
