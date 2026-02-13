import { Colors } from "@/constants/theme";

const fonts = {
  family: "Jost",
  regular: "Jost_400Regular",
  semiBold: "Jost_600SemiBold",
  bold: "Jost_700Bold",
} as const;

export const lightTheme = {
  fonts,
  colors: {
    ...Colors.light,
    title: "#333333",
    tagline: "#666666",
    arrow: "#000",
    surface: "#F5F4F2",
    skeletonBg: "#f3f3f3",
    skeletonFg: "#ecebeb",
  },
};

export const darkTheme = {
  fonts,
  colors: {
    ...Colors.dark,
    title: "#ECEDEE",
    tagline: "#9BA1A6",
    arrow: "#ECEDEE",
    surface: "#2A2A2A",
    skeletonBg: "#3A3A3A",
    skeletonFg: "#4A4A4A",
  },
};

export type StyledTheme = typeof lightTheme;
