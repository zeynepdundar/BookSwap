import { extendTheme } from "native-base";

export const theme = extendTheme({
  fontSizes: {
    sm: 14,
    md: 16,
    lg: 20,
    xl: 30,
    custom: 24,
    "123x": 20,
  },
  colors: {
    // Add new color
    primary: {
      50: "#7F3DFF",
      100: "rgba(127, 61, 255, 0.18)",
      200: "#323232",
      300: "#7AC1E4",
      400: "#47A9DA",
      500: "#0088CC",
      600: "#007AB8",
      700: "#006BA1",
      800: "#005885",
      900: "#003F5E",
    },
    coolGray: {
      100: "#161719",
      200: "#91919F",
      300: "#7AC1E4",
      400: "#47A9DA",
      500: "#0088CC",
      600: "#007AB8",
      700: "#006BA1",
      800: "#005885",
      900: "#003F5E",
    },
    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: "#d97706",
    },
    error: {
      500: "rgba(226, 40, 40, 0.72)",
    },
  },
  fontConfig: {
    Poppins: {
      200: {
        normal: "poppins-light",
      },

      400: {
        normal: "poppins-regular",
      },
      500: {
        normal: "poppins-medium",
      },
      600: {
        normal: "poppins-black",
      },
    },
  },
  fonts: {
    heading: "poppins-black",
    body: "poppins-medium",
    mono: "poppins-light",
  },
});
