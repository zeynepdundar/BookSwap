import { HStack, Text, Icon, Pressable, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "@/i18n";

interface HomeSearchWidgetProps {
  navigation: any;
  isHome?: boolean;
  sourceScreen?: string | null;
}

export function HomeSearchWidget({ navigation, sourceScreen, isHome = false, }: HomeSearchWidgetProps) {

  const handleTextSearchPress = () => {
    const targetScreen = isHome ? "BookSearch" : "BookSearchOnCreation";
    navigation.navigate(targetScreen, !isHome ? { sourceScreen } : undefined);
  };

  const handleBarcodePress = () => {
    const targetScreen = isHome ? "BarcodeScanner" : "BarcodeScannerOnProfileCreation";
    navigation.navigate(targetScreen, !isHome ? { sourceScreen } : undefined);
  };

  return (
    <HStack space={3} alignItems="center" width="100%" my="3">

      <Pressable onPress={handleTextSearchPress} flex={1}>
        {({ isPressed }) => (
          <Box
            h="12"
            bg={isPressed ? "#F3F4F6" : "#F8FAFC"}
            borderRadius="16"
            borderWidth="1"
            borderColor="#E5E7EB"
            justifyContent="center"
            px="4"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
              transform: [{ scale: isPressed ? 0.99 : 1 }],
            }}
          >
            <HStack space={3} alignItems="center">
              <Icon
                size="5"
                color="#64748B"
                as={<MaterialCommunityIcons name="magnify" />}
              />
              <Text
                color="#94A3B8"
                fontSize="15"
                fontWeight="400"
              >
                {i18n.t("search-book-by-title")}
              </Text>
            </HStack>
          </Box>
        )}
      </Pressable>

      <Pressable onPress={handleBarcodePress}>
        {({ isPressed }) => (
          <Box
            h="12"
            w="12"
            borderRadius="16"
            justifyContent="center"
            alignItems="center"
            bg={isPressed ? "#F3F4F6" : "#F8FAFC"}
            borderWidth="1"
            borderColor=  {isPressed ? "primary.600" : "primary.500"}
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
              transform: [{ scale: isPressed ? 0.99 : 1 }],
            }}
          >
            <Icon
              as={MaterialCommunityIcons}
              name="barcode-scan"
              size="6"
              color="primary.500"
            />
          </Box>
        )}
      </Pressable>

    </HStack>
  );
}