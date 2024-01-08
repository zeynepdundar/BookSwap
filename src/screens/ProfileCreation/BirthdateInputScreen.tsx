import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Spacer,
  ArrowBackIcon,
  VStack,
} from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { setProfileData } from "../../store/profile-slice";

export default function BirthdateInputScreen({ navigation }) {
  const [birthDay, setBirthDay] = useState<any>('');
  const [birthMonth, setBirthMonth] = useState<any>('');
  const [birthYear, setBirthYear] = useState<any>('');

  const dayInputRef = useRef(null);
  const monthInputRef = useRef(null);
  const yearInputRef = useRef(null);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 150; // Assume a reasonable minimum age
  const maxYear = currentYear;

  const mergeDate = () => `${birthYear}-${birthMonth}-${birthDay}`;

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
    navigation.navigate("Gender");
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
          </Flex>
        </Center>
        <Heading w="100%" h="8" px={6}>
          {i18n.t("my-birthdate")}
        </Heading>
        <Center w="100%" h="20" px={8}>
          <Flex direction="row" justifyContent="justify" width={190}>
            {[
            { state: birthDay, setState: setBirthDay, ref: dayInputRef, placeholder: "DD" },
            { state: birthMonth, setState: setBirthMonth, ref: monthInputRef, placeholder: "MM" },
            { state: birthYear, setState: setBirthYear, ref: yearInputRef, placeholder: "YYYY" },
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
                    const numericValue = enteredText.replace(/[^0-9]/g, '');
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
          <Button variant="primary" onPress={pressHandler}>
            {i18n.t("continue")}
          </Button>
        </Center>
      </VStack>
    </Screen>
  );
}
