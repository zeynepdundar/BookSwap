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
        rounded: "10px",
        _text: {
          fontFamily: "poppins-semi-bold",
          fontWeight: "700",
          px: "6",
        },
        // _pressed: {
        //   bg: "primary.100",
        //   _text: {
        //     color: "primary.50",
        //   },
        // },
      },
      variants: {
        primary: () => {
          return {
            bg: "primary.50",
            _text: {
              color: "#fff",
            },
          };
        },
        secondary: () => {
          return {
            bg: "primary.100",
            _text: {
              color: "primary.50",
            },
          };
        },
      },
    },
  },
});
