import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
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

import { setProfileData } from "@/store/profile/slice";
import StepHeader from "@/components/shared/StepHeader";

const OPTIONS = [
  { value: "f", label: i18n.t("woman") },
  { value: "m", label: i18n.t("man") },
];

export default function GenderInputScreen({ navigation }) {
  const profileData = useSelector((state: any) => state.profile.profile);
  const initialGender = profileData?.gender || "";
  const [gender, setGender] = useState<string>(initialGender);


  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

const pressHandler = () => {
  if (!gender) return;

  dispatch(setProfileData({ gender }));
  navigation.navigate("PhotoInput");
};

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>
        {/* Backend requires gender, so requirements and Skip behavior should be reviewed together. */}
        <StepHeader
          onBack={() => navigation.goBack()}
          //onSkip={pressHandler} 
          />
        <Spacer></Spacer>
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
        borderColor={isSelected ? "primary.50" : "black.400"}
        mb={5}
        bg={isSelected ? "primary.50:alpha.10" : "transparent"}
      >
        <Text
          color={isSelected ? "primary.50" : "black.400"}
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
          <Button variant="primary" isDisabled={!gender} onPress={pressHandler}>
            {i18n.t("continue")}
          </Button>
        </Center>
      </VStack>
    </Screen>
  );
}
