import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialIcons } from "@expo/vector-icons";
import { API, graphqlOperation } from "aws-amplify";
import { StyleSheet, Dimensions } from "react-native";
import { SearchEditionsByISBN13 } from "../graphql/custom-queries";
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
} from "native-base";
import i18n from "../i18n";

export default function BarcodeScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [edition, setEdition] = useState(null);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);

  const fetchEditions = async (isbn_13) => {
    const editionData = await API.graphql(
      graphqlOperation(SearchEditionsByISBN13, { isbn_13: isbn_13 })
    );
    return editionData.data.listEditions.items;
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    const isbn_13 = data;
    //prepare uri
    const key = "isbn";
    const value = isbn_13;
    const size = "M";
    let coverUrl = `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`;

    fetchEditions(data)
      .then((fetchedEditions) => {
        if (fetchedEditions.length == 0) {
          console.log("Edition not found with this ISBN!");
          return;
        } else if (fetchedEditions.length > 1) {
          console.log("There are more than 1 edition with this ISBN!");
          return;
        }
        const e = fetchedEditions[0];

        let mappedEdition = {
          id: e.id,
          title: e.title.slice(0, 30),
          coverUrl: coverUrl,
          author: e.authors[0].name,
        };
        setEdition(mappedEdition);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const addBookList = () => {
    console.log("Book added!");
    setIsActionSheetOpen(true);
  };
  const handleNewBookScan = () => {
    setEdition(null);
    setScanned(false);
    setIsActionSheetOpen(false);
  };

  const { width, height } = Dimensions.get("window");

  return (
    <View width={width} h={height}>
      <IconButton
        onPress={() =>navigation.goBack()}
        size="40"
        m={"8px"}
        borderRadius="full"
        bg="#f2f2f2"
        variant="solid"
        p="3"
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
      {scanned && (
        <Center>
          <Box
            width="80"
            height="120px"
            shadow="9"
            backgroundColor="white"
            borderWidth="2"
            borderRadius="15"
            borderColor="#F1F1F1"
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
                onPress={addBookList}
                m={"8px"}
                borderRadius="11"
                bg="primary.50"
                variant="solid"
                p="3"
                size={20}
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
      <Actionsheet isOpen={isActionSheetOpen} onClose={handleNewBookScan}>
        <Actionsheet.Content>
          <Actionsheet.Item>{i18n.t("the-book-added")}</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
}
