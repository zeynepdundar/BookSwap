import { Flex, Text, Spacer, Pressable, Icon, Box } from "native-base";
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
    <Pressable onPress={onPress} isDisabled={disabled} width="100%">
      <Flex
        direction="row"
        alignItems="center"
        w="100%"
        py="4"
        px="1"
        borderBottomWidth={showBorder ? 1 : 0}
        borderBottomColor={showBorder ? "coolGray.100" : "transparent"}
        opacity={disabled ? 0.5 : 1}
      >
        <Icon
          as={MaterialIcons}
          name={icon}
          size="md"
          color="coolGray.500"
        />

        <Text
          ml={3}
          fontSize="md"
          fontWeight="400"
          color="coolGray.800"
        >
          {label}
        </Text>

        <Spacer />

        {rightContent ? (
          <Box alignItems="center">
            {rightContent}
          </Box>
        ) : null}
      </Flex>
    </Pressable>
  );
}