import { Button, Center, Flex, Heading, Image, Spacer, VStack } from "native-base";
import Screen from "../../components/Screen";
import i18n from "../../i18n";

export default function WelcomeScreen({ navigation }) {
  const importUrl = require("../../assets/images/infinite-library.png");

  const pressHandler = () => {
    navigation.navigate("AuthStack", { screen: "AuthVerification" });
  };

  return (
    <Screen>
      <VStack space={2} alignItems="center" height={"100%"}>
        <Image source={importUrl} alt="Infinite Library" size="375" mt="50"/>
        <Heading fontSize="22px" mb="2">
          {i18n.t("infinite-library")}
        </Heading>
        <Heading color="black.200" w={312}>
          {i18n.t("make-your-library-different")}
        </Heading>
        <Button m="7" variant="primary" onPress={pressHandler}>
          {i18n.t("get-started")}
        </Button>
      </VStack>
    </Screen>
  );
}
