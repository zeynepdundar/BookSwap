import { HStack, Heading, Icon, Pressable, Box } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
}

export default function ScreenHeader({
  title,
  onBack,
}: ScreenHeaderProps) {
  return (
    <HStack alignItems="center" w="100%" h="50px">
      <Box w={10}>
        {onBack && (
          <Pressable onPress={onBack}>
            <Icon
              as={MaterialIcons}
              name="chevron-left"
              size="8"
              color="#212325"
            />
          </Pressable>
        )}
      </Box>

      <Box flex={1} alignItems="center">
        <Heading>{title}</Heading>
      </Box>

      <Box w={10} />
    </HStack>
  );
}