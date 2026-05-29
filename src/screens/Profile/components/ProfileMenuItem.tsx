import { Flex, Text, Spacer, Pressable, Image, Box } from "native-base";

type ProfileMenuItemProps = {
  icon: any;
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
        p="1"
        pb="5"
        mt="4"
        overflow="hidden"
        borderBottomColor={showBorder ? "#f5f5f5" : "transparent"}
        borderBottomWidth={showBorder ? 2 : 0}
        opacity={disabled ? 0.5 : 1}
      >
        <Image source={icon} alt={label} />

        <Text ml={3} color="black.400" fontWeight="500" fontSize={16}>
          {label}
        </Text>
 
        <Spacer />

        {rightContent ? (
          <Box alignSelf="center" maxW="20" px={1}>
            {rightContent}
          </Box>
        ) : null}
      </Flex>
    </Pressable>
  );
}