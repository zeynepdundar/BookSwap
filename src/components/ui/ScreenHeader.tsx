import { HStack, Heading, Icon, Pressable, Box } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 56;

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
}

export default function ScreenHeader({
  title,
  onBack,
}: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <Box
      w="100%"
      px={4}
      bg="#fff"
      style={{ paddingTop: insets.top }}
    >
      <HStack alignItems="center" w="100%" h={`${HEADER_HEIGHT}px`}>
        <Box w={10} alignItems="center" justifyContent="center">
          {onBack && (
            <Pressable onPress={onBack} hitSlop={8}>
              <Icon
                as={MaterialIcons}
                name="chevron-left"
                size="8"
                color="#212325"
              />
            </Pressable>
          )}
        </Box>

        <Box flex={1} alignItems="center" justifyContent="center">
          <Heading fontWeight="500" size="xl">
            {title}
          </Heading>
        </Box>

        <Box w={10} />
      </HStack>
    </Box>
  );
}
