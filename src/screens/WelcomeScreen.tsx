import { Button, Center, Flex, Heading, Image, Text } from "native-base";
import Screen from "../components/Screen";

export default function WelcomeScreen() {
  const inifiniteLibrary = require("../assets/images/infinite-library.png");

  return (
    <Screen>
      <Flex direction="column" mb="2.5">
        <Center>
          <Image source={inifiniteLibrary} alt="Infinite Library" size="450" />
        </Center>
        <Center>
          <Heading fontSize="lg" mb="3" color="coolGray.100">
            Infinite library
          </Heading>
        </Center>
        <Center>
          <Heading
            fontSize="md"
            mt="1"
            color="coolGray.200"
            w={312}
            justifyItems="center"
          >
            “Making your library as different as possible!”
          </Heading>
        </Center>

        <Center>
          <Button
            bg="primary.50"
            m="7"
            _text={{
              color: "white",
            }}
          >
            GET STARTED
          </Button>
        </Center>
      </Flex>
    </Screen>
  );
}
