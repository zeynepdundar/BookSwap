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
    primary: {
      50: "#F5F0FF",  // background tint
      100: "#E7DCFF",  // surfaces
      500: "#7F3DFF",  // primary
      600: "#6E2EE6",  // pressed
      700: "#5A23C7",
    },
    black: {
      100: "#161719",
      200: "#91919F",
      300: "#7B7B80",
      400: "#323232",
      500: "#808085",
      600: "#7b7b80",
      700: "#979797",
      800: "#FCFCFD",
      900: "#EFEFEF",
    },
    error: {
      500: "#ED8080",
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
        normal: "poppins-semi-bold",
      },
      700: {
        normal: "poppins-bold",
      },
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 10, // ✅ number, not "px"
        shadow: 1,
        _text: {
          fontFamily: "poppins-semi-bold",
          fontWeight: "700",
          px: 4,
        },
        _pressed: {
          transform: [{ scale: 0.98 }],
        },
        _disabled: {
          bg: "gray.300",
          _text: { color: "gray.600" },
          opacity: 1,
        },
      },
      variants: {
        primary: () => ({
          bg: "primary.500",
          _text: { color: "white" },
          _pressed: { bg: "primary.600" },
        }),
        secondary: () => ({
          bg: "primary.100",
          _text: { color: "primary.500" },
          _pressed: { bg: "primary.200" },
        }),
        outline: () => ({
          bg: "transparent",
          borderWidth: 1,
          borderColor: "primary.500",
          _text: { color: "primary.500" },
          _pressed: { bg: "primary.500:alpha.10" }, // ✅ subtle feedback
        }),
        ghost: () => ({
          bg: "transparent",
          _text: { color: "primary.500" },
          _pressed: { opacity: 0.6 }, // ✅ feedback without background
        }),
        neutral: () => ({
          bg: "coolGray.50",
          borderWidth: 1,
          borderColor: "coolGray.200",
          _text: { color: "coolGray.700" },
          _pressed: { bg: "coolGray.100" },
        }),
      },
    },
    Heading: {
      baseStyle: {
        color: "#1F2937",
        fontWeight: "600",
        fontFamily: "poppins",
      },
      sizes: {
        xs: { fontSize: "12px" },
        sm: { fontSize: "14px" },
        md: { fontSize: "16px" },
        lg: { fontSize: "18px" },
        xl: { fontSize: "20px" },
      },
      defaultProps: {
        size: "xl",
      },
    },
    Body: {
      _text: {
        fontFamily: "Poppins",
        fontSize: "md",
        fontWeight: "400",
        color: "black.200",
      },
    },
  },
});
