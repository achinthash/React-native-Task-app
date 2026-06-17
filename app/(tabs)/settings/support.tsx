import { useTheme } from "@/context/ThemeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import {
    ImageBackground,
    LayoutAnimation,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View,
} from "react-native";

// Enable smooth LayoutAnimation for expanding accordion items on Android devices
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HelpSupportScreen() {
  const { theme } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const cardStyle = [
    styles.card,
    { backgroundColor: theme.surface, borderColor: theme.border },
  ];
  const iconBoxStyle = [
    styles.iconBox,
    { backgroundColor: theme.background, borderColor: theme.border },
  ];

  const faqs = [
    {
      q: "How do I sync my active themes?",
      a: "Themes update globally across your app structures instantly once selected on your theme screen dashboard.",
    },
    {
      q: "Can I assign images to categories?",
      a: "Background layout imagery paths are currently tied directly to core operational system themes to preserve visual readability.",
    },
    {
      q: "Where are my calendar database files saved?",
      a: "Your agenda schedules and task items are saved safely right in your device secure local flash storage allocation units.",
    },
  ];

  const toggleAccordion = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const content = (
    <ScrollView
      style={{
        backgroundColor: theme.backgroundImage
          ? "transparent"
          : theme.background,
      }}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Contact Interaction Grid Channels */}
      <Text style={[styles.sectionText, { color: theme.primary }]}>
        GET IN TOUCH
      </Text>
      <View style={cardStyle}>
        <TouchableOpacity style={styles.contactItem}>
          <View style={iconBoxStyle}>
            <MaterialIcons name="email" size={20} color={theme.accent} />
          </View>
          <View style={styles.textFlex}>
            <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>
              Email Support
            </Text>
            <Text style={[styles.itemSub, { color: theme.textMuted }]}>
              achinthash@gmail.com
            </Text>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={22}
            color={theme.textMuted}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.contactItem,
            { borderTopWidth: 1, borderTopColor: theme.border },
          ]}
        >
          <View style={iconBoxStyle}>
            <MaterialIcons name="bug-report" size={20} color={theme.accent} />
          </View>
          <View style={styles.textFlex}>
            <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>
              Report a Malfunction
            </Text>
            <Text style={[styles.itemSub, { color: theme.textMuted }]}>
              Open an issue tracker log
            </Text>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={22}
            color={theme.textMuted}
          />
        </TouchableOpacity>
      </View>

      {/* Interactive FAQ Accordion List Component */}
      <Text style={[styles.sectionText, { color: theme.primary }]}>
        FREQUENT QUESTIONS
      </Text>
      <View style={cardStyle}>
        {faqs.map((faq, idx) => {
          const isOpen = expandedIndex === idx;
          return (
            <View
              key={idx}
              style={
                idx !== 0
                  ? { borderTopWidth: 1, borderTopColor: theme.border }
                  : null
              }
            >
              <TouchableOpacity
                onPress={() => toggleAccordion(idx)}
                style={styles.faqHeader}
              >
                <Text
                  style={[styles.faqQuestion, { color: theme.textPrimary }]}
                >
                  {faq.q}
                </Text>
                <MaterialIcons
                  name={isOpen ? "expand-less" : "expand-more"}
                  size={22}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
              {isOpen && (
                <View
                  style={[
                    styles.faqBody,
                    { backgroundColor: theme.background },
                  ]}
                >
                  <Text style={[styles.faqAnswer, { color: theme.textMuted }]}>
                    {faq.a}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
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
  contactItem: { flexDirection: "row", alignItems: "center", padding: 16 },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 1,
  },
  textFlex: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: "600" },
  itemSub: { fontSize: 13, marginTop: 2 },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },
  faqQuestion: { fontSize: 15, fontWeight: "500", flex: 0.95 },
  faqBody: { paddingHorizontal: 18, paddingVertical: 14 },
  faqAnswer: { fontSize: 14, lineHeight: 20 },
});
