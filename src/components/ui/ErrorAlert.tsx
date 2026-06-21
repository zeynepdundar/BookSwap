import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Box, Center, HStack, Text } from "native-base";

interface ErrorAlertProps {
  message: string | null | undefined;
  hint?: string | null;
  /** How long the alert stays visible before auto-dismissing, in ms. */
  duration?: number;
  /** Called once the alert has auto-dismissed, so parents can clear their state. */
  onDismiss?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  hint = null,
  duration = 4000,
  onDismiss,
}) => {
  // Keep the last non-empty message so the fade-out animation can finish
  // even after the parent clears its state.
  const [visibleMessage, setVisibleMessage] = useState<string | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!message) return;

    setVisibleMessage(message);

    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setVisibleMessage(null);
          onDismiss?.();
        }
      });
    }, duration);

    return () => clearTimeout(timer);
    // Re-trigger whenever a new message arrives.
  }, [message, duration]);

  if (!visibleMessage) return null;

  return (
    <Center
      position="absolute"
      bottom={Platform.OS === "ios" ? "105px" : "95px"}
      left={0}
      right={0}
      zIndex={999}
    >
      <Animated.View style={{ opacity }}>
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
              {visibleMessage}
              {hint && (
                <Text fontWeight="400" color="#A0A0B0">
                  {" • "}
                  {hint}
                </Text>
              )}
            </Text>
          </HStack>
        </Box>
      </Animated.View>
    </Center>
  );
};
