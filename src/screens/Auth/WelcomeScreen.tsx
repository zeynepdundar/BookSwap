import { Button, Center, Flex, Heading, Image } from "native-base";
import Screen from "../../components/Screen";
import i18n from "../../i18n";

export default function WelcomeScreen({ navigation }) {
  const importUrl = require("../../assets/images/infinite-library.png");

  const pressHandler = () => {
    navigation.navigate("AuthStack", { screen: "AuthVerification" })

    
  };

  return (
    <Screen>
      <Flex direction="column" mb="2.5" mt="20">
        <Center mb="7">
          <Image source={importUrl} alt="Infinite Library" size="375" />
        </Center>
        <Center>
          <Heading fontSize="lg" mb="3" color="black.100">
            {i18n.t("infinite-library")}
          </Heading>
        </Center>
        <Center>
          <Heading fontSize="18px" color="black.200" w={312}>
            {i18n.t("make-your-library-different")}
          </Heading>
        </Center>
        <Center>
          <Button m="7" variant="primary" onPress={pressHandler}>
            {i18n.t("get-started")}
          </Button>
        </Center>
      </Flex>
    </Screen>
  );
}
