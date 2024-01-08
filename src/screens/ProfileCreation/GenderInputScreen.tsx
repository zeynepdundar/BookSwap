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
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { setProfileData } from "../../store/profile-slice";

export default function GenderInputScreen({ navigation }) {
  const [gender, setGender] = useState<string>("");

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();


  const pressHandler = () => {
    dispatch(setProfileData({gender:gender}));
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
        <Center w="100%" h="40" px={8} pt="8">
          <Radio.Group
            name="genderRadioGroup"
            defaultValue=""
            accessibilityLabel="Select your gender"
            value={gender}
            onChange={(nextValue) => {
              setGender(nextValue);
            }}
          >
            {["f", "m"].map((value) => (
              <Box
                key={value}
                width={{
                  base: 250,
                  lg: 200,
                }}
                height={60}
                alignItems="center"
                rounded="4px"
                borderColor={gender === value ? "primary.50" : "black.400"}
                borderWidth={gender === value ? "2" : "1"}
                py="12px"
                mb={5}
              >
                <Radio
                  value={value}
                  my="2"
                  ml="-5"
                  borderWidth={0} 
                  bg="transparent"
                  icon={<Box boxSize={5} />}
                  colorScheme="primary"
                  _text={{
                    color: gender === value ? "primary.50" : "black.400",
                    textTransform: "uppercase",
                    fontWeight: "500",
                  }}
                >
                  {value === "f" ?  i18n.t("woman"): i18n.t("man")}
                </Radio>
              </Box>
            ))}
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
