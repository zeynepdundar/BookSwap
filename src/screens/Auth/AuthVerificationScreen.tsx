import React, { useState, useCallback, useMemo } from "react";
import {
  Alert,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  Text,
  VStack,
} from "native-base";
import { KeyboardAvoidingView, Platform } from "react-native";
import PhoneInput from "react-native-phone-input";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import i18n from "@/i18n";
import {
  checkVerificationCode,
  verifyPhoneNumber,
  setVerificationCode,
} from "@/store/auth";
import { RootState } from "@/store/types";
import { AuthStackParamList } from "@/types/navigation.types";
import { normalizePhone } from "@/utils/helper";
import Screen from "@/components/Screen";


const ASSETS = {
  appLogo: require("@/assets/images/app-icon-516x516.png"),
  swapBookText: require("@/assets/images/swap-book.png"),
} as const;

type Props = {
  navigation: NativeStackNavigationProp<
    AuthStackParamList,
    "AuthVerification"
  >;
};


export default function AuthVerificationScreen({ navigation }: Props) {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState("tr");

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading, error, verificationId, verificationCode } = useSelector(
    (state: RootState) => state.auth
  );

  const isCodeStep = useMemo(() => Boolean(verificationId), [verificationId]);

  const handleVerifyPhoneNumber = useCallback(() => {
    const cleaned = normalizePhone(phoneNumber);
    if (!cleaned) return;

    dispatch(verifyPhoneNumber(cleaned));
  }, [dispatch, phoneNumber]);

  const handleCheckVerificationCode = useCallback(() => {
    if (verificationId) {
      dispatch(checkVerificationCode({ verificationId, verificationCode }));
    }
  }, [dispatch, verificationId, verificationCode]);

  const handlePhoneNumberChange = useCallback((value: string) => {
    setPhoneNumber(value);
  }, []);

  const handleVerificationCodeChange = useCallback((enteredText: string) => {
    const numericValue = enteredText.replace(/[^0-9]/g, "");
    dispatch(setVerificationCode(numericValue));
  }, [dispatch]);

  const handleCountryRef = useCallback((ref: any) => {
    if (ref) setCountryCode(ref.getCountryCode() || "tr");
  }, []);

  const PhoneStep = (
    <VStack alignItems="center" h="100%">
      <Image
        source={ASSETS.appLogo}
        alt="logo"
        size={60}
        mt="16"
      />

      <Image
        source={ASSETS.swapBookText}
        alt="title"
        width={120}
        mb="6"
      />

      <Text color="black.300" mb="8" width="300">
        {i18n.t("enter-your-phone-number")}
      </Text>

      <Box
        width={{base: 300, lg: 250}}
        borderWidth={1}
        borderColor={error ? "error.500" : "black.500"}
        rounded="4px"
        px="17px"
        py="12px"
      >
        <PhoneInput
          onChangePhoneNumber={handlePhoneNumberChange}
          initialCountry={countryCode}
          ref={handleCountryRef}
          autoFormat={true}
          textProps={{
            maxLength: 17,
            allowFontScaling: false,
          }}
          textStyle={{
            fontSize: 16,
            fontFamily: "poppins-regular",
            color: "#808085",
            paddingVertical: 0,
            lineHeight: Platform.OS === "android" ? 21 : 24,
            textAlignVertical: "center",
          }}
        />
      </Box>

      {error && (
        <Flex direction="row" mt="2">
          <Icon
            size="4"
            color="error.500"
            as={<MaterialIcons name="error-outline" />}
          />
          <Text fontSize="xs" color="error.500" px="2">
            {error.message}
          </Text>
        </Flex>
      )}

      <Button mt="10" isLoading={loading} variant="primary" onPress={handleVerifyPhoneNumber}>
        {i18n.t("send")}
      </Button>
    </VStack>
  );

  const CodeStep = (
    <VStack space={1} alignItems="center" h="100%">
      <Heading mt="16">{i18n.t("verification-code")}</Heading>

      <Text width={300} mb="6" color="black.300">
        {i18n.t("type-verification-code")}
      </Text>

      <Input
        variant="underlined"
        keyboardType="numeric"
        maxLength={6}
        width={200}
        fontSize={20}
        borderTopColor="none"
        borderBottomColor="black.300"
        textAlign="center"
        value={verificationCode}
        onChangeText={handleVerificationCodeChange}
      />

      <Button mt="10" isLoading={loading} variant="primary" onPress={handleCheckVerificationCode}>
        {i18n.t("confirm")}
      </Button>

      {error && (
        <Alert mt="5" w="80%" borderRadius="10px">
          <Text fontSize="sm">{error.message}</Text>
        </Alert>
      )}
    </VStack>
  );

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {isCodeStep ? CodeStep : PhoneStep}
      </KeyboardAvoidingView>
    </Screen>
  );
}