import { useFonts } from 'expo-font';
import { NativeBaseProvider, Center, Button, Text } from "native-base";
import { theme } from './src/theme';

import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

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

  return (
    <NativeBaseProvider theme={theme}>
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
