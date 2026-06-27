import { useCallback, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Heading,
  Icon,
  Input,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { KeyboardAvoidingView, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import i18n from "@/i18n";
import {
  checkVerificationCode,
  setVerificationCode,
} from "@/store/auth";
import { RootState } from "@/store/types";
import { AuthStackParamList } from "@/types/navigation.types";
import Screen from "@/components/ui/Screen";

type Props = {
  navigation: NativeStackNavigationProp<
    AuthStackParamList,
    "CodeVerification"
  >;
};

export default function CodeVerificationScreen({ navigation }: Props) {
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { loading, verificationId, verificationCode } = useSelector(
    (state: RootState) => state.auth
  );

  const handleCheckVerificationCode = useCallback(async () => {
    if (!verificationId) return;

    setError(null);
    const result = await dispatch(checkVerificationCode({ verificationId, verificationCode }));

    if (checkVerificationCode.rejected.match(result)) {
      const errorMsg = typeof result.payload === "string"
        ? result.payload
        : (result.payload as any)?.message || "Verification failed";
      setError(errorMsg);
    }
  }, [dispatch, verificationId, verificationCode]);

  const handleVerificationCodeChange = useCallback((enteredText: string) => {
    setError(null);
    const numericValue = enteredText.replace(/[^0-9]/g, "");
    dispatch(setVerificationCode(numericValue));
  }, [dispatch]);

  const isCodeValid = verificationCode?.length === 6;

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <VStack space={1} alignItems="center" h="100%">
          <Pressable
            position="absolute"
            top={12}
            right={4}
            onPress={() => navigation.navigate("Welcome")}
            zIndex={10}
            hitSlop={10}
          >
            <Icon as={<MaterialIcons name="close" />} size={6} />
          </Pressable>
          <Heading mt="16">{i18n.t("verification-code")}</Heading>

          <Text width={300} mb="6" color="black.300">
            {i18n.t("type-verification-code")}
          </Text>

          <Input
            variant="underlined"
            keyboardType="numeric"
            maxLength={6}
            w="100%"
            maxW="160px"
            alignSelf="center"
            fontSize={24}
            borderTopColor="none"
            borderBottomColor={error ? "error.500" : "gray.300"}
            _focus={{
              borderBottomColor: error ? "error.500" : "primary.500",
            }}
            textAlign="center"
            value={verificationCode}
            onChangeText={handleVerificationCodeChange}

          />

          <Button
            mt="10"
            isLoading={loading}
            variant="primary"
            isDisabled={!isCodeValid}
            onPress={handleCheckVerificationCode}
          >
            {i18n.t("confirm")}
          </Button>

          {error && (
            <Box mt={5} px={4} py={3} bg="error.50" borderRadius="md">
              <Text fontSize="sm" color="error.500" fontWeight="500">
                {error}
              </Text>
            </Box>
          )}
        </VStack>
      </KeyboardAvoidingView>
    </Screen>
  );
}
