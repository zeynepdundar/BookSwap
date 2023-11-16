import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { API, graphqlOperation } from "aws-amplify";
import { SearchEditionsByISBN13 } from "../graphql/custom-queries";
import { Image } from "native-base";

export default function BarcodeScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [edition, setEdition] = useState(null);

  const fetchEditions = async (isbn_13) => {
    const editionData = await API.graphql(
      graphqlOperation(SearchEditionsByISBN13, { isbn_13: isbn_13  })
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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    
    let coverUrl;
    const isbn_13 = data;
    //prepare uri
    const key = "isbn";
    const value = isbn_13;
    const size = "M";
    coverUrl = `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`;

    let e;
    let mappedEdition = {
      coverUrl: coverUrl
    };

    fetchEditions(data)
      .then((fetchedEditions) => {
        console.log("fetchedEditions: ", fetchedEditions);
        if (fetchedEditions.length == 0) {
          console.log("Edition not found with this ISBN!");
          return;
        } else if (fetchedEditions.length > 1) {
          console.log("There are more than 1 edition with this ISBN!");
          return;
        }
        const e = fetchedEditions[0];
        console.log("e: ", e);

        mappedEdition = {
          id: e.id,
          title: e.title.slice(0, 20),
          coverUrl: coverUrl,
          author: e.authors[0].name,
        };
        console.log("mapped edition: ", mappedEdition);
        // setEdition(mappedEdition);
      })
      .catch((error) => {
        console.error(error);
      });
      setEdition(mappedEdition);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
      <Image
        source={{ uri: edition ? edition.coverUrl : null }}
        alt="Library"
        width="25%"
        rounded="8"
        height="100"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
