import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
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
import { formatText, generateModalActions, truncateText } from "../utils/helper";
import { ActionSheet } from "../components/ActionSheet";
import { AppDispatch } from "../store/store";
import { addBookToListAsync } from "../store/profile-actions";
import i18n from "../i18n";
import { LIBRARY, WISHLIST } from "../constants";

export default function BarcodeScannerScreen({
  navigation,
  route = null,
  onAddBook,
}) {
  const dispatch = useDispatch<AppDispatch>();

  const mode = route?.params?.relatedScreen;
  onAddBook = onAddBook || route?.params?.onAddBook;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [edition, setEdition] = useState(null);
  const [error, setError] = useState(null);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
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
        console.log("Book found with this ISBN",fetchedEditions[0])
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
  const handleAddBook =async () => {
    //For profile creation flow library/wishlist add book
    if (onAddBook) {
      onAddBook([edition]);
      setEdition(null);
      navigation.goBack();
      
      //TODO : Refactor to handle Wishlist and Library cases generically using a function passed as a prop.
    } else if (mode === "Wishlist" || mode === "Library") {
      const response = await dispatch(
        addBookToListAsync({ ...edition, type: mode.toUpperCase() })
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
      }
      else navigation.navigate(mode);
      closeActionSheet();
    } else {
      const actions = [
        { type: WISHLIST, label: "add-my-wishlist" },
        { type: LIBRARY, label: "add-my-library" },
        { type: "cancel", label: "cancel" },
      ];
      setActions(generateModalActions(actions, handleAction, closeActionSheet));
      setIsActionSheetOpen(true);
    }
  };

  const closeActionSheet = () => {
    setIsActionSheetOpen(false);
    setEdition(null);
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
    }
    closeActionSheet();
  };

  return (
    <View style={{ width, height }}>
      <IconButton
        onPress={() => navigation.goBack()}
        size="10"
        m={"30px"}
        borderRadius="full"
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
      <Center width={"100%"} h="100%" bg="transparent" opacity={1}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
        />
      </Center>
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
          mode === "Wishlist" || mode === "Library" ? "the-book-added" : null
        }
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
        roundedRight="6"
      />
      <VStack width="40" height="82">
        <Text color="#8c8c8c" fontSize="xs" letterSpacing="2xl" >
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
