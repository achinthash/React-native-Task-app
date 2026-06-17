import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

export interface ThemeColors {
  accent: string;
  background: string;
  surface: string;
  border: string;
  primary: string;
  primaryContainer: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textOnPrimary: string;
  success: string;
  error: string;
  backgroundImage: any;
}

export const themes = {
  dark: {
    accent: "#1e2224",
    background: "#1e2224",
    surface: "#0F172A",
    border: "#334155",
    primary: "#38BDF8",
    primaryContainer: "#0369A1",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",
    textOnPrimary: "#0F172A",
    success: "#4DE800",
    error: "#F87171",
    backgroundImage: null,
  },

  blue: {
    accent: "#0284C7",
    background: "#F0F9FF",
    surface: "#FFFFFF",
    border: "#E0F2FE",
    primary: "#0284C7",
    primaryContainer: "#E0F2FE",
    textPrimary: "#0C4A6E",
    textSecondary: "#0369A1",
    textMuted: "#38BDF8",
    textOnPrimary: "#FFFFFF",
    success: "#16A34A",
    error: "#DC2626",
    backgroundImage: null,
  },
  green: {
    accent: "#16A34A",
    background: "#F0FDF4",
    surface: "#FFFFFF",
    border: "#DCFCE7",
    primary: "#16A34A",
    primaryContainer: "#DCFCE7",
    textPrimary: "#14532D",
    textSecondary: "#15803D",
    textMuted: "#4ADE80",
    textOnPrimary: "#FFFFFF",
    success: "#22C55E",
    error: "#EF4444",
    backgroundImage: null,
  },
  red: {
    accent: "#DC2626",
    background: "#FFF5F5",
    surface: "#FFFFFF",
    border: "#FEE2E2",
    primary: "#DC2626",
    primaryContainer: "#FEE2E2",
    textPrimary: "#450A0A",
    textSecondary: "#991B1B",
    textMuted: "#F87171",
    textOnPrimary: "#FFFFFF",
    success: "#16A34A",
    error: "#EF4444",
    backgroundImage: null,
  },
  orange: {
    accent: "#EA580C",
    background: "#FFF7ED",
    surface: "#FFFFFF",
    border: "#FFEDD5",
    primary: "#EA580C",
    primaryContainer: "#FFEDD5",
    textPrimary: "#431407",
    textSecondary: "#9A3412",
    textMuted: "#FB923C",
    textOnPrimary: "#FFFFFF",
    success: "#16A34A",
    error: "#DC2626",
    backgroundImage: null,
  },
  indigo: {
    accent: "#4F46E5",
    background: "#EEF2FF",
    surface: "#FFFFFF",
    border: "#E0E7FF",
    primary: "#4F46E5",
    primaryContainer: "#E0E7FF",
    textPrimary: "#312E81",
    textSecondary: "#4338CA",
    textMuted: "#818CF8",
    textOnPrimary: "#FFFFFF",
    success: "#10B981",
    error: "#EF4444",
    backgroundImage: null,
  },
  cream: {
    accent: "#A79277",
    background: "#FDFBF7",
    surface: "#FFFFFF",
    border: "#F3EAD3",
    primary: "#78350F",
    primaryContainer: "#FEF3C7",
    textPrimary: "#2D2219",
    textSecondary: "#5F4D3C",
    textMuted: "#A79277",
    textOnPrimary: "#FDFBF7",
    success: "#15803D",
    error: "#B91C1C",
    backgroundImage: null,
  },
  violet: {
    accent: "#7C3AED",
    background: "#FAF5FF",
    surface: "#FFFFFF",
    border: "#F3E8FF",
    primary: "#7C3AED",
    primaryContainer: "#F3E8FF",
    textPrimary: "#2E1065",
    textSecondary: "#5B21B6",
    textMuted: "#A78BFA",
    textOnPrimary: "#FFFFFF",
    success: "#059669",
    error: "#E11D48",
    backgroundImage: null,
  },

  // with background image

  starry: {
    accent: "#DC2626",
    background: "#FFF5F5",
    surface: "#FFFFFF",
    border: "#FEE2E2",
    primary: "#DC2626",
    primaryContainer: "#FEE2E2",
    textPrimary: "#450A0A",
    textSecondary: "#991B1B",
    textMuted: "#F87171",
    textOnPrimary: "#FFFFFF",
    success: "#16A34A",
    error: "#EF4444",
    backgroundImage: require("../assets/scenery/pathway-middle-grassy-scenery.jpg"),
  },
  starry2: {
    accent: "#EA580C",
    background: "#FFF7ED",
    surface: "#FFFFFF",
    border: "#FFEDD5",
    primary: "#EA580C",
    primaryContainer: "#FFEDD5",
    textPrimary: "#431407",
    textSecondary: "#9A3412",
    textMuted: "#FB923C",
    textOnPrimary: "#FFFFFF",
    success: "#16A34A",
    error: "#DC2626",
    backgroundImage: require("../assets/scenery/pathway-middle-grassy-scenery.jpg"),
  },
  in2digo: {
    accent: "#4F46E5",
    background: "#EEF2FF",
    surface: "#FFFFFF",
    border: "#E0E7FF",
    primary: "#4F46E5",
    primaryContainer: "#E0E7FF",
    textPrimary: "#312E81",
    textSecondary: "#4338CA",
    textMuted: "#818CF8",
    textOnPrimary: "#FFFFFF",
    success: "#10B981",
    error: "#EF4444",
    backgroundImage: require("../assets/scenery/pathway-middle-grassy-scenery.jpg"),
  },
  starry3: {
    accent: "#A79277",
    background: "#FDFBF7",
    surface: "#FFFFFF",
    border: "#F3EAD3",
    primary: "#78350F",
    primaryContainer: "#FEF3C7",
    textPrimary: "#2D2219",
    textSecondary: "#5F4D3C",
    textMuted: "#A79277",
    textOnPrimary: "#FDFBF7",
    success: "#15803D",
    error: "#B91C1C",
    backgroundImage: require("../assets/scenery/pathway-middle-grassy-scenery.jpg"),
  },
  starry4: {
    accent: "#7C3AED",
    background: "#FAF5FF",
    surface: "#FFFFFF",
    border: "#F3E8FF",
    primary: "#7C3AED",
    primaryContainer: "#F3E8FF",
    textPrimary: "#2E1065",
    textSecondary: "#5B21B6",
    textMuted: "#A78BFA",
    textOnPrimary: "#FFFFFF",
    success: "#059669",
    error: "#E11D48",
    backgroundImage: require("../assets/scenery/pathway-middle-grassy-scenery.jpg"),
  },
} as const;

export type ThemeName = keyof typeof themes;

interface ThemeContextType {
  theme: ThemeColors;
  activeTheme: ThemeName;
  setActiveTheme: (theme: ThemeName) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [activeTheme, setActiveTheme] = useState<ThemeName>("red");

  // Memoize
  const value = useMemo(
    () => ({
      theme: themes[activeTheme],
      activeTheme,
      setActiveTheme,
    }),
    [activeTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }

  return context;
};
