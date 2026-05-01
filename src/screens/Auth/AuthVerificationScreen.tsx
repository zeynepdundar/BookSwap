import React, { useState, useCallback } from "react";
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
  Text,
  VStack,
} from "native-base";
import { KeyboardAvoidingView, Platform } from "react-native";
import PhoneInput from "react-native-phone-input";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Screen from "@/components/Screen";
import i18n from "@/i18n";
import {
  checkVerificationCode,
  verifyPhoneNumber,
} from "@/store/auth/auth-actions";
import { setVerificationCode } from "@/store/auth/auth-slice";
import { AuthStackParamList } from "@/types/navigation";
import { RootState } from "@/store/types";
import { normalizePhone } from "@/utils/helper";

const APP_IMAGES = {
  appLogo: require("@/assets/images/app-icon-516x516.png"),
  swapBookText: require("@/assets/images/swap-book.png"),
} as const;

const DIMENSIONS = {
  imageSize: 60,
  textWidth: 300,
  inputWidth: 200,
  phoneInputWidth: { base: 300, lg: 250 },
} as const;

type AuthVerificationScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "AuthVerification">;
};



export default function AuthVerificationScreen({ navigation }: AuthVerificationScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState("tr");

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading, error, verificationId, verificationCode } = useSelector(
    (state: RootState) => state.auth
  );

  const showVerificationCodeScreen = Boolean(verificationId);

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

  const handlePhoneInputRef = useCallback((ref: any) => {
    if (ref) {
      setCountryCode(ref.getCountryCode() || "tr");
    }
  }, []);

  // Phone Input Screen
  const renderPhoneInputScreen = () => (
    <VStack alignItems="center" h="100%">
      <Image
        source={APP_IMAGES.appLogo}
        alt="Book Swap Logo"
        size={DIMENSIONS.imageSize}
        mb={2}
        mt="16"
      />
      <Image
        source={APP_IMAGES.swapBookText}
        alt="Book Swap"
        width={120}
        mb="6"
      />
      <Text color="black.300" mb="8" width={DIMENSIONS.textWidth}>
        {i18n.t("enter-your-phone-number")}
      </Text>

      <Box
        width={DIMENSIONS.phoneInputWidth}
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
          onChangePhoneNumber={handlePhoneNumberChange}
          initialCountry={countryCode}
          ref={handlePhoneInputRef}
          flagStyle={{ width: 32, height: 24, borderWidth: 0 }}
          textStyle={{
            fontSize: 16,
            fontFamily: "poppins-regular",
            color: "#808085",
            paddingVertical: 0,
            lineHeight: Platform.OS === "android" ? 21 : 24,
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
        <Flex direction="row" width="92%" px="4" pt="1">
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

      <Button
        mt="10"
        variant="primary"
        onPress={handleVerifyPhoneNumber}
        isLoading={loading}
      >
        {i18n.t("send")}
      </Button>
    </VStack>
  );

  // Verification Code Screen
  const renderVerificationCodeScreen = () => (
    <VStack space={1} alignItems="center" height="100%">
      <Heading w="100%" h="8" px={6} mt="16" mb="2">
        {i18n.t("verification-code")}
      </Heading>
      <Text w={DIMENSIONS.textWidth} color="black.300" mb="6">
        {i18n.t("type-verification-code")}
      </Text>

      <Center>
        <Input
          variant="underlined"
          keyboardType="numeric"
          maxLength={6}
          width={DIMENSIONS.inputWidth}
          fontSize={20}
          borderTopColor="none"
          borderBottomColor="black.300"
          color="black.300"
          textAlign="center"
          onChangeText={handleVerificationCodeChange}
          value={verificationCode}
        />

        <Center mt={10}>
          <Button
            variant="primary"
            onPress={handleCheckVerificationCode}
            isLoading={loading}
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
  );

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {showVerificationCodeScreen ? renderVerificationCodeScreen() : renderPhoneInputScreen()}
      </KeyboardAvoidingView>
    </Screen>
  );
}