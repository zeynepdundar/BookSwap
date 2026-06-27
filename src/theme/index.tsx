import { extendTheme } from "native-base";

export const theme = extendTheme({
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
  },
  colors: {
    primary: {
      50: "#F5F0FF",  // background tint... cards empty states onboarding backgrounds
      100: "#E7DCFF",  // surfaces
      500: "#7F3DFF",  // main brand .. Get Started Swap button Active navigation
      600: "#6E2EE6",  // pressed/active
    },
    gray: {
      900: "#111113", // → primary text (başlıklar, isimler)
      700: "#2C2C2E", // → strong secondary (subtitle / önemli yardımcı text)
      500: "#636366", // → secondary text (açıklama, metadata)
      400: "#8E8E93",  // → disabled / hint / düşük önem
      300: "#C7C7CC", // separators
      200: "#E5E5EA", // disabledBg
      100: "#F2F2F7", // background
    },

    error: {
      50: "#FFF1F2",
      500: "#E53E3E",
    }
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
        rounded: 10,
        shadow: 1,
        _text: {
          fontFamily: "poppins-semi-bold",
          fontSize: "lg",
          px: 4
        },
        _pressed: {
          transform: [{ scale: 0.98 }],
        },
        _disabled: {
          bg: "gray.200",
          _text: { color: "gray.500" },
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
          _pressed: { bg: "primary.500:alpha.10" }, // subtle feedback
        }),
        ghost: () => ({
          bg: "transparent",
          _text: { color: "primary.500" },
          _pressed: { opacity: 0.6 }, // feedback without background
        }),
        neutral: () => ({
          bg: "gray.100",
          borderWidth: 1,
          borderColor: "gray.200",
          _text: { color: "gray.600" },
          _pressed: { bg: "gray.200" },
        }),
      },
    },
    Heading: {
      baseStyle: {
        color: "gray.900",
        fontFamily: "poppins-semi-bold",
      },
      sizes: {
        xl: { fontSize: "20px", lineHeight: "28px" },
        "2xl": { fontSize: "24px", lineHeight: "32px" },
        "3xl": { fontSize: "30px", lineHeight: "38px" },
      },
      defaultProps: {
        size: "xl",
      },
    },

    Text: {
      baseStyle: {
        fontFamily: "poppins-regular",
        lineHeight: "24px",
      },
    },
  },
});
