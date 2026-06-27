import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Flex, Heading, Image, Pressable, Text } from "native-base";
import i18n from "@/i18n";
import Screen from "@/components/ui/Screen";
import { CoverListHorizontal } from "@/components/ui/CoverListHorizontal";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { fetchMostPopularBooks } from "@/services/books/books.service";
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
          <Text
            fontSize="sm"
            color="gray.500"
            lineHeight="20px"
          >
            {i18n.t("hello")}
          </Text>

          <Heading size="xl" fontFamily="poppins-medium">
            {profile.name}
          </Heading>
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
            borderColor="gray.200"
          />
        </Pressable>
      </Flex>

      {/* Arama Widget'ı */}
      <Box mt={3} mb={4}>
        <HomeSearchWidget navigation={navigation} isHome />
      </Box>

      {/* Son Eklenenler Bölümü */}
      {books.length > 0 && (
        <Box mb={5}>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Text
              color="gray.900"
              fontFamily="poppins-semi-bold"
              fontSize="lg"
              lineHeight="24px"
            >
              {i18n.t("recently-added")}
            </Text>
          </Flex>

          <CoverListHorizontal
            data={books}
            navigation={navigation}
          />
        </Box>
      )}

      {/* En Popülerler Bölümü */}
      <Box mb={5}>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Text
            color="gray.900"
            fontFamily="poppins-semi-bold"
            fontSize="lg"
            lineHeight="24px"
          >
            {i18n.t("most-popular")}
          </Text>
        </Flex>

        <CoverListHorizontal
          data={books}
          navigation={navigation}
        />
      </Box>
    </Screen>
  );
}