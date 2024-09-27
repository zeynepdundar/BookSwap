import {
  Center,
  Spacer,
  Image,
  Box,
  Text,
  VStack,
  HStack,
  FlatList,
  AspectRatio,
  Avatar,
  Flex,
  WarningTwoIcon,
} from "native-base";
import Screen from "../../components/Screen";
import { useCallback, useEffect, useState } from "react";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { useDispatch, useSelector } from "react-redux";
import { fetchTradeHistoryAsync } from "../../store/profile-actions";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { formatText, truncateText } from "../../utils/helper";
import { fetchProfileImageUrl } from "../../api/service";
import { useFocusEffect } from "@react-navigation/native";

export default function HistoryScreen({ navigation }) {
  const tradeIcon = require("../../assets/images/icon/trade-in.png");
  const profilePhoto = require("../../assets/images/lalo-salamanca.png");

  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const historyList = useSelector(
    (state: any) => state.profile.profile.historyList
  );
  const [historyListWithUserPhoto, setHistoryListWithUserPhoto] =
    useState(historyList);
  const { loading, profile } = useSelector((state: any) => state.profile);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
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
            photo_file_name: photoUrl || profilePhoto, // Add the photo URL or default image
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
    dispatch(fetchTradeHistoryAsync(profile.id)) // Replace with your API call action
      .finally(() => setRefreshing(false));
  }, [dispatch]);

  if (loading && !refreshing) {
    return <LoadingOverlay />;
  }
  return (
    <Screen>
      <Center>
        {/* {!historyList || historyList.length===0 && (
        <VStack width="100%" height="100%" pt="100" bg="#fff">
          <Center>
            <Text fontSize="md">{i18n.t("start-searching-for-new-books")}</Text>
          </Center>
          <Center w="100%">
            <Divider mt="3" mb="7" width={300} bg="#EEEEEE" />
            <Text textAlign="center" mx="30" fontWeight="200">
            {  i18n.t("you-have-not-received-any-offer-yet")}
            </Text>
          </Center>
        </VStack>
      )} */}
        {!error && historyList && historyList?.length > 0 && (
          <FlatList
            w="100%"
            data={historyListWithUserPhoto}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={({ item }) => (
              <Box
                p="1.5"
                mb="2"
                borderWidth="1"
                borderRadius="10"
                borderColor="#EEEEEE"
                overflow="hidden"
                key={item.id}
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
                    <Image
                      source={
                        item.participantProfile.photo_file_name
                          ? { uri: item.participantProfile.photo_file_name }
                          : profilePhoto
                      }
                      alt="Profile Image"
                      size="44"
                      rounded="full"
                    />
                      <Text
                        color="#8c8c8c"
                        fontSize="10"
                        maxW="68px"
                        textAlign="center"
                        pt="1"
                      >
                        with <Text> {item.participantProfile.name}</Text>
                      </Text>
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
      </Center>
    </Screen>
  );
}
