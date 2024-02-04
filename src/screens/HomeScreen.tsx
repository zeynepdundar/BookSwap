import { Box, Flex, Heading, Image, Pressable, Text } from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";
import { HorizontalCoverList } from "../components/shared/HorizontalCoverList";
import SearchBar from "../components/shared/SearchBar";
import { useSelector } from "react-redux";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { fetchMostPopularBooks } from "../api/service";
import { useEffect, useState } from "react";

export default function HomeScreen({ navigation }) {
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
            source={{ uri: profile.imageData }}
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
          <HorizontalCoverList data={books} />
        </Box>
      )}
      {books.length > 0 && (
        <Box mt="6">
          <Text color="black.400" fontWeight="700">
            {i18n.t("most-popular")}
          </Text>
          <HorizontalCoverList data={books} />
        </Box>
      )}
    </Screen>
  );
}
