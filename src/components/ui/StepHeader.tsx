import { Box, Button, HStack, Text, ChevronLeftIcon } from "native-base";

type Props = {
  onBack?: () => void;
  onSkip?: () => void;
  skipLabel?: string;
};

export default function StepHeader({ onBack, onSkip, skipLabel = "SKIP" }: Props) {
  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      h="38px"
      px={0}
    >
      {/* Left side: Back */}
      <Box>
        {onBack ? (
          <Button
            variant="ghost"
            leftIcon={<ChevronLeftIcon size="6" color="black.100" />}
            _pressed={{ bg: "transparent" }}
            onPress={onBack}
          />
        ) : (
          <Box w="40px" />
        )}
      </Box>

      {/* Right side: Skip */}
      <Box>
        {onSkip ? (
          <Text
            onPress={onSkip}
            color="#969696"
            fontWeight="500"
            fontSize="14px"
            px={4}
          >
            {skipLabel}
          </Text>
        ) : (
          <Box w="40px" />
        )}
      </Box>
    </HStack>
  );
}