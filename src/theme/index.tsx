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
        rounded: "10px",
        boxShadow: "5",
        _text: {
          fontFamily: "poppins-semi-bold",
          fontWeight: "700",
          px: "4",
        },
        _pressed: {
          opacity: "80",
        },
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
        outline: () => {
          return {
            bg: "transparent",
            borderColor: "primary.50",
            _text: {
              color: "primary.50",
            },
          };
        },
        ghost: () => {
          return {
            bg: "transparent",
            borderColor: "primary.50",
            _text: {
              color: "primary.50",
            },
            _pressed: {
              backgroundColor: "transparent",
            },
          };
        },
        disabled: () => {
          return {
            bg: "primary.50",
            borderColor: "primary.50",
            _text: {
              color: "#fff",
            },
          };
        },
        disabledOutline: () => {
          return {
            bg: "transparent",
            //TODO: Border color is not applying correctly, need to fix this.
            borderColor: "black.700",
            _text: {
              color: "black.700",
            },
          };
        },
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
  },
});
