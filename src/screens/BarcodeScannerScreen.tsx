import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
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
import { fetchBooksByISBN } from "../api/service";
import {
  formatText,
  generateModalActions,
  truncateText,
} from "../utils/helper";
import { ActionSheet } from "../components/ActionSheet";
import { AppDispatch } from "../store/store";
import { addBookToListAsync } from "../store/profile-actions";
import i18n from "../i18n";
import { LIBRARY, ListTypes, WISHLIST } from "../constants";
import { InfoDialogBox } from "../components/Modal/InfoDialogBox";
import { MODAL_ACTIONS } from "../constants/actions";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useNavigationState } from "@react-navigation/native";

export default function BarcodeScannerScreen({
  navigation,
  route = null,
  onAddBook,
}) {
  const dispatch = useDispatch<AppDispatch>();

  onAddBook = onAddBook || route?.params?.onAddBook;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [edition, setEdition] = useState(null);
  const [error, setError] = useState(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<typeof ListTypes | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [actions, setActions] = useState([]);

  const navigationState = useNavigationState((state) => state);

  const listType = useMemo(() => {
    const previousRoute = navigationState.routes[navigationState.index - 1];
    const sourceScreen = previousRoute.params?.sourceScreen; 
    return sourceScreen ?? "";
  }, [navigationState]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    // Only request permissions if the component is mounted and hasPermission is still null
    if (hasPermission === null) {
      getBarCodeScannerPermissions();
    }
  }, []);

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

  const handleBarCodeScanned = async ({ type, data }) => {
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

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const handleAddBook = async () => {
    //For profile creation flow library/wishlist add book
    if (onAddBook) {
      onAddBook([edition]);
      setEdition(null);
      navigation.goBack();

      //TODO : Refactor to handle Wishlist and Library cases generically using a function passed as a prop.
    } else if (listType === WISHLIST|| listType === LIBRARY) {
      const response = await dispatch(
        addBookToListAsync({
          ...edition,
          type: listType,
        })
      );
      const payload = response.payload;

      if (payload?.status === "error") {
        if (payload.existingEditionIds?.length > 0) {
          setError(i18n.t("already-have-book"));
        } else {
          setError(payload.message);
        }
        setTimeout(() => {
          setError(null);
        }, 8000);
      } else navigation.navigate(listType);
      closeActionSheet();
    } else {
      const actions = [
        MODAL_ACTIONS.ADD_TO_WISHLIST,
        MODAL_ACTIONS.ADD_TO_LIBRARY,
        MODAL_ACTIONS.CANCEL,
      ];
      setActions(generateModalActions(actions, handleAction, closeActionSheet));
      setIsActionSheetOpen(true);
    }
  };
  let title, description, buttonVariant, confirmButtonLabel, navigateToScreen;
  if (selectedAction === WISHLIST) {
    title = i18n.t("successfully-added");
    description = i18n.t("the-book-added-to-wishlist");
    buttonVariant = "outline";
    confirmButtonLabel = i18n.t("see-my-wishlist");
    navigateToScreen = () =>
      navigation.navigate("ProfileStack", { screen: "Wishlist" });
  } else if (selectedAction === LIBRARY) {
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
    const response = await dispatch(
      addBookToListAsync({ ...edition, type: actionType })
    );
    const payload = response.payload;

    if (payload?.status === "error") {
      if (payload.existingEditionIds?.length > 0) {
        setError(i18n.t("already-have-book"));
      } else {
        setError(payload.message);
      }
      setTimeout(() => {
        setError(null);
      }, 8000);
    } else {
      setSelectedAction(actionType);
      setIsInfoDialogOpen(true);
    }
    closeActionSheet();
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
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.fullScreenContainer}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
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
          listType === WISHLIST || listType === LIBRARY
            ? "the-book-added"
            : null
        }
      />

      <InfoDialogBox
        isOpen={isInfoDialogOpen}
        onClose={closeInfoDialog}
        title={title}
        description={description}
        buttonVariant={buttonVariant}
        confirmButtonLabel={confirmButtonLabel}
        navigateToScreen={navigateToScreen}
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
export const ErrorAlert = ({ message }) => (
  <Center>
    <Alert
      w="80%"
      borderRadius="10px"
      backgroundColor="black.700"
      mt={5}
      shadow="9"
      py="5"
      position="absolute"
      zIndex={99}
      bottom={60}
    >
      <Text fontSize="sm" fontWeight="medium" color="#dddddd">
        {message}
      </Text>
    </Alert>
  </Center>
);

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
