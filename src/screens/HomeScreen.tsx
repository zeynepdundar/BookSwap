import { Flex, Heading, Image, Pressable, Text } from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";
import SearchBar from "../components/shared/SearchBar";

export default function HomeScreen({ navigation }) {
  const jesse = require("../../assets/images/jesse-pinkman.png");

  return (
    <Screen>
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Flex>
          <Heading color="black.100" >
          {i18n.t("hello")}
            </Heading>
          <Text color="black.400" fontWeight="500" fontSize={16}>
            Jesse Pinkman
          </Text>
        </Flex>
        <Pressable onPress={() => navigation.navigate("ProfileStack")}>
          <Image source={jesse} alt="Notification" size={10} />
        </Pressable>
      </Flex>
      <SearchBar/>
    </Screen>
  );
}
