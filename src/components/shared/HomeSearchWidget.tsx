import { HStack, Text, Icon, Pressable, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "@/i18n";

interface HomeSearchWidgetProps {
  navigation: any;
  isHome?: boolean;
  sourceScreen?: string | null;
}

export function HomeSearchWidget({ navigation, sourceScreen, isHome = false, }: HomeSearchWidgetProps) {

console.log("fgvsd",sourceScreen)
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
            bg={isPressed ? "#E5E7EB" : "#F3F4F6"}
            borderRadius="16"
            borderWidth="1"
            borderColor="#E5E7EB"
            justifyContent="center"
            px="4"
            style={{
              transform: [{ scale: isPressed ? 0.99 : 1 }]
            }}
          >
            <HStack space={3} alignItems="center">
              <Icon
                size="5"
                color="#4B5563" // Strong contrast dark charcoal icon
                as={<MaterialCommunityIcons name="magnify" />}
              />
              <Text color="#9CA3AF" fontSize="15" fontWeight="500">
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
            bg="primary.50"
            borderRadius="16"
            justifyContent="center"
            alignItems="center"
            style={{
              shadowColor: "#000",
              shadowOffset: isPressed ? { width: 0, height: 1 } : { width: 0, height: 3 },
              shadowOpacity: isPressed ? 0.15 : 0.25,
              shadowRadius: isPressed ? 1.5 : 3,
              elevation: isPressed ? 2 : 5,
              transform: [{ translateY: isPressed ? 1.5 : 0 }]
            }}
            _pressed={{
              bg: "#1F2937"
            }}
          >
            <Icon
              color="white"
              name="barcode-scan"
              as={MaterialCommunityIcons}
              size="6"
            />
          </Box>
        )}
      </Pressable>

    </HStack>
  );
}