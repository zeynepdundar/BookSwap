import { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";
import type { BarcodeSettings } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Center,
  HStack,
  Image,
  View,
  VStack,
  Text,
  Icon,
  IconButton,
} from "native-base";

import {
  formatText,
  generateModalActions,
  truncateText,
} from "@/utils/helper";
import { InlineActionSheet } from "@/components/ui/InlineActionSheet";
import i18n from "@/i18n";
import { BookCollection, BookCollections } from "@/types/book.types";
import { InfoDialogBox } from "@/components/Modal/InfoDialogBox";
import { fetchBooksByISBN } from "@/services/books/books.service";
import { useAppToast } from "@/hooks/useAppToast";
import { useAddBooksToCollection } from "@/hooks/api/useAddBookToList";

// Hoisted so the object identity stays stable across renders and the native
// CameraView is not re-configured (which causes a brief blue flash).
const BARCODE_SCANNER_SETTINGS: BarcodeSettings = { barcodeTypes: ["ean13"] };

export default function BarcodeScannerScreen({ navigation, route = null }) {
  // 1. ALL HOOKS DECLARATIONS MUST BE AT THE ABSOLUTE TOP
  const { sourceScreen } = route.params ?? {};
  const { addBooksToCollection } = useAddBooksToCollection();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [edition, setEdition] = useState(null);
  const toast = useAppToast();
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<BookCollection | null>(null);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [actions, setActions] = useState([]);
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    const resetScannedResult = () => {
      setScanned(false);
    };

    const timer = setTimeout(() => {
      resetScannedResult();
    }, 3000);

    return () => clearTimeout(timer);
  }, [scanned]);

  // 2. HELPER METHODS & TIMERS
  const startBoxExpiryTimer = (duration = 5000) => {
    stopBoxExpiryTimer();
    scanTimerRef.current = setTimeout(() => {
      setEdition(null);
      setScanned(false);
    }, duration);
  };

  const stopBoxExpiryTimer = () => {
    if (scanTimerRef.current) {
      clearTimeout(scanTimerRef.current);
      scanTimerRef.current = null;
    }
  };

  const handleBarCodeScanned = useCallback(async ({ data }) => {
    try {
      setScanned(true);
      const fetchedEditions = await fetchBooksByISBN(data);
      if (fetchedEditions.length === 0) {
        toast.error("No book found with this ISBN!");
      } else if (fetchedEditions.length > 1) {
        toast.error("Multiple books found with this ISBN.");
      } else {
        setEdition(fetchedEditions[0]);
        startBoxExpiryTimer(6000);
      }
    } catch (error) {
      toast.error("Error fetching editions. Please try again later.");
    }
  }, [toast]);

  const saveBookToCollection = async (
    collection: BookCollection,
    book = edition
  ) => {
    if (!book) return;
    stopBoxExpiryTimer();
    try {
      await addBooksToCollection({
        collection,
        books: [book].flat(),
      });
      setSelectedAction(collection);
      setEdition(null);
      // Let the action sheet finish its dismiss animation before the dialog
      setTimeout(() => setIsInfoDialogOpen(true), 200);
    } catch (error) {
      toast.error(error?.message || "Failed to add book. Please try again later.");
    }
  };

  const handleAddBook = () => {
    if (sourceScreen) {
      saveBookToCollection(sourceScreen as BookCollection);
    } else {
      const actionsConfig = [
        { type: BookCollections.WISHLIST, label: "add-my-wishlist" },
        { type: BookCollections.LIBRARY, label: "add-my-library" },
        { type: "cancel", label: "cancel" },
      ];
      setActions(generateModalActions(actionsConfig, handleAction, closeActionSheet));
      stopBoxExpiryTimer();
      setIsActionSheetOpen(true);
    }
  };

  const handleAction = (actionType: string) => {
    const book = edition;
    closeActionSheet();
    if (actionType === "cancel") return;
    saveBookToCollection(actionType as BookCollection, book);
  };

  const closeActionSheet = () => {
    setIsActionSheetOpen(false);
    setEdition(null);
  };

  const closeInfoDialog = () => {
    setIsInfoDialogOpen(false);
    setSelectedAction(null);
    startBoxExpiryTimer(5000);
  };
  const getInfoDialogConfig = (selectedAction: string | null) => {
    if (selectedAction === BookCollections.WISHLIST) {
      return {
        title: i18n.t("successfully-added"),
        description: i18n.t("the-book-added-to-wishlist"),
        buttonLabel: i18n.t("see-my-wishlist"),
        onConfirm: () =>
          navigation.navigate("ProfileStack", { screen: "Wishlist" }),
      };
    }

    if (selectedAction === BookCollections.LIBRARY) {
      return {
        title: i18n.t("successfully-added"),
        description: i18n.t("the-book-added-to-library"),
        buttonLabel: i18n.t("see-my-library"),
        onConfirm: () =>
          navigation.navigate("ProfileStack", { screen: "Library" }),
      };
    }

    return null;
  };
  const config = getInfoDialogConfig(selectedAction);
  const { height } = Dimensions.get("window");

  // 3. SAFE EARLY CONDITIONAL RETURNS (Placed after all hooks ran successfully)
  if (!permission) return <Center flex={1} bg="black"><Text color="white">Requesting for camera permission</Text></Center>;
  if (!permission.granted) return <Center flex={1} bg="black"><Text color="white">No access to camera</Text></Center>;

  // 4. MAIN LAYOUT RENDER
  return (
    <View style={[styles.container, { height }]}>
      <StatusBar hidden />
      <IconButton
        onPress={() => navigation.goBack()}
        size="10"
        borderRadius={"full"}
        margin={Platform.OS === "android" ? 2 : 5}
        position="absolute"
        bg="#dddddd"
        zIndex={99}
        variant="solid"
        _pressed={{ bg: "primary.100" }}
        icon={<Icon color="black" name={"close"} as={MaterialIcons} size="lg" />}
      />
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.fullScreenContainer}
        barcodeScannerSettings={BARCODE_SCANNER_SETTINGS}
      />
      {edition && (
        <Center>
          <BookInfoBox edition={edition} handleAddBookPress={handleAddBook} />
        </Center>
      )}
      <InlineActionSheet
        isOpen={isActionSheetOpen}
        onClose={closeActionSheet}
        actions={actions}
      />
      {config && (
        <InfoDialogBox
          isOpen={isInfoDialogOpen}
          onClose={closeInfoDialog}
          config={config}
        />
      )}
    </View>
  );
}

const BookInfoBox = ({ edition, handleAddBookPress }) => (
  <Box width="80" height="120px" shadow="9" backgroundColor="white" borderWidth="2" borderRadius="15" borderColor="#ffffff" p="2" m="2" position="absolute" bottom={150}>
    <HStack justifyContent="space-between" alignItems="center" width="100%" height="100%" p={1} space={2.5}>
      <Image source={{ uri: edition?.coverUrl }} alt="Library" width="60" height="82" roundedRight="4" />
      <VStack width="40" height="82">
        <Text color="#8c8c8c" fontSize="xs" letterSpacing="2xl">{truncateText(formatText(edition?.author), 19)}</Text>
        <Text color="#494949" fontSize="16" numberOfLines={2}>{truncateText(formatText(edition?.title), 36)}</Text>
        <Text color="#494949" fontSize="11">{truncateText(formatText(edition?.publisher), 23)}</Text>
      </VStack>
      <IconButton onPress={handleAddBookPress} m="8px" borderRadius="11" bg="primary.500" variant="solid" p="3" size={10} _pressed={{ bg: "primary.100" }} icon={<Icon color="white" name={"add"} as={MaterialIcons} size="md" />} />
    </HStack>
  </Box>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", margin: 0, padding: 0 },
  fullScreenContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" },
});