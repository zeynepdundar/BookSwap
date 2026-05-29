import { useState, useCallback, useMemo } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Text,
  VStack,
} from "native-base";
import { KeyboardAvoidingView, Platform } from "react-native";
import PhoneInput from "react-native-phone-input";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

import i18n from "@/i18n";
import { verifyPhoneNumber } from "@/store/auth";
import { RootState } from "@/store/types";
import { AuthStackParamList } from "@/types/navigation.types";
import { normalizePhone } from "@/utils/helper";
import Screen from "@/components/shared/Screen";
import { clearAuthError } from "@/store/auth/slice";

const ASSETS = {
  appLogo: require("@/assets/images/app-icon-516x516.png"),
  swapBookText: require("@/assets/images/swap-book.png"),
} as const;

type Props = {
  navigation: NativeStackNavigationProp<
    AuthStackParamList,
    "PhoneInput"
  >;
};

export default function PhoneInputScreen({ navigation }: Props) {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState("tr");

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(clearAuthError());
    }, [dispatch])
  );

const handleVerifyPhoneNumber = useCallback(async () => {
  const cleaned = normalizePhone(phoneNumber);
  if (!cleaned) return;

  const result = await dispatch(verifyPhoneNumber(cleaned));

  if (verifyPhoneNumber.fulfilled.match(result)) {
    navigation.navigate("CodeVerification");
  }
}, [dispatch, phoneNumber, navigation]);

const handlePhoneNumberChange = useCallback((value: string) => {
  setPhoneNumber(value);
}, [dispatch]);

  const handleCountryRef = useCallback((ref: any) => {
    if (ref) setCountryCode(ref.getCountryCode() || "tr");
  }, []);

  const isPhoneValid = useMemo(() => {
    const cleaned = normalizePhone(phoneNumber);
    return !!cleaned && cleaned.length > 6;
  }, [phoneNumber]);

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <VStack alignItems="center" h="100%">
          <Image
            source={ASSETS.appLogo}
            alt="logo"
            size={60}
            mt="16"
          />
          <Icon
            as={<MaterialIcons name="close" />}
            size={6}
            position="absolute"
            top={12}
            right={4}
            onPress={() => navigation.navigate("Welcome")}
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

          <Box width="300px">
            <Box
              flexDirection="row"
              alignItems="center"
              borderBottomWidth={1}
              borderBottomColor={error ? "#E53E3E" : "#CBD5E0"}
              paddingBottom={4}
            >
              <PhoneInput
                onChangePhoneNumber={handlePhoneNumberChange}
                initialCountry={countryCode}
                ref={handleCountryRef}
                autoFormat
                textProps={{
                  maxLength: 17,
                  allowFontScaling: false,
                }}
                textStyle={{
                  fontSize: 24,
                  fontFamily: "poppins-regular",
                  color: "#111",
                  paddingVertical: 0,
                  margin: 0,
                  lineHeight: 0,
                  textAlignVertical: "center",
                }}
                style={{
                  flex: 1,
                  borderWidth: 0,
                }}
              />
            </Box>
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

          <Button
            mt="10"
            isLoading={loading}
            variant="primary"
            onPress={handleVerifyPhoneNumber}
            isDisabled={!isPhoneValid}
          >
            {i18n.t("send")}
          </Button>
        </VStack>
      </KeyboardAvoidingView>
    </Screen>
  );
}
