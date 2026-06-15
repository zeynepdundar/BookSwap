import React from "react";
import { Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Box, Center, HStack, Text } from "native-base";

interface ErrorAlertProps {
  message: string | null | undefined;
  hint?: string | null;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, hint = null }) => {
  if (!message) return null;

  return (
    <Center
      position="absolute"
      bottom={Platform.OS === "ios" ? "105px" : "95px"}
      left={0}
      right={0}
      zIndex={999}
    >
      <Box
        px="5"
        py="3"
        borderRadius="30px" 
        bg="rgba(26, 26, 36, 0.96)" 
        shadow="7"
        borderWidth="1px"
        borderColor="rgba(255, 255, 255, 0.12)" 
        maxW="85%"
      >
        <HStack space={2.5} alignItems="center" justifyContent="center">
          <Feather name="alert-circle" size={16} color="#FF6B6B" />

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
    </Center>
  );
};