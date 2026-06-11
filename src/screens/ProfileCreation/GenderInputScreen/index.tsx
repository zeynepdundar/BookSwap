import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import {
  Button,
  Center,
  Heading,
  Box,
  VStack,
  Text,
  Spacer,
  Pressable,
} from "native-base";
import i18n from "@/i18n";
import Screen from "@/components/shared/Screen";

import StepHeader from "@/components/shared/StepHeader";

import { setOnboardingGender } from "@/store/onboarding";

const OPTIONS = [
  { value: "f", label: i18n.t("woman") },
  { value: "m", label: i18n.t("man") },
];

export default function GenderInputScreen({ navigation }) {
  // ✅ read from onboarding slice instead of profile
  const onboardingGender = useSelector(
    (state: any) => state.onboarding.gender
  );

  const [gender, setGender] = useState<string>(onboardingGender || "");

  const dispatch = useAppDispatch();

  const pressHandler = () => {
    if (gender) {
      dispatch(setOnboardingGender(gender as "m" | "f"));
    }

    navigation.navigate("PhotoInput");
  };

  const skipHandler = () => {
    setGender("");
    dispatch(setOnboardingGender(null));
    navigation.navigate("PhotoInput");
  };

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>
        <StepHeader
          onBack={() => navigation.goBack()}
          onSkip={skipHandler}
        />

        <Spacer />

        <Heading w="100%" h="8" px={10}>
          {i18n.t("my-gender")}
        </Heading>

        <Center w="100%" h="40" px={8} pt="8">
          {OPTIONS.map((option) => {
            const isSelected = gender === option.value;

            return (
              <Pressable
                key={option.value}
                onPress={() => setGender(option.value)}
              >
                <Box
                  width={{ base: 250, lg: 200 }}
                  height={60}
                  justifyContent="center"
                  alignItems="center"
                  rounded="4px"
                  borderWidth={isSelected ? 2 : 1}
                  borderColor={isSelected ? "primary.500" : "black.400"}
                  mb={5}
                  bg={isSelected ? "primary.500:alpha.10" : "transparent"}
                >
                  <Text
                    color={isSelected ? "primary.500" : "black.400"}
                    textTransform="uppercase"
                    fontWeight="500"
                  >
                    {option.label}
                  </Text>
                </Box>
              </Pressable>
            );
          })}
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