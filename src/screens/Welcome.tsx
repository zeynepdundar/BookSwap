import { Button, Center, Flex, Heading, Image, Text } from "native-base";
import Screen from "../components/Screen";

export default function Welcome() {
  const inifiniteLibrary = require("../assets/images/infinite-library.png");

  return (
    <Screen>
      <Flex direction="column" mb="2.5" mt="20">
        <Center mb="7">
          <Image source={inifiniteLibrary} alt="Infinite Library" size="375" />
        </Center>
        <Center>
          <Heading fontSize="lg" mb="3" color="black.100" fontWeight={600}>
            Infinite library
          </Heading>
        </Center>
        <Center>
          <Heading fontSize="18px" color="black.200" w={312} fontWeight={400}>
            “Making your library as different as possible!”
          </Heading>
        </Center>
        <Center>
          <Button m="7" variant="primary">
            GET STARTED
          </Button>
        </Center>
      </Flex>
    </Screen>
  );
}
