import { Button, Center, Flex, Heading, Image } from "native-base";
import Screen from "../components/Screen";

export default function Welcome() {
  const inifiniteLibrary = require("../assets/images/infinite-library.png");

  return (
    <Screen>
      <Flex direction="column" mb="2.5" mt="10">
        <Center>
          <Image source={inifiniteLibrary} alt="Infinite Library" size="375" />
        </Center>
        <Center>
          <Heading>Infinite library</Heading>
        </Center>
        <Center>
          <Heading mt="1" color="coolGray.600" fontWeight="medium">
            “Making your library as different as possible!”
          </Heading>
        </Center>
        <Center>
          <Button
            bg="primary.100"
            m="7"
            _text={{
              color: "primary.50",
            }}
          >
            GET STARTED
          </Button>
        </Center>
      </Flex>
    </Screen>
  );
}
