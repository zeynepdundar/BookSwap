import { Button, Center, Flex, Heading, Image, Text } from "native-base";
import Screen from "../components/Screen";

export default function WelcomeScreen() {
  const inifiniteLibrary = require("../assets/images/infinite-library.png");

  return (
    <Screen>
      <Flex direction="column" mb="2.5" mt="70">
        <Center>
          <Image source={inifiniteLibrary} alt="Infinite Library" size="300" />
        </Center>
        <Center mb="3" mt="10">
          <Heading fontSize="lg" color="black.100" fontWeight={600}>
            Infinite library
          </Heading>
        </Center>
        <Center>
          <Heading fontSize="18px" color="black.200" w={312} fontWeight={400}>
            “Making your library as different as possible!”
          </Heading>
        </Center>
        <Center>
          <Button mt="10" variant="primary">
            GET STARTED
          </Button>
        </Center>
      </Flex>
    </Screen>
  );
}
