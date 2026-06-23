import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Flex, Image, Pressable, Text } from "native-base";
import i18n from "@/i18n";
import Screen from "@/components/ui/Screen";
import { CoverListHorizontal } from "@/components/ui/CoverListHorizontal";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { fetchMostPopularBooks } from "@/services/books/books.service";
import { useAddBooksToCollection } from "@/hooks/api/useAddBookToList";
import { HomeSearchWidget } from "@/components/ui/HomeSearchWidget";
import { getImageSource } from "@/utils/helper";
import { IMAGE_FALLBACKS } from "@/constants/image";

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

  const { addBooksToCollection } = useAddBooksToCollection();

  if (profileLoading || !profile) {
    return <LoadingOverlay />;
  }

  return (
    <Screen>
         <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        pb={2}
      >
        <Flex direction="column">
          <Text color="coolGray.500" fontSize="md" fontWeight="4 00" letterSpacing="wider">
            {i18n.t("hello")}
          </Text>
          <Text color="coolGray.900" fontSize="22px" fontWeight="400">
            {profile.name}
          </Text>
        </Flex>

        <Pressable
          onPress={() => navigation.navigate("ProfileStack", { screen: "Profile" })}
          style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
        >
          <Image
            source={getImageSource(profile.imageData, IMAGE_FALLBACKS.USER_AVATAR)}
            alt="Profile Image"
            width="44px"
            height="44px"
            rounded="full"
            borderWidth={1.5}
            borderColor="coolGray.100"
          />
        </Pressable>
      </Flex>

      {/* Arama Widget'ı */}
      <Box mb={4} mt={1}>
        <HomeSearchWidget navigation={navigation} isHome />
      </Box>

      {/* Son Eklenenler Bölümü */}
      {books.length > 0 && (
        <Box mb={4}>
          <Flex direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
            <Text color="coolGray.900" fontSize="md" fontWeight="bold" letterSpacing="tight">
              {i18n.t("recently-added")}
            </Text>
          </Flex>
          <CoverListHorizontal data={books} navigation={navigation} />
        </Box>
      )}

      {/* En Popülerler Bölümü */}
      {books.length > 0 && (
        <Box mb={4}>
          <Flex direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
            <Text color="coolGray.900" fontSize="md" fontWeight="bold" letterSpacing="tight">
              {i18n.t("most-popular")}
            </Text>
          </Flex>
          <CoverListHorizontal data={books} navigation={navigation} />
        </Box>
      )}
    </Screen>
  );
}