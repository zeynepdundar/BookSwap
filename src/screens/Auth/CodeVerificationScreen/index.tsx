import React, { useCallback, useMemo } from "react";
import {
  Alert,
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
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import i18n from "@/i18n";
import {
  checkVerificationCode,
  setVerificationCode,
} from "@/store/auth";
import { RootState } from "@/store/types";
import { AuthStackParamList } from "@/types/navigation.types";
import Screen from "@/components/shared/Screen";
import { clearAuthError } from "@/store/auth/slice";

type Props = {
  navigation: NativeStackNavigationProp<
    AuthStackParamList,
    "CodeVerification"
  >;
};

export default function CodeVerificationScreen({ navigation }: Props) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading, error, verificationId, verificationCode } = useSelector(
    (state: RootState) => state.auth
  );

  const handleCheckVerificationCode = useCallback(() => {
    if (verificationId) {
      dispatch(checkVerificationCode({ verificationId, verificationCode }));
    }
  }, [dispatch, verificationId, verificationCode]);

  const handleVerificationCodeChange = useCallback((enteredText: string) => {

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
            width={200}
            fontSize={20}
            borderTopColor="none"
            borderBottomColor="black.300"
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
            <Alert mt="5" w="80%" borderRadius="10px">
              <Text fontSize="sm">{error.message}</Text>
            </Alert>
          )}
        </VStack>
      </KeyboardAvoidingView>
    </Screen>
  );
}
