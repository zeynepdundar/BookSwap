import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Dimensions } from "react-native";
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
  Actionsheet,
  Button,
  Alert,
} from "native-base";
import i18n from "../i18n";
import { EditionEndpoints } from "../api-endpoints";

export default function BarcodeScannerScreen({ navigation, route = null }) {
  const mode = route?.params?.relatedScreen;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [edition, setEdition] = useState(null);
  const [error, setError] = useState(null);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);

  const fetchEditions = async (isbn_13) => {
    try {
      console.log("Fetching from API...");
      const response = await fetch(EditionEndpoints.FETCH_EDITION_BY_ISBN(isbn_13)
      );
      const json = await response.json();
      console.log("json: ", json, isbn_13);
      return json.editions;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);
  const resetScannedResult = () => {
    setScanned(false);
    setError(null);
  };
  useEffect(() => {
    setTimeout(() => {
      resetScannedResult();
    }, 3000);
  });

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    const isbn_13 = data;
    //prepare uri
    const key = "isbn";
    const value = isbn_13;
    const size = "M";
    let coverUrl = EditionEndpoints.FETCH_COVER(key, value, size);

    fetchEditions(data)
      .then((fetchedEditions) => {
        if (fetchedEditions.length == 0) {
          console.log("No book found with this ISBN!");
          setError("No book found with this ISBN!");
          return;
        } else if (fetchedEditions.length > 1) {
          console.log(
            "There are multiple books which match what you're asking for this ISBN."
          );
          setError(
            "There are multiple books which match what you're asking for this ISBN."
          );
          return;
        }
        const e = fetchedEditions[0];

        let mappedEdition = {
          id: e.id,
          title: e.title.slice(0, 30),
          coverUrl: coverUrl,
          //author: e.authors[0].name,
          author: e.authors["name"],
        };
        setEdition(mappedEdition);
      })
      .catch((error) => {
        setError("Something went wrong! [ERR_CODE :" + { error } + "]!");
      });
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const addbooks = () => {
    console.log("Book added!");
    setIsActionSheetOpen(true);
    setEdition(null);
  };

  const { width, height } = Dimensions.get("window");

  return (
    <View w={width} h={height}>
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
                <Text color="#8c8c8c" fontSize="xs" letterSpacing="2xl">
                  {edition?.author}
                </Text>
                <Text color="#494949" fontSize="16">
                  {edition?.title}
                </Text>
              </VStack>
              <IconButton
                onPress={addbooks}
                m={"8px"}
                borderRadius="11"
                bg="primary.50"
                variant="solid"
                p="3"
                size={10}
                _pressed={{
                  bg: "primary.100",
                }}
                icon={
                  <Icon
                    color="white"
                    name={"add"}
                    as={MaterialIcons}
                    size="md"
                  />
                }
              />
            </HStack>
          </Box>
          <Button onPress={() => setScanned(false)}>Tap to Scan Again</Button>
        </Center>
      )}
      {error && (
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
              {error}
            </Text>
            {/* <Button onPress={() => setScanned(false)}>Tap to Scan Again</Button> */}
          </Alert>
        </Center>
      )}
      <Actionsheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
      >
        <Actionsheet.Content>
          <Actionsheet.Item>{i18n.t("the-book-added")}</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
}
