import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Flex, Heading, Image, Pressable, Text } from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";
import { CoverListHorizontal } from "../components/shared/CoverListHorizontal";
import SearchBar from "../components/shared/SearchBar";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { fetchMostPopularBooks } from "../api/service";

export default function HomeScreen({ navigation }) {
  const importUrl = require("../assets/images/avatar.png");

  const [books, setBooks] = useState([]);

  const { profile, loading: profileLoading } = useSelector(
    (state: any) => state.profile
  );

  useEffect(() => {
    (async () => {
      const data = await fetchMostPopularBooks();
      setBooks(data);
    })();
  }, []);
  const [loading, setLoading] = useState(true);

  if (profileLoading) {
    return <LoadingOverlay></LoadingOverlay>;
  }
  return (
    <Screen>
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Flex my="4">
          <Heading color="coolGray.800">{i18n.t("hello")}</Heading>
          <Text color="coolGray.800" fontWeight="500" fontSize={16}>
            {profile.name}
          </Text>
        </Flex>
        <Pressable
          onPress={() =>
            navigation.navigate("ProfileStack", { screen: "Profile" })
          }
        >
          <Image
            source={profile.imageData ? { uri: profile.imageData } : importUrl}
            alt="Profile Image"
            size={10}
            rounded="7"
          />
        </Pressable>
      </Flex>
      <SearchBar
        onSearchBook={() => {
          navigation.navigate("BookSearch", {
            relatedScreen: "Home",
          });
        }}
        onScanBarcode={() => {
          navigation.navigate("BarcodeScanner", {
            relatedScreen: "Home",
          });
        }}
        onFocus={() => {
          navigation.navigate("BookSearch", {
            relatedScreen: "Home",
          });
        }}
      />
      {books.length > 0 && (
        <Box mt="6">
          <Text color="black.400" fontWeight="700">
            {i18n.t("recently-added")}
          </Text>
          <CoverListHorizontal data={books} />
        </Box>
      )}
      {books.length > 0 && (
        <Box mt="6">
          <Text color="black.400" fontWeight="700">
            {i18n.t("most-popular")}
          </Text>
          <CoverListHorizontal data={books} />
        </Box>
      )}
    </Screen>
  );
}
