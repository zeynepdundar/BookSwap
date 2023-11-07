import { useState } from "react";
import {
  Button,
  Center,
  Heading,
  Box,
  ArrowBackIcon,
  Radio,
  Flex,
  VStack,
  Text,
  Spacer,
} from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";

export default function GenderInputScreen({ navigation }) {
  const [gender, setGender] = useState<string>("");

  const pressHandler = () => {
    navigation.navigate("Photo");
  };

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>
        <Center w="100%" h="20" justifyContent="space-between">
          <Flex direction="row" justifyContent="space-between" w="100%" h="10">
            <Button
              backgroundColor="transparent"
              variant="ghost"
              leftIcon={<ArrowBackIcon size="6" color="#212325" pr="0" />}
              _pressed={{
                bg: "transparent",
              }}
              onPress={() => navigation.goBack()}
            ></Button>
            <Box justifyContent="center">
              <Text
                onPress={() => navigation.navigate("Library")}
                color="#969696"
                fontWeight="500"
                fontSize="14px"
                px={4}
              >
                {i18n.t("skip").toUpperCase()}
              </Text>
            </Box>
          </Flex>
        </Center>
        <Heading w="100%" h="8" px={6}>
          {i18n.t("my-gender")}
        </Heading>
        <Center w="100%" h="40" px={8}>
          <Radio.Group
            name="genderRadioGroup"
            defaultValue=""
            accessibilityLabel="Select your gender"
            value={gender}
            onChange={(nextValue) => {
              setGender(nextValue);
            }}
          >
            <Box
              width={{
                base: 250,
                lg: 200,
              }}
              height={60}
              alignItems="center"
              rounded="4px"
              borderColor={gender === "woman" ? "primary.50" : "black.400"}
              borderWidth={gender === "woman" ? "2" : "1"}
              py="12px"
              mb={5}
            >
              <Radio
                value="woman"
                my="2"
                _text={{
                  color: gender === "woman" ? "primary.50" : "black.400",
                  textTransform: "uppercase",
                  fontWeight: "500",
                }}
              >
                {i18n.t("woman")}
              </Radio>
            </Box>
            <Box
              width={{
                base: 250,
                lg: 200,
              }}
              height={60}
              alignItems="center"
              rounded="4px"
              borderColor={gender === "man" ? "primary.50" : "black.400"}
              borderWidth={gender === "man" ? "2" : "1"}
              py="12px"
            >
              <Radio
                value="man"
                my="2"
                _text={{
                  color: gender === "man" ? "primary.50" : "black.400",
                  textTransform: "uppercase",
                  fontWeight: "500",
                }}
              >
                {i18n.t("man")}
              </Radio>
            </Box>
          </Radio.Group>
        </Center>
        <Spacer />
        <Center p={4}>
          <Button variant="primary" onPress={pressHandler}>
            {i18n.t("continue")}
          </Button>
        </Center>
      </VStack>
    </Screen>
  );
}
