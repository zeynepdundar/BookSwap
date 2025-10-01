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
      50: "#7F3DFF",
      100: "#E7DCFF",
      200: "#F2ECFF",
      300: "#7AC1E4",
      400: "#47A9DA",
      500: "#0088CC",
      600: "#007AB8",
      700: "#006BA1",
      800: "#005885",
      900: "#003F5E",
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
        shadow: 5,
        _text: {
          fontFamily: "poppins-semi-bold",
          fontWeight: "700",
          px: 4,
        },
        _pressed: {
          opacity: 0.8,
        },
      },
      variants: {
        primary: () => ({
          bg: "primary.50",
          _text: { color: "#fff" },
          _pressed: { bg: "primary.100" }, // ✅ pressed feedback
        }),
        secondary: () => ({
          bg: "primary.100",
          _text: { color: "primary.50" },
          _pressed: { bg: "primary.200" },
        }),
        outline: () => ({
          bg: "transparent",
          borderWidth: 1,
          borderColor: "primary.50",
          _text: { color: "primary.50" },
          _pressed: { bg: "primary.50:alpha.10" }, // ✅ subtle feedback
        }),
        ghost: () => ({
          bg: "transparent",
          _text: { color: "primary.50" },
          _pressed: { opacity: 0.6 }, // ✅ feedback without background
        }),
        disabled: () => ({
          bg: "gray.300",
          _text: { color: "gray.600" },
        }),
        disabledOutline: () => ({
          bg: "transparent",
          borderWidth: 1,
          borderColor: "gray.400",
          _text: { color: "gray.400" },
        }),
      },
    },
    Heading: {
      baseStyle: {
          color: "coolGray.800",
          fontWeight: "500",
          fontFamily: "poppins"
      },
      sizes: {
        xs: {
          fontSize: "12px",
        },
        sm: {
          fontSize: "14px",
        },
        md: {
          fontSize: "16px",
        },
        lg: {
          fontSize: "18px",
        },
        xl: {
          fontSize: "20px",
        },
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
