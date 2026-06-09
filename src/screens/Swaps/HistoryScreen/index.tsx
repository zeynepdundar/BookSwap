import {
  Center,
  Spacer,
  Image,
  Box,
  Text,
  VStack,
  HStack,
  FlatList,
  Flex,
  WarningTwoIcon,
  Pressable,
  Divider,
} from "native-base";
import { useCallback, useState } from "react";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import {  useSelector } from "react-redux";
import { formatText, getImageSource, truncateText } from "@/utils/helper";
import { useFocusEffect } from "@react-navigation/native";
import i18n from "@/i18n";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import { fetchProfileImageUrl } from "@/services/profile/profile.service";
import { fetchTradeHistoryAsync } from "@/store/offers/thunks";
import { offersSelectors } from "@/store/offers/slice";
import { IMAGE_FALLBACKS } from "@/constants/image";

export default function HistoryScreen({ navigation }) {
  const tradeIcon = require("@/assets/images/icon/trade-in.png");

  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
 const historyList  = useSelector(offersSelectors.history.selectAll);
  console.log("historyList", historyList);

  const [historyListWithUserPhoto, setHistoryListWithUserPhoto] =
    useState<any[]>(historyList);
  const { loading, profile } = useSelector((state: any) => state.profile);
  const dispatch = useAppDispatch();
  const fetchProfileImages = async () => {
    const updatedOffers = await Promise.all(
      historyList.map(async (offer) => {
        const photoUrl = await fetchProfileImageUrl(
          offer.participantProfile.id
        ); // Fetch the profile image URL
        return {
          ...offer,
          participantProfile: {
            ...offer.participantProfile,
            photo_file_name: photoUrl , // Add the photo URL or default image
          },
        };
      })
    );
    setHistoryListWithUserPhoto(updatedOffers);
  };
  useFocusEffect(
    useCallback(() => {
      fetchProfileImages();
    }, [historyList])
  );
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchTradeHistoryAsync()) // Replace with your API call action
      .finally(() => setRefreshing(false));
  }, [dispatch]);

  const onNavigateProfile = (selectedUser) => {
    navigation.navigate("OtherUserProfile", {
      user: selectedUser,
    });
  };

  if (loading && !refreshing) {
    return <LoadingOverlay />;
  }

    useFocusEffect(
    useCallback(() => {
      dispatch(fetchTradeHistoryAsync()); 
    }, [dispatch])
  );
  return (
    <>
      {!historyList ||
        (historyList.length === 0 && (
          <VStack width="100%" height="100%" pt="100" bg="#fff">
            <Center>
              <Text fontSize="md" textAlign="center">
                {i18n.t("start-searching-for-new-books")}
              </Text>
            </Center>
            <Center w="100%">
              <Divider mt="3" mb="7" width={300} bg="#EEEEEE" />
              <Text textAlign="center" mx="30" fontWeight="200">
                {i18n.t("you-have-not-received-any-offer-yet")}
              </Text>
            </Center>
          </VStack>
        ))}
      {!error && historyList && historyList?.length > 0 && (
        <FlatList
          w="100%"
          bg="#fff"
          height="75%"
          data={historyListWithUserPhoto}
          showsVerticalScrollIndicator={false}
          pt="3"
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <Box
              p="2"
              mx="2"
              borderWidth="1"
              borderRadius="10"
              borderColor="#EEEEEE"
              overflow="hidden"
              key={item.id}
              alignItems="center"
              mb="4"
            >
              <HStack space="0.8" alignItems="center" h={151}>
                <VStack w="85px" h={140} alignItems="center" pt={3}>
                  <Image
                    source={
                      item.requestedBook.coverUrl
                        ? { uri: item.requestedBook.coverUrl }
                        : {
                            uri: "https://store.bookbaby.com/bookshop/OnePageBookCoverImage.jpg?BookID=BK00009510&abOnly=False",
                          }
                    }
                    alt="Library"
                    roundedRight="5"
                    width="60"
                    height="82"
                  />
                  <Text
                    color="#06070D"
                    fontSize="xs"
                    mt="1"
                    textAlign="center"
                    numberOfLines={2}
                  >
                    {truncateText(formatText(item.requestedBook.title), 36)}
                  </Text>
                </VStack>
                <Image source={tradeIcon} alt=" Library" />
                <VStack w="85px" h={140} alignItems="center" pt={3}>
                  <Image
                    source={
                      item.offeredBook.coverUrl
                        ? { uri: item.offeredBook.coverUrl }
                        : {
                            uri: "https://store.bookbaby.com/bookshop/OnePageBookCoverImage.jpg?BookID=BK00009510&abOnly=False",
                          }
                    }
                    alt=" Library"
                    width="60"
                    height="82"
                    roundedRight="4"
                  />
                  <Text
                    color="#06070D"
                    fontSize="xs"
                    mt="1"
                    textAlign="center"
                    numberOfLines={2}
                  >
                    {truncateText(formatText(item.offeredBook.title), 36)}
                  </Text>
                </VStack>
                <Spacer></Spacer>
                <VStack w="102" h={126}>
                  <Text color="#8c8c8c" fontSize="xs" textAlign="right">
                    20 Jun
                  </Text>
                  <Spacer />
                  <Flex direction="column" alignItems="flex-end">
                    <Pressable
                      onPress={() => {
                        onNavigateProfile(item.participantProfile);
                      }}
                    >
                      <Box
                        size={10}
                        rounded="full"
                        backgroundColor="#e0e0e0"
                        mr={3}
                        overflow="hidden"
                      >
                        <Image
                          source={getImageSource(
                            item.participantProfile.photo_file_name,
                            IMAGE_FALLBACKS.USER_AVATAR
                          )}
                          alt="Profile Image"
                          size={10}
                          rounded="full"
                        />
                      </Box>
                      <Text
                        color="#8c8c8c"
                        fontSize="10"
                        maxW="68px"
                        textAlign="center"
                        pt="1"
                      >
                        with <Text> {item.participantProfile.name}</Text>
                      </Text>
                    </Pressable>
                  </Flex>
                </VStack>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      {error && (
        <Box h="75%" alignItems="center" justifyContent="center">
          <WarningTwoIcon size="5" mt="0.5" mx="2" color="error.500" />
          <Text
            mt={2}
            px={5}
            fontSize="xs"
            color="error.500"
            textAlign="center"
          >
            {error}
          </Text>
        </Box>
      )}
    </>
  );
}
