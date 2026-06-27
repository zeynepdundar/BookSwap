import { useState, useCallback, useMemo } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "native-base";
import { KeyboardAvoidingView, Platform } from "react-native";
import PhoneInput from "react-native-phone-input";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import i18n from "@/i18n";
import { verifyPhoneNumber } from "@/store/auth";
import { RootState } from "@/store/types";
import { AuthStackParamList } from "@/types/navigation.types";
import { normalizePhone } from "@/utils/helper";
import Screen from "@/components/ui/Screen";
import { APP_ICONS, APP_IMAGES } from "@/constants/image";

type Props = {
  navigation: NativeStackNavigationProp<
    AuthStackParamList,
    "PhoneInput"
  >;
};

export default function PhoneInputScreen({ navigation }: Props) {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState("tr");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { loading } = useSelector(
    (state: RootState) => state.auth
  );

  const handleVerifyPhoneNumber = useCallback(async () => {
    const cleaned = normalizePhone(phoneNumber);
    if (!cleaned) {
      return;
    }

    setError(null);
    const result = await dispatch(verifyPhoneNumber(cleaned));

    if (verifyPhoneNumber.fulfilled.match(result)) {
      navigation.navigate("CodeVerification");
    } else if (verifyPhoneNumber.rejected.match(result)) {
      const errorMsg = typeof result.payload === "string"
        ? result.payload
        : (result.payload as any)?.message || "Verification failed";
      setError(errorMsg);
    }
  }, [dispatch, phoneNumber, navigation]);

  const handlePhoneNumberChange = useCallback((value: string) => {
    setError(null);
    setPhoneNumber(value);
  }, []);

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
            source={APP_ICONS.app_logo}
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
            source={APP_IMAGES.swap_book_text}
            alt="title"
            width={120}
            mb="6"
          />

          <Text color="black.300" mb="8" width="300">
            {i18n.t("enter-your-phone-number")}
          </Text>

          <Box w="100%" maxW="280px" alignSelf="center">
            <Box
              flexDirection="row"
              alignItems="center"
              borderBottomWidth={1}
              borderBottomColor={
                error ? "error.500" : "gray.300"
              }

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
                  color: "#111113",
                  paddingVertical: 0,
                  margin: 0,
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
            <HStack space={2} mt={2} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="error-outline"
                size="4"
                color="error.500"
                mt="0.5"
              />
              <Text fontSize="xs" color="error.500">
                {error}
              </Text>
            </HStack>
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
