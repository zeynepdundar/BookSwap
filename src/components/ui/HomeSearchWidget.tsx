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

  {/* SEARCH */}
  <Pressable onPress={handleTextSearchPress} flex={1}>
    {({ isPressed }) => (
      <Box
        h="12"
        bg={isPressed ? "#F1F5F9" : "#F8FAFC"}
        borderRadius="16"
        borderWidth="1"
        borderColor="#E2E8F0"
        justifyContent="center"
        px="4"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 3 },
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

  {/* SCAN */}
  <Pressable onPress={handleBarcodePress}>
    {({ isPressed }) => (
      <Box
        h="12"
        w="12"
        borderRadius="16"
        justifyContent="center"
        alignItems="center"
        bg={isPressed ? "#F1F5F9" : "#F8FAFC"}
        borderWidth="1"
        borderColor="#E2E8F0"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 3 },
          elevation: 2,
          transform: [{ scale: isPressed ? 0.95 : 1 }],
        }}
      >
        <Icon
          as={MaterialCommunityIcons}
          name="barcode-scan"
          size="6"
          color="#64748B"
        />
      </Box>
    )}
  </Pressable>

</HStack>
  );
}