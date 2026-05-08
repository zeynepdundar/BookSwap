import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Spacer,
  ChevronLeftIcon,
  VStack,
  Box,
} from "native-base";
import i18n from "@/i18n";
import Screen from "@/components/shared/Screen";
import { setProfileData } from "@/store/profile/slice";
import StepHeader from "@/components/shared/StepHeader";

export default function BirthdateInputScreen({ navigation }) {

  const profileData = useSelector((state: any) => state.profile.profile);
  const birthdate = profileData.birthdate || ""

  const [birthYear, setBirthYear] = useState<string>(birthdate.split("-")[0] || "");
  const [birthMonth, setBirthMonth] = useState<string>(birthdate.split("-")[1] || "");
  const [birthDay, setBirthDay] = useState<string>(birthdate.split("-")[2] || "");

  const dayInputRef = useRef(null);
  const monthInputRef = useRef(null);
  const yearInputRef = useRef(null);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 150; // Assume a reasonable minimum age
  const maxYear = currentYear;

  const mergeDate = () => `${birthYear}-${birthMonth}-${birthDay}`;
  const isInputProvided =
    birthDay && birthMonth && birthYear && birthYear.length === 4;

  useEffect(() => {
    if (birthDay.length === 2) {
      monthInputRef.current?.focus();
    }
  }, [birthDay]);

  useEffect(() => {
    if (birthMonth.length === 2) {
      yearInputRef.current?.focus();
    }
  }, [birthMonth]);

  const pressHandler = () => {
    dispatch(setProfileData({ birthdate: mergeDate() }));
    navigation.navigate("GenderInput");
  };

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>
        <StepHeader
          onBack={() => navigation.goBack()}
        />
        <Spacer></Spacer>
        <Heading w="100%" h="8" px={10}>
          {i18n.t("my-birthdate")}
        </Heading>
        <Center w="100%" h="20" px={8}>
          <Flex direction="row" justifyContent="space-between" width={190}>
            {[
              {
                state: birthDay,
                setState: setBirthDay,
                ref: dayInputRef,
                placeholder: "DD",
              },
              {
                state: birthMonth,
                setState: setBirthMonth,
                ref: monthInputRef,
                placeholder: "MM",
              },
              {
                state: birthYear,
                setState: setBirthYear,
                ref: yearInputRef,
                placeholder: "YYYY",
              },
            ].map((input, index) => (
              <React.Fragment key={index}>
                <Input
                  value={input.state}
                  variant="underlined"
                  keyboardType="numeric" // Set keyboardType to "numeric"
                  maxLength={index === 2 ? 4 : 2}
                  width={index === 2 ? 82 : 45}
                  fontSize={20}
                  borderTopColor="none"
                  borderBottomColor="black.400"
                  placeholder={input.placeholder}
                  color="black.400"
                  textAlign="center"
                  px={index === 2 ? 0 : 1}
                  onChangeText={(enteredText) => {
                    const numericValue = enteredText.replace(/[^0-9]/g, "");
                    input.setState(numericValue);
                  }}
                  ref={input.ref}
                />
                {index < 2 && <Spacer />}
              </React.Fragment>
            ))}
          </Flex>
        </Center>
        <Spacer />
        <Center p={4}>
          <Button
            variant={isInputProvided ? "primary" : "disabled"}
            isDisabled={!isInputProvided}
            onPress={pressHandler}
          >
            {i18n.t("continue")}
          </Button>
        </Center>
      </VStack>
    </Screen>
  );
}
