import { useFonts } from 'expo-font'
import { extendTheme, NativeBaseProvider, Center, Button, Text } from "native-base";

export default function App() {
  const [fontsLoaded] = useFonts({
    'poppins-black': require('./src/assets/fonts/Poppins-Black.ttf'),
    'poppins-light': require('./src/assets/fonts/Poppins-Light.ttf'),
    'poppins-medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
    'poppins-regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const customTheme = extendTheme({
    fontSizes: {
      sm: 14,
      md: 16,
      lg: 20,
      xl: 30,
      custom: 24,
      '123x': 20,
    },
    colors: {
      // Add new color
      primary: {
        50: '#7F3DFF',
        100: 'rgba(127, 61, 255, 0.18)',
        200: '#323232',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
      error: {
        500: 'rgba(226, 40, 40, 0.72)'
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
          normal: "poppins-black",
        },
      }
    },
    fonts: {
      heading: "poppins-black",
      body: "poppins-medium",
      mono: "poppins-light"
    },
  })

  return (
    <NativeBaseProvider theme={customTheme}>
      <Center flex="1">
        <Center flex="1" fontFamily="heading">
          <Text color="primary.50" fontSize="lg" display="flex"  >
            BOOKSWAP
          </Text>
          <Text color="primary.200" mb="1">
            Welcome our awesome app!
          </Text>
          <Button bg="primary.100" m="7" _text={{
            color: "primary.50"
          }}>GET STARTED</Button>
        </Center>
      </Center>
    </NativeBaseProvider>
  );
}
