import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  Button,
  Center,
  Heading,
  Box,
  ChevronLeftIcon,
  Radio,
  VStack,
  Text,
  Spacer,
  HStack,
} from "native-base";
import i18n from "@/i18n";
import Screen from "@/components/Screen";

import { setProfileData } from "@/store/profile-slice";
import StepHeader from "@/components/StepHeader";

const OPTIONS = [
  { value: "f", label: i18n.t("woman") },
  { value: "m", label: i18n.t("man") },
];

export default function GenderInputScreen({ navigation }) {
  const profileData = useSelector((state: any) => state.profile.profile);
  const initialGender = profileData.gender || "";
  const [gender, setGender] = useState<string>(initialGender);


  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const pressHandler = () => {
    dispatch(setProfileData({ gender: gender }));
    navigation.navigate("PhotoInput");
  };

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>
        <StepHeader
          onBack={() => navigation.goBack()}
          onSkip={pressHandler} />
        <Spacer></Spacer>
        <Heading w="100%" h="8" px={10}>
          {i18n.t("my-gender")}
        </Heading>
        <Center w="100%" h="40" px={8} pt="8">
          <Radio.Group
            name="genderRadioGroup"
            accessibilityLabel="Gender selection"
            value={gender}
            onChange={(nextValue) => {
              setGender(nextValue);
            }}
          >
            {OPTIONS.map((option) => (
              <Box
                key={option.value}
                width={{
                  base: 250,
                  lg: 200,
                }}
                height={60}
                alignItems="center"
                rounded="4px"
                borderColor={gender === option.value ? "primary.50" : "black.400"}
                borderWidth={gender === option.value ? "2" : "1"}
                py="12px"
                mb={5}
              >
                <Radio
                  value={option.value}
                  my="2"
                  ml="-5"
                  borderWidth={0}
                  bg="transparent"
                  icon={<Box boxSize={5} />}
                  colorScheme="primary"
                  _text={{
                    color: gender === option.value ? "primary.50" : "black.400",
                    textTransform: "uppercase",
                    fontWeight: "500",
                  }}
                >
                  {option.label}
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
