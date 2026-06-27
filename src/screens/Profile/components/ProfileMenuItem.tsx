import { Flex, Text, Spacer, Pressable, Icon, Box, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

type ProfileMenuItemProps = {
  icon: string;
  label: string;
  onPress?: () => void;
  rightContent?: React.ReactNode;
  showBorder?: boolean;
  disabled?: boolean;
};

export default function ProfileMenuItem({
  icon,
  label,
  onPress,
  rightContent,
  showBorder = true,
  disabled = false,
}: ProfileMenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      isDisabled={disabled}
      width="100%"
      _pressed={{ opacity: 0.7 }}
    >
      <HStack
        alignItems="center"
        w="100%"
        py={4}
        px={1}
        space={6}
        borderBottomWidth={showBorder ? 1 : 0}
        borderBottomColor={showBorder ? "gray.200" : "transparent"}
        opacity={disabled ? 0.5 : 1}
      >
        <Icon
          as={MaterialIcons}
          name={icon}
          size="md"
          color="gray.500"
        />

        <Text
          flex={1}
          fontSize="md"
          color="gray.900"
          fontFamily="poppins-medium"
        >
          {label}
        </Text>

        {rightContent && (
          <Box alignItems="center">
            {rightContent}
          </Box>
        )}
      </HStack>
    </Pressable>
  );
}