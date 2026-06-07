import { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";
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
  Alert,
} from "native-base";

import {
  formatText,
  generateModalActions,
  truncateText,
} from "@/utils/helper";
import { ActionSheet } from "@/components/shared/ActionSheet";
import i18n from "@/i18n";
import { BookCollection, BookCollections } from "@/types/book.types";
import { InfoDialogBox } from "@/components/Modal/InfoDialogBox";
import { fetchBooksByISBN } from "@/services/books/books.service";

export default function BarcodeScannerScreen({
  navigation,
  route = null,
}) {

  const { sourceScreen, onAddBook } = route.params ?? {};
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [edition, setEdition] = useState(null);
  const [error, setError] = useState(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<BookCollection | null>(
    null
  );
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    const resetScannedResult = () => {
      setScanned(false);
      setError(null);
    };

    const timer = setTimeout(() => {
      resetScannedResult();
    }, 3000);

    return () => clearTimeout(timer);
  }, [scanned]);

  const handleBarCodeScanned = async ({ data }) => {
    try {
      setScanned(true);
      const fetchedEditions = await fetchBooksByISBN(data);
      if (fetchedEditions.length === 0) {
        setError("No book found with this ISBN!");
      } else if (fetchedEditions.length > 1) {
        setError("Multiple books found with this ISBN.");
      } else {
        setEdition(fetchedEditions[0]);
        console.log("Book found with this ISBN", fetchedEditions[0]);
      }
    } catch (error) {
      setError("Error fetching editions. Please try again later.");
    }
  };

  if (!permission) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!permission.granted) {
    return <Text>No access to camera</Text>;
  }
  const handleAddBook = async () => {

    //For profile updates flow library/wishlist add book
    if (sourceScreen) {
      onAddBook({
        books: [edition]
      });
      setSelectedAction(sourceScreen);
      setIsInfoDialogOpen(true);
      setEdition(null);
    }
    // show ActionSheet and select collection to add book to
    else {
      const actions = [
        { type: BookCollections.WISHLIST, label: "add-my-wishlist" },
        { type: BookCollections.LIBRARY, label: "add-my-library" },
        { type: "cancel", label: "cancel" },
      ];
      setActions(generateModalActions(actions, handleAction, closeActionSheet));
      setIsActionSheetOpen(true);
    }
  };
  let title, description, buttonVariant, confirmButtonLabel, navigateToScreen;
  if (selectedAction === BookCollections.WISHLIST) {
    title = i18n.t("successfully-added");
    description = i18n.t("the-book-added-to-wishlist");
    buttonVariant = "outline";
    confirmButtonLabel = i18n.t("see-my-wishlist");
    navigateToScreen = () =>
      navigation.navigate("ProfileStack", { screen: "Wishlist" });
  } else if (selectedAction === BookCollections.LIBRARY) {
    title = i18n.t("successfully-added");
    description = i18n.t("the-book-added-to-library");
    buttonVariant = "outline";
    confirmButtonLabel = i18n.t("see-my-library");
    navigateToScreen = () =>
      navigation.navigate("ProfileStack", { screen: "Library" });
  }

  const closeActionSheet = () => {
    setIsActionSheetOpen(false);
    setEdition(null);
  };

  const closeInfoDialog = () => {
    setIsInfoDialogOpen(false);
  };

  const { width, height } = Dimensions.get("window");

  const handleAction = async (actionType) => {
    console.log("handleAction", actionType, edition, onAddBook);

    onAddBook({
      books: [edition],
      collection: actionType
    });

    closeActionSheet();
    // const payload = response.payload;
    setSelectedAction(actionType);
    setIsInfoDialogOpen(true);
    setEdition(null);
  };

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
        _pressed={{
          bg: "primary.100",
        }}
        icon={
          <Icon color="black" name={"close"} as={MaterialIcons} size="lg" />
        }
      />
      {/* Ensure full screen coverage */}
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.fullScreenContainer}
        barcodeScannerSettings={{ barcodeTypes: ["ean13"] }}
      />
      {edition && (
        <Center>
          <BookInfoBox edition={edition} onAddBooks={handleAddBook} />
          {/* <Button onPress={() => setScanned(false)}>Tap to Scan Again</Button> */}
        </Center>
      )}
      {error && (
        <>
          <ErrorAlert message={error} />
          {/* <Button onPress={() => setScanned(false)}>Tap to Scan Again</Button> */}
        </>
      )}
      <ActionSheet
        isOpen={isActionSheetOpen}
        onClose={closeActionSheet}
        actions={actions}
        defaultLabel={
          sourceScreen === BookCollections.WISHLIST || sourceScreen === BookCollections.LIBRARY ? "the-book-added" : null
        }
      />

      <InfoDialogBox
        isOpen={isInfoDialogOpen}
        onClose={closeInfoDialog}
        title={title}
        description={description}
        primaryAction={{ label: confirmButtonLabel, variant: buttonVariant, onPress: navigateToScreen }}
      />
    </View>
  );
}
const BookInfoBox = ({ edition, onAddBooks }) => (
  <Box
    width="80"
    height="120px"
    shadow="9"
    backgroundColor="white"
    borderWidth="2"
    borderRadius="15"
    borderColor="#ffffff"
    p="2"
    m="2"
    position="absolute"
    bottom={150}
  >
    <HStack
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      height="100%"
      p={1}
      space={2.5}
    >
      <Image
        source={{ uri: edition?.coverUrl }}
        alt="Library"
        width="60"
        height="82"
        roundedRight="4"
      />
      <VStack width="40" height="82">
        <Text color="#8c8c8c" fontSize="xs" letterSpacing="2xl">
          {truncateText(formatText(edition?.author), 19)}
        </Text>
        <Text color="#494949" fontSize="16" numberOfLines={2}>
          {truncateText(formatText(edition?.title), 36)}
        </Text>
        <Text color="#494949" fontSize="11">
          {truncateText(formatText(edition?.publisher), 23)}
        </Text>
      </VStack>
      <IconButton
        onPress={onAddBooks}
        m="8px"
        borderRadius="11"
        bg="primary.50"
        variant="solid"
        p="3"
        size={10}
        _pressed={{ bg: "primary.100" }}
        icon={<Icon color="white" name={"add"} as={MaterialIcons} size="md" />}
      />
    </HStack>
  </Box>
);



import { Feather } from "@expo/vector-icons"; // Switching to Feather for cleaner line-art icons

export const ErrorAlert = ({ message, hint = null }) => {
  if (!message) return null;

  const paddingTop = Platform.OS === "android" ? StatusBar.currentHeight : 0;

return (
    <Center 
      position="absolute" 
      // Safely floats right above your 80px bottom tabs + چentik margins
      bottom={Platform.OS === "ios" ? "105px" : "95px"}
      left={0} 
      right={0} 
      zIndex={999}
    >
      {/* Soft neon shadow border wrapper */}
      <Box
        px="5"
        py="3"
        borderRadius="30px" // Fully rounded pill shape
        bg="rgba(26, 26, 36, 0.96)" // Rich glassmorphic dark tint
        shadow="7"
        borderWidth="1px"
        borderColor="rgba(255, 255, 255, 0.12)" // Subtle highlight on the rim
        maxW="85%"
      >
        <HStack space={2.5} alignItems="center" justifyContent="center">
          {/* Minimalist icon with a smooth warning color */}
          <Feather name="alert-circle" size={16} color="#FF6B6B" />
          
          <Text 
            fontSize="xs" 
            fontWeight="700" 
            color="#FFFFFF" 
            letterSpacing="0.4px"
            textAlign="center"
          >
            {message}
            {hint && (
              <Text fontWeight="400" color="#A0A0B0">
                {" • "}
                {hint}
              </Text>
            )}
          </Text>
        </HStack>
      </Box>
    </Center>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen height
    backgroundColor: "black", // Match the background color of the scanner
    margin: 0,
    padding: 0,
  },
  fullScreenContainer: {
    flex: 1, // Merged to ensure full-screen coverage
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black", // Optional background color to match scanner
  },
});
