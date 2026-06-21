import React from "react";
import { Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Box, HStack, Text } from "native-base";

export type ToastVariant = "error" | "info" | "success";

const VARIANTS: Record<
  ToastVariant,
  { icon: keyof typeof Feather.glyphMap; color: string }
> = {
  error: { icon: "alert-circle", color: "#FF6B6B" },
  info: { icon: "info", color: "#8AB4FF" },
  success: { icon: "check-circle", color: "#4ADE80" },
};

interface AppToastProps {
  message: string;
  hint?: string | null;
  variant?: ToastVariant;
}


export const AppToast: React.FC<AppToastProps> = ({
  message,
  hint = null,
  variant = "info",
}) => {
  const { icon, color } = VARIANTS[variant];

  return (
    <Box
      px="5"
      py="3"
      mb={Platform.OS === "ios" ? "105px" : "95px"}
      borderRadius="30px"
      bg="rgba(26, 26, 36, 0.96)"
      shadow="7"
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.12)"
      maxW="95%"
    >
      <HStack space={2.5} alignItems="center" justifyContent="center">
        <Feather name={icon} size={16} color={color} />

        <Text
          fontSize="xs"
          fontWeight="700"
          color="#FFFFFF"
          letterSpacing="0.4px"
          textAlign="center"
        >
          {message}
          {hint && (
            <Text fontWeight="400" color="#A0A0B0">
              {" • "}
              {hint}
            </Text>
          )}
        </Text>
      </HStack>
    </Box>
  );
};
