import {
  Alert,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { Platform } from "react-native";
import { useState } from "react";
import Screen from "../../components/Screen";
import PhoneInput from "react-native-phone-input";
import i18n from "../../i18n";
import { MaterialIcons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  checkVerificationCode,
  // resendVerificationCode,
  verifyPhoneNumber,
} from "../../store/auth-actions";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { setVerificationCode } from "../../store/auth-slice";

export default function AuthVerificationScreen({ navigation }) {
  const appLogo = require("../../assets/images/app-icon-516x516.png");
  const swapBookText = require("../../assets/images/swap-book.png");

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState("");

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading, error, confirmationResult, verificationCode } = useSelector(
    (state: any) => state.auth
  );

  const handleVerifyPhoneNumber = () => {
    dispatch(verifyPhoneNumber(phoneNumber));
  };

  const handleCheckVerificationCode = () => {
    dispatch(checkVerificationCode({ confirmationResult, verificationCode }));
    // setPhoneNumber("");
  };

  //Check if later, now not seem to be working on firebase
  const handleResendVerificationCode = () => {
    // Check if confirmationResult is available
    if (confirmationResult) {
      // Dispatch the async thunk to resend the verification code
    } else {
      // Handle the case where confirmationResult is not available
      console.error("Confirmation result is not available.");
    }
  };

  return (
    <Screen>
      {/* Phone Input Screen */}
      {(!confirmationResult || error?.type === "verifyPhoneNumberError") && (
        <>
          <Flex direction="column" m="3" mt="20">
            <Center mb={30}>
              <Image source={appLogo} alt="Book Swap Logo" size={60} mb={2} />
              <Image source={swapBookText} alt="Book Swap" width={120} />
            </Center>
            <Center>
              <Text color="black.300" mb="12">
                {i18n.t("enter-your-phone-number")}
              </Text>
            </Center>
            <Center>
              <Box
                width={{
                  base: 300,
                  lg: 250,
                }}
                maxW="80"
                rounded="4px"
                overflow="hidden"
                borderColor={error ? "error.500" : "black.500"}
                borderWidth="1"
                px="17px"
                py="12px"
                justifyContent="center"
              >
                <PhoneInput
                  onChangePhoneNumber={(val) => {
                    setPhoneNumber(val);
                  }}
                  initialCountry={"tr"}
                  ref={(ref) => {
                    ref ? setCountryCode(ref.getCountryCode()) : 1;
                  }}
                  flagStyle={{ width: 32, height: 24, borderWidth: 0 }}
                  textStyle={{
                    fontSize: 16,
                    fontFamily: "poppins-regular",
                    color: "#808085",
                    paddingVertical: 0, // Remove extra vertical padding
                    lineHeight: Platform.OS === "android" ? 21 : 24, // Align lineHeight to fontSize
                    textAlignVertical: "center",
                  }}
                  offset={20}
                  textProps={{
                    maxLength: 17,
                    allowFontScaling: false,
                  }}
                  autoFormat={true}
                />
              </Box>
              {error && (
                <Flex direction="row" width="100%" px="4" py="2">
                  <Icon
                    size="4"
                    color="error.500"
                    as={<MaterialIcons name="error-outline" />}
                  />
                  <Text px={2} fontSize="xs" color="error.500">
                    {error.message}
                  </Text>
                </Flex>
              )}
            </Center>
            <Center>
              <Button
                variant="primary"
                mt={60}
                onPress={() => {
                  handleVerifyPhoneNumber();
                }}
              >
                {i18n.t("send")}
              </Button>
            </Center>
          </Flex>
        </>
      )}
      {/* Verification Code Screen */}
      {(confirmationResult || error?.type === "checkVerificationCodeError") && (
        <VStack space={1} alignItems="center" height={"50%"}>
          <Spacer></Spacer>
          <Heading w="100%" h="8" px={10}>
            {i18n.t("verification-code")}
          </Heading>
          <Text w="100%" color="black.300" px={10} mb="6">
            {i18n.t("type-verification-code")}
          </Text>
          <Center>
            <Input
              variant="underlined"
              keyboardType="numeric"
              maxLength={6}
              width={200}
              fontSize={20}
              borderTopColor="none"
              borderBottomColor="black.300"
              color="black.300"
              textAlign="center"
              onChangeText={(enteredText) => {
                const numericValue = enteredText.replace(/[^0-9]/g, "");
                dispatch(setVerificationCode(numericValue));
              }}
            />
            {/* <Center>
              <Text
                color="black.300"
                mt="5"
                onPress={() => {
                  handleResendVerificationCode();
                }}
              >
                {i18n.t("resend-code-text-1")}
                <Text color="primary.50"> {i18n.t("resend-code-text-2")}</Text>
              </Text>
            </Center> */}
            <Center mt={10}>
              <Button
                variant="primary"
                onPress={() => {
                  handleCheckVerificationCode();
                }}
              >
                {i18n.t("confirm")}
              </Button>
            </Center>
            {error && (
              <Alert
                w="80%"
                borderRadius="10px"
                backgroundColor="black.700"
                mt={5}
              >
                <Text fontSize="sm" fontWeight="medium" color="#dddddd">
                  {error.message}
                </Text>
              </Alert>
            )}
          </Center>
        </VStack>
      )}

    </Screen>
  );
}
