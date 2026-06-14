import React, { createContext, useContext, useMemo, useState } from "react";

import type { ImageSourcePropType } from "react-native";

//
// TYPES
//

export type ThemeCategory = "color" | "texture" | "scenery";

export type ThemeOption = {
  name: string;
  category: ThemeCategory;
  accent: string;
  isDark?: boolean;

  // Brand
  primary: string;
  primarySoft: string;
  primaryDark: string;

  // Layout
  background: string;
  surface: string;
  surfaceSecondary: string;

  // Typography
  text: string;
  textLight: string;
  mutedText: string;

  // Borders
  border: string;

  // Status
  success: string;
  warning: string;
  danger: string;
  info: string;

  // UI
  shadow: string;
  overlay: string;
  disabled: string;
  placeholder: string;

  // Assets
  backgroundImage?: ImageSourcePropType;
};

//
// COLOR THEMES
//

export const colors = {
  ocean: {
    name: "Ocean",
    category: "color",
    accent: "#3B82F6",
    isDark: false,

    primary: "#2563EB",
    primarySoft: "#DBEAFE",
    primaryDark: "#1D4ED8",

    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceSecondary: "#F1F5F9",

    text: "#0F172A",
    textLight: "#FFFFFF",
    mutedText: "#64748B",

    border: "#E2E8F0",

    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#0EA5E9",

    shadow: "rgba(37,99,235,0.15)",
    overlay: "rgba(15,23,42,0.45)",
    disabled: "#CBD5E1",
    placeholder: "#94A3B8",
  },

  emerald: {
    name: "Emerald",
    category: "color",
    accent: "#10B981",
    isDark: false,

    primary: "#059669",
    primarySoft: "#D1FAE5",
    primaryDark: "#047857",

    background: "#F6FFFB",
    surface: "#FFFFFF",
    surfaceSecondary: "#ECFDF5",

    text: "#064E3B",
    textLight: "#FFFFFF",
    mutedText: "#6B7280",

    border: "#D1FAE5",

    success: "#10B981",
    warning: "#FBBF24",
    danger: "#EF4444",
    info: "#06B6D4",

    shadow: "rgba(5,150,105,0.15)",
    overlay: "rgba(6,78,59,0.35)",
    disabled: "#D1D5DB",
    placeholder: "#9CA3AF",
  },

  violet: {
    name: "Violet",
    category: "color",
    accent: "#8B5CF6",
    isDark: false,

    primary: "#7C3AED",
    primarySoft: "#EDE9FE",
    primaryDark: "#6D28D9",

    background: "#FAF8FF",
    surface: "#FFFFFF",
    surfaceSecondary: "#F5F3FF",

    text: "#2E1065",
    textLight: "#FFFFFF",
    mutedText: "#6B7280",

    border: "#DDD6FE",

    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#8B5CF6",

    shadow: "rgba(124,58,237,0.16)",
    overlay: "rgba(46,16,101,0.35)",
    disabled: "#D1D5DB",
    placeholder: "#9CA3AF",
  },

  sunset: {
    name: "Sunset",
    category: "color",
    accent: "#F97316",
    isDark: false,

    primary: "#F97316",
    primarySoft: "#FFEDD5",
    primaryDark: "#EA580C",

    background: "#FFF9F5",
    surface: "#FFFFFF",
    surfaceSecondary: "#FFF7ED",

    text: "#431407",
    textLight: "#FFFFFF",
    mutedText: "#78716C",

    border: "#FED7AA",

    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#DC2626",
    info: "#FB923C",

    shadow: "rgba(249,115,22,0.16)",
    overlay: "rgba(67,20,7,0.35)",
    disabled: "#D6D3D1",
    placeholder: "#A8A29E",
  },

  rose: {
    name: "Rose",
    category: "color",
    accent: "#F43F5E",
    isDark: false,

    primary: "#E11D48",
    primarySoft: "#FFE4E6",
    primaryDark: "#BE123C",

    background: "#FFF5F7",
    surface: "#FFFFFF",
    surfaceSecondary: "#FFF1F2",

    text: "#4C0519",
    textLight: "#FFFFFF",
    mutedText: "#71717A",

    border: "#FECDD3",

    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#DC2626",
    info: "#FB7185",

    shadow: "rgba(225,29,72,0.16)",
    overlay: "rgba(76,5,25,0.35)",
    disabled: "#D4D4D8",
    placeholder: "#A1A1AA",
  },

  aqua: {
    name: "Aqua",
    category: "color",
    accent: "#22D3EE",
    isDark: false,

    primary: "#06B6D4",
    primarySoft: "#CFFAFE",
    primaryDark: "#0891B2",

    background: "#F0FDFF",
    surface: "#FFFFFF",
    surfaceSecondary: "#ECFEFF",

    text: "#083344",
    textLight: "#FFFFFF",
    mutedText: "#6B7280",

    border: "#A5F3FC",

    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#0284C7",

    shadow: "rgba(6,182,212,0.16)",
    overlay: "rgba(8,51,68,0.35)",
    disabled: "#D1D5DB",
    placeholder: "#94A3B8",
  },

  midnight: {
    name: "Midnight",
    category: "color",
    accent: "#1e2224",
    isDark: true,

    primary: "#38BDF8", // Sky blue
    primarySoft: "rgba(56,189,248,0.16)",
    primaryDark: "#0EA5E9",

    background: "#020617", // Very dark navy
    surface: "#0F172A",
    surfaceSecondary: "#1E293B",

    text: "#F8FAFC",
    textLight: "#FFFFFF",
    mutedText: "#94A3B8",

    border: "rgba(148,163,184,0.15)",

    success: "#22C55E",
    warning: "#FBBF24",
    danger: "#EF4444",
    info: "#38BDF8",

    shadow: "rgba(0,0,0,0.50)",
    overlay: "rgba(0,0,0,0.70)",
    disabled: "#334155",
    placeholder: "#64748B",
  },

  yellow: {
    name: "Yellow",
    category: "color",
    accent: "#FACC15",
    isDark: false,

    primary: "#EAB308",
    primarySoft: "#FEF9C3", // Light yellow tint (matches your Aqua primarySoft style)
    primaryDark: "#CA8A04",

    background: "#FFFDF2", //

    surface: "#FFFFFF",
    surfaceSecondary: "#FEF9C3",

    text: "#422006", // Deep brown-yellow for readability
    textLight: "#FFFFFF",
    mutedText: "#71717A",

    border: "#FEF08A", // Soft yellow border (matches your Aqua A5F3FC style)

    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#06B6D4",

    shadow: "rgba(234,179,8,0.12)",
    overlay: "rgba(66,32,6,0.35)",
    disabled: "#D1D5DB",
    placeholder: "#94A3B8",
  },
} satisfies Record<string, ThemeOption>;

//
// TEXTURES
//

export const textures = {
  cotton: {
    name: "Cotton",
    category: "texture",
    accent: "#5B7C63",
    isDark: false,

    backgroundImage: require("../assets/textures/cotton-fabric-texture.jpg"),

    primary: "#6D8B74",
    primarySoft: "#EEF6F0",
    primaryDark: "#3F5F46",

    background: "#FAFBF8",
    surface: "rgba(255,255,255,0.90)",
    surfaceSecondary: "rgba(248,250,248,0.92)",

    text: "#243326",
    textLight: "#FFFFFF",
    mutedText: "#69776B",

    border: "#DEE8DF",

    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#0EA5E9",

    shadow: "rgba(0,0,0,0.08)",
    overlay: "rgba(0,0,0,0.12)",
    disabled: "#D1D5DB",
    placeholder: "#9CA3AF",
  },

  paper: {
    name: "Paper",
    category: "texture",
    accent: "#475569",
    isDark: false,

    backgroundImage: require("../assets/textures/paper-white-texture.jpg"),

    primary: "#64748B",
    primarySoft: "#F8FAFC",
    primaryDark: "#334155",

    background: "#FBFAF6",
    surface: "rgba(255,255,255,0.92)",
    surfaceSecondary: "rgba(248,250,252,0.95)",

    text: "#1E293B",
    textLight: "#FFFFFF",
    mutedText: "#64748B",

    border: "#E2E8F0",

    success: "#16A34A",
    warning: "#F59E0B",
    danger: "#DC2626",
    info: "#0284C7",

    shadow: "rgba(0,0,0,0.08)",
    overlay: "rgba(0,0,0,0.10)",
    disabled: "#CBD5E1",
    placeholder: "#94A3B8",
  },

  stone: {
    name: "Stone",
    category: "texture",
    accent: "#334155",
    isDark: false,

    backgroundImage: require("../assets/textures/stone-wall-texture.jpg"),

    primary: "#475569",
    primarySoft: "#F1F5F9",
    primaryDark: "#1E293B",

    background: "#F3F4F6",
    surface: "rgba(255,255,255,0.90)",
    surfaceSecondary: "rgba(248,250,252,0.94)",

    text: "#111827",
    textLight: "#FFFFFF",
    mutedText: "#6B7280",

    border: "#D1D5DB",

    success: "#059669",
    warning: "#F59E0B",
    danger: "#DC2626",
    info: "#0EA5E9",

    shadow: "rgba(0,0,0,0.10)",
    overlay: "rgba(0,0,0,0.14)",
    disabled: "#D1D5DB",
    placeholder: "#9CA3AF",
  },
} satisfies Record<string, ThemeOption>;

//
// SCENERIES
//

export const sceneries = {
  beach: {
    name: "Coastal Sunset",
    category: "scenery",
    accent: "#F59E0B", // Sun orange accent
    isDark: false,
    backgroundImage: require("../assets/scenery/natural-beach-scenery.jpg"),

    primary: "#0E7490", // Teal/Ocean blue
    primarySoft: "#E0F7FA",
    primaryDark: "#164E63",

    background: "#FFF7ED", // Warm sunset glow
    surface: "rgba(255, 255, 255, 0.85)",
    surfaceSecondary: "rgba(224, 242, 254, 0.80)",

    text: "#0C4A6E",
    textLight: "#FFFFFF",
    mutedText: "#64748B",

    border: "rgba(14, 116, 144, 0.2)",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#0EA5E9",

    shadow: "rgba(0,0,0,0.12)",
    overlay: "rgba(0,0,0,0.15)",
    disabled: "#D1D5DB",
    placeholder: "#94A3B8",
  },

  autumnal: {
    name: "Golden Autumn",
    category: "scenery",
    accent: "#EA580C", // Deep orange leaf accent
    isDark: false,
    backgroundImage: require("../assets/scenery/autumnal-landscape-scenery.jpg"),

    primary: "#C2410C", // Rust orange
    primarySoft: "#FFF7ED",
    primaryDark: "#7C2D12",

    background: "#F8FAF8", // Misty grey-white background
    surface: "rgba(255, 255, 255, 0.88)",
    surfaceSecondary: "rgba(255, 247, 237, 0.85)",

    text: "#431407",
    textLight: "#FFFFFF",
    mutedText: "#78716C",

    border: "rgba(194, 65, 12, 0.2)",
    success: "#16A34A",
    warning: "#F59E0B",
    danger: "#DC2626",
    info: "#0EA5E9",

    shadow: "rgba(0,0,0,0.1)",
    overlay: "rgba(0,0,0,0.1)",
    disabled: "#E7E5E4",
    placeholder: "#A8A29E",
  },

  pathway: {
    name: "Green Pathway",
    category: "scenery",
    accent: "#84CC16",
    isDark: false,
    backgroundImage: require("../assets/scenery/pathway-middle-grassy-scenery.jpg"),

    primary: "#4D7C0F",
    primarySoft: "#F7FEE7",
    primaryDark: "#365314",

    background: "#F7FBEF",
    surface: "rgba(255,255,255,0.84)",
    surfaceSecondary: "rgba(247,254,231,0.86)",

    text: "#1A2E05",
    textLight: "#FFFFFF",
    mutedText: "#647048",

    border: "rgba(217,249,157,0.70)",
    success: "#16A34A",
    warning: "#F59E0B",
    danger: "#DC2626",
    info: "#0EA5E9",

    shadow: "rgba(0,0,0,0.16)",
    overlay: "rgba(0,0,0,0.18)",
    disabled: "#D1D5DB",
    placeholder: "#84CC16",
  },

  moonShore: {
    name: "Midnight Shore",
    category: "scenery",
    accent: "#38BDF8", // Electric blue moon glow
    isDark: true,
    backgroundImage: require("../assets/scenery/rocky-shore-full-moon-scenery.jpg"),

    primary: "#7DD3FC",
    primarySoft: "rgba(12, 74, 110, 0.4)",
    primaryDark: "#0369A1",

    background: "#020617", // Deepest navy
    surface: "rgba(15, 23, 42, 0.8)",
    surfaceSecondary: "rgba(30, 41, 59, 0.6)",

    text: "#F0F9FF",
    textLight: "#FFFFFF",
    mutedText: "#94A3B8",

    border: "rgba(56, 189, 248, 0.15)",
    success: "#22C55E",
    warning: "#FBBF24",
    danger: "#F87171",
    info: "#38BDF8",

    shadow: "rgba(0,0,0,0.5)",
    overlay: "rgba(2, 6, 23, 0.5)",
    disabled: "#1E293B",
    placeholder: "#475569",
  },

  clear: {
    name: "Milky Way Pier",
    category: "scenery",
    accent: "#FDBA74", // Warm light from the pier house
    isDark: true,
    backgroundImage: require("../assets/scenery/starry-clear-sky-scenery.jpg"),

    primary: "#38BDF8", // Galactic blue
    primarySoft: "rgba(56, 189, 248, 0.12)",
    primaryDark: "#0EA5E9",

    background: "#080C17",
    surface: "rgba(15, 23, 42, 0.85)",
    surfaceSecondary: "rgba(30, 41, 59, 0.7)",

    text: "#F1F5F9",
    textLight: "#FFFFFF",
    mutedText: "#94A3B8",

    border: "rgba(253, 186, 116, 0.2)", // Subtle glow border
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#0EA5E9",

    shadow: "rgba(0,0,0,0.6)",
    overlay: "rgba(0, 0, 0, 0.4)",
    disabled: "#1E293B",
    placeholder: "#64748B",
  },

  starry: {
    name: "Starlit Cabin",
    category: "scenery",
    accent: "#FACC15", // The warm yellow light in the cabin window
    isDark: true,
    backgroundImage: require("../assets/scenery/starry-sky-scenery.jpg"),

    primary: "#818CF8", // Indigo sky
    primarySoft: "rgba(129, 140, 248, 0.1)",
    primaryDark: "#4F46E5",

    background: "#050510",
    surface: "rgba(17, 24, 39, 0.9)",
    surfaceSecondary: "rgba(31, 41, 55, 0.7)",

    text: "#E2E8F0",
    textLight: "#FFFFFF",
    mutedText: "#94A3B8",

    border: "rgba(129, 140, 248, 0.2)",
    success: "#22C55E",
    warning: "#EAB308",
    danger: "#F87171",
    info: "#6366F1",

    shadow: "rgba(0,0,0,0.6)",
    overlay: "rgba(0, 0, 0, 0.45)",
    disabled: "#111827",
    placeholder: "#4B5563",
  },
} satisfies Record<string, ThemeOption>;
//
// ALL THEMES
//

export const allThemes = {
  ...colors,
  ...textures,
  ...sceneries,
};

//
// TYPES
//

export type ColorName = keyof typeof colors;
export type TextureName = keyof typeof textures;
export type SceneryName = keyof typeof sceneries;
export type AppThemeName = keyof typeof allThemes;

//
// CONTEXT TYPE
//

type ThemeContextType = {
  theme: ThemeOption;

  activeTheme: AppThemeName;
  setActiveTheme: (theme: AppThemeName) => void;

  selectedThemeType: ThemeCategory;

  themes: typeof allThemes;

  colors: typeof colors;
  textures: typeof textures;
  sceneries: typeof sceneries;
};

//
// CONTEXT
//

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

//
// PROVIDER
//

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTheme, setActiveTheme] = useState<AppThemeName>("ocean");

  const value = useMemo(() => {
    const theme = allThemes[activeTheme];

    return {
      theme,

      activeTheme,
      setActiveTheme,

      selectedThemeType: theme.category,

      themes: allThemes,

      colors,
      textures,
      sceneries,
    };
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

//
// HOOK
//

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};
