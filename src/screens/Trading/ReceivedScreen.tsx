import { useFocusEffect } from "@react-navigation/native";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  FlatList,
  Flex,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileImageUrl } from "@/api/service";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import i18n from "@/i18n";

import { formatText, getImageSource, truncateText } from "@/utils/helper";
import { ErrorAlert } from "../BarcodeScannerScreen";
import { acceptOfferAsync, fetchReceivedOffersAsync, rejectOfferAsync } from "@/store/profile/profile-actions";

export default function ReceivedScreen({ navigation }) {
  const tra = require("@/assets/images/icon/Icons.png");
  const avatar = require("@/assets/images/avatar.png");
  const receivedOffers = useSelector(
    (state: any) => state.profile.profile.receivedOffer
  );
  const [receivedOffersWithUserPhoto, setReceivedOffersWithUserPhoto] =
    useState(receivedOffers);
  const [refreshing, setRefreshing] = useState(false);
  const { loading, profile } = useSelector((state: any) => state.profile);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileImages = async () => {
    const updatedOffers = await Promise.all(
      receivedOffers.map(async (offer) => {
        const photoUrl = await fetchProfileImageUrl(
          offer.participantProfile.id
        );
        return {
          ...offer,
          participantProfile: {
            ...offer.participantProfile,
            photo_file_name: photoUrl,
          },
        };
      })
    );
    setReceivedOffersWithUserPhoto(updatedOffers);
  };
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  useFocusEffect(
    useCallback(() => {
      fetchProfileImages();
    }, [receivedOffers])
  );
  const refreshReceivedOffers = useCallback(async () => {
    await dispatch(((fetchReceivedOffersAsync as any)(profile.id)));
  }, [dispatch, profile.id]);

  const showError = useCallback((message: string, durationMs: number = 5000) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, durationMs);
  }, []);
  const acceptOfferHandler = async (offer: any) => {
    try {
      const response = await dispatch(acceptOfferAsync(offer.id));
      const payload = (response as any).payload as any;

      if (!payload.success) {
        const errorMessage =
          payload.message === "Offer not found or not eligible for acceptance"
            ? i18n.t("offer-not-found-or-eligible-for-acceptance")
            : payload.message;

        showError(errorMessage, 50000);
        await refreshReceivedOffers();

        return;
      }
      // Navigate to the TradeOfferAcceptedScreen on success
      navigation.push("TradeOfferAcceptedScreen", {
        user: {
          id: offer.participantProfile.id,
          name: offer.participantProfile.name,
        },
        receivedBook: offer.requestedBook,
        offeredBook: offer.offeredBook,
        conversationId: payload.conversationId,
      });
    } catch (error) {
      showError(i18n.t("something-went-wrong"));
      await refreshReceivedOffers();

      return;
    }
  };

  const rejectOfferHandler = async (offerId: any) => {
    try {
      const response = await dispatch(rejectOfferAsync(offerId));

      const payload = (response as any).payload as any;

      if (!payload.success) {
        const errorMessage =
          payload.message === "Offer not found or not eligible for rejection"
            ? i18n.t("offer-not-found-or-eligible-for-rejection")
            : payload.message;

        showError(errorMessage);
        await refreshReceivedOffers();

        return;
      }
    } catch (error) {
      showError(i18n.t("something-went-wrong"));
      await refreshReceivedOffers();

      return;
    }
  };

  const onNavigateProfile = (selectedUser) => {
    navigation.navigate("OtherUserProfile", {
      user: selectedUser,
    });
  };

  const renderEmptyItem = () => null; // Empty renderItem function

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    (dispatch(((fetchReceivedOffersAsync as any)(profile.id)))) // Replace with your API call action
      .finally(() => setRefreshing(false));
  }, [dispatch]);

  if (loading && !refreshing) {
    return <LoadingOverlay />;
  }

  return (
    <>
      {!receivedOffers ||
        (receivedOffers.length === 0 && (
          <VStack width="100%" height="100%" bg="#fff" position="relative">
            <Box position="absolute" top={0} left={0} right={0} zIndex={1}>
              <Center pt="100">
                <Text fontSize="md">
                  {i18n.t("start-searching-for-new-books")}
                </Text>
              </Center>
              <Center w="100%">
                <Divider mt="3" mb="7" width={300} bg="#EEEEEE" />
                <Text textAlign="center" mx="30" fontWeight="200">
                  {i18n.t("you-have-not-received-any-offer-yet")}
                </Text>

                <Text textAlign="center" mx="30" fontWeight="200">
                  {i18n.t("scroll-down-to-get-latest-request-if-exists")}
                </Text>
              </Center>
            </Box>

            <Box flex={1}>
              <FlatList
                data={[]}
                refreshing={refreshing} // Show refresh indicator while fetching data
                onRefresh={onRefresh} // Enable pull-to-refresh
                ListEmptyComponent={<></>} // Optional empty component for spacing
                renderItem={renderEmptyItem} // Provide empty renderItem function
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center",
                }} // Center content in FlatList
                showsVerticalScrollIndicator={false}
              />
            </Box>
          </VStack>
        ))}

      {receivedOffers && receivedOffers.length > 0 && (
        <FlatList<any>
          maxWidth="100%"
          bg="#fff"
          height="75%"
          data={receivedOffersWithUserPhoto}
          showsVerticalScrollIndicator={false}
          pt="3"
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }: { item: any }) => (
            <Box pb="6" overflow="hidden" alignItems="center" key={item.id}>
              <Flex
                direction="row"
                justifyContent="space-between"
                w="95%"
                alignSelf="center"
                position="relative"
                zIndex={9}
                p={1}
              >
                <Box
                  size={10}
                  rounded="full"
                  backgroundColor="#e0e0e0"
                  mr={3}
                  overflow="hidden"
                >
                  <Image
                    source={getImageSource(profile.imageData, avatar)}
                    alt="Profile Image"
                    size={10}
                    rounded="full"
                  />
                </Box>
                <Pressable
                  flex={1}
                  alignItems="flex-end"
                  onPress={() => {
                    onNavigateProfile(item.participantProfile);
                  }}
                >
                  <HStack>
                    <VStack>
                      <Text
                        color="#161719"
                        fontWeight="medium"
                        fontSize="14px"
                        mx={1}
                      >
                        {item.participantProfile.name}
                      </Text>
                      <Text
                        color="coolGray.400"
                        fontSize="12px"
                        mx={1}
                        textAlign="right"
                        mt="-1.5"
                      >
                        {item.createdAt}
                      </Text>
                    </VStack>
                    <Box
                      size={10}
                      rounded="full"
                      backgroundColor="#e0e0e0"
                      overflow="hidden"
                    >
                      <Image
                        source={getImageSource(
                          item.participantProfile.photo_file_name,
                          avatar
                        )}
                        alt="Profile Image"
                        size={10}
                        rounded="full"
                      />
                    </Box>
                  </HStack>
                </Pressable>
              </Flex>

              <Box
                px="7"
                py="4"
                pt="6"
                pb="2"
                borderColor="coolGray.200"
                width="90%"
                alignSelf="center"
                maxW="80"
                top="-12"
                rounded="10"
                overflow="hidden"
                borderWidth="1"
              >
                <VStack>
                  <HStack justifyContent="space-between" width="100%" space={1}>
                    <VStack flex={1} alignItems="center">
                      <AspectRatio
                        w="70%"
                        ratio={{
                          base: 45 / 68,
                        }}
                      >
                        <Image
                          source={
                            item.offeredBook.coverUrl
                              ? { uri: item.offeredBook.coverUrl }
                              : {
                                  uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg",
                                }
                          }
                          alt={`Cover of: ${item.offeredBook.title} by ${item.offeredBook.author}`}
                          roundedRight="4"
                        />
                      </AspectRatio>
                      <Text
                        color="#000000"
                        fontSize="12"
                        fontWeight={500}
                        numberOfLines={2}
                      >
                        {truncateText(formatText(item.offeredBook.title), 36)}
                      </Text>
                      <Text color="#8c8c8c" fontSize="11" numberOfLines={1}>
                        {truncateText(formatText(item.offeredBook.author), 30)}
                      </Text>
                    </VStack>
                    <Center height={110}>
                      <Image source={tra} alt="Library icon" />
                    </Center>
                    <VStack flex={1} alignItems="center">
                      <AspectRatio
                        w="70%"
                        ratio={{
                          base: 45 / 68,
                        }}
                      >
                        <Image
                          source={
                            item.requestedBook.coverUrl
                              ? { uri: item.requestedBook.coverUrl }
                              : {
                                  uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg",
                                }
                          }
                          alt={`Cover of: ${item.requestedBook.title} by ${item.requestedBook.author}`}
                          roundedRight="4"
                        />
                      </AspectRatio>
                      <Text
                        color="#000000"
                        fontSize="12"
                        fontWeight={500}
                        numberOfLines={2}
                      >
                        {truncateText(formatText(item.requestedBook.title), 36)}
                      </Text>
                      <Text color="#8c8c8c" fontSize="11" numberOfLines={2}>
                        {truncateText(
                          formatText(item.requestedBook.author),
                          30
                        )}
                      </Text>
                    </VStack>
                  </HStack>
                  {/* <Divider my={3} color="#E5E7F3" thickness="1" /> */}
                  <Flex direction="row" justifyContent="space-between" pt="3">
                    <Button
                      variant="ghost"
                      _text={{ color: "#9395A4" }}
                      onPress={() => rejectOfferHandler(item.id)}
                    >
                      {i18n.t("decline")}
                    </Button>
                    <Divider
                      color="#E5E7F3"
                      thickness="1"
                      orientation="vertical"
                      height={6}
                      marginY="2"
                    />
                    <Button
                      variant="ghost"
                      onPress={() => acceptOfferHandler(item)}
                    >
                      {i18n.t("accept")}
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            </Box>
          )}
          keyExtractor={(item: any) => item.id}
        />
      )}
      {error && <ErrorAlert message={error} />}
    </>
  );
}
