import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { Box, Pressable, Text } from "native-base";
import i18n from "@/i18n";

type InlineAction = {
  type: string;
  label: string;
  onPress: () => void;
};

type InlineActionSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  actions?: InlineAction[];
};

/**
 * A bottom action sheet rendered inside the current view tree (NOT a native
 * Modal). native-base's Actionsheet uses an RN Modal which, on Android, opens a
 * separate native window over the live CameraView and makes its SurfaceView go
 * black. Keeping the sheet in the same window avoids that flash.
 */
export const InlineActionSheet = ({
  isOpen,
  onClose,
  actions = [],
}: InlineActionSheetProps) => {
  const [mounted, setMounted] = useState(isOpen);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else if (mounted) {
      Animated.timing(progress, {
        toValue: 0,
        duration: 180,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }
  }, [isOpen]);

  if (!mounted) return null;

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],
  });

  return (
    <Box style={StyleSheet.absoluteFill} justifyContent="flex-end" zIndex={100}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <Animated.View style={[styles.backdrop, { opacity: progress }]} />
      </Pressable>

      <Animated.View style={{ transform: [{ translateY }] }}>
        <Box alignItems="center" px={2} py={2} roundedTop={20} bg="white" safeAreaBottom>
          <Box pt={3} pb={3} mt={-2} width="100%" alignItems="center">
            <Box height={1} width={10} borderRadius={2} bg="muted.500" />
          </Box>
          {actions.map((action, index) => (
            <Pressable
              key={`${action.type}:${index}`}
              onPress={action.onPress}
              width="100%"
              justifyContent="flex-start"
              p={4}
              bg="muted.50"
              _pressed={{ bg: "muted.400" }}
            >
              <Text color="text.900" fontSize="md" fontWeight="normal">
                {i18n.t(action.label)}
              </Text>
            </Pressable>
          ))}
        </Box>
      </Animated.View>
    </Box>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
