import { useFocusEffect } from "@react-navigation/native";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  AspectRatio,
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
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import i18n from "@/i18n";

import { formatText, getImageSource, truncateText } from "@/utils/helper";
import { ErrorAlert } from "../../BarcodeScannerScreen";
import { fetchSentOffersAsync, takeBackOfferAsync } from "@/store/profile/thunks";

export default function SentScreen({ navigation }) {
  const tra = require("@/assets/images/icon/Icons.png");
  const avatar = require("@/assets/images/avatar.png");
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingImages, setLoadingImages] = useState(true);

  const sentOffers = useSelector(
    (state: any) => state.profile.profile.sentOffer
  );
  const [sentOffersWithUserPhoto, setSentOffersWithUserPhoto] =
    useState(sentOffers);

  const { loading, profile } = useSelector((state: any) => state.profile);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const takeBackOfferHandler = async (offerId: string) => {
    try {
      const response = await dispatch(takeBackOfferAsync(offerId));

      const payload = response.payload;

      if (!payload.success) {
        const errorMessage =
          payload.message === "Offer not found or not eligible for taking back"
            ? i18n.t("offer-not-found-or-eligible-for-taking-back")
            : payload.message;

        setError(errorMessage);
        setTimeout(() => {
          setError(null);
        }, 5000);

        await dispatch(fetchSentOffersAsync(profile.id));

        return;
      }
    } catch (error) {
      setError(i18n.t("something-went-wrong"));
      setTimeout(() => {
        setError(null);
      }, 5000);

      await dispatch(fetchSentOffersAsync(profile.id));

      return;
    }
  };
  const onNavigateProfile = (selectedUser) => {
    navigation.navigate("OtherUserProfile", {
      user: selectedUser,
    });
  };
  const fetchProfileImages = async () => {
    setLoadingImages(true);
    const updatedOffers = await Promise.all(
      sentOffers.map(async (offer) => {
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
    setSentOffersWithUserPhoto(updatedOffers);
    setLoadingImages(false);
  };
  useFocusEffect(
    useCallback(() => {
      fetchProfileImages();
    }, [sentOffers])
  );

  // TODO: This is coded for providing asynchronous data fetching from the database.
  // Profile fetching happens when logged in. The API should ideally use sockets.
  // Remove this when the socket-based implementation is ready.
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchSentOffersAsync(profile.id)).finally(() =>
      setRefreshing(false)
    );
  }, [dispatch]);

  if (loading && !refreshing) {
    return <LoadingOverlay />;
  }
  return (
    <>
      {!sentOffers ||
        (sentOffers.length === 0 && (
          <VStack width="100%" height="100%" pt="100" bg="#fff">
            <Center>
              <Text fontSize="md" textAlign="center">
                {i18n.t("start-searching-for-new-books")}
              </Text>
            </Center>
            <Center w="100%">
              <Divider mt="3" mb="7" width={300} bg="#EEEEEE" />
              <Text textAlign="center" mx="30" fontWeight="200">
                {i18n.t("you-have-not-sent-any-offer-yet")}
              </Text>
            </Center>
          </VStack>
        ))}
      {sentOffers && sentOffers.length > 0 && (
        <FlatList
          maxWidth="100%"
          bg="#fff"
          height="75%"
          data={sentOffersWithUserPhoto}
          showsVerticalScrollIndicator={false}
          pt="3"
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
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
                        mt="-1"
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
                        {/* <Image
                          source={
                            item.offeredBook.coverUrl
                              ? { uri: item.offeredBook.coverUrl }
                              : importUrl
                          }
                          alt={`Cover of: ${item.offeredBook.title} by ${item.offeredBook.author}`}
                          roundedRight="6"
                        /> */}
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
                      <Text color="#8c8c8c" fontSize="11">
                        {item.offeredBook.author}
                      </Text>
                    </VStack>
                    <Center height={150}>
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
                        numberOfLines={3}
                      >
                        {item.requestedBook.title}
                      </Text>
                      <Text color="#8c8c8c" fontSize="11">
                        {item.requestedBook.author}
                      </Text>
                    </VStack>
                  </HStack>
                  {/* <Divider my={3} color="#E5E7F3" thickness="1" /> */}
                  <Flex direction="row" marginLeft="auto" pt="3">
                    <Button
                      variant="outline"
                      onPress={() => takeBackOfferHandler(item.id)}
                    >
                      {i18n.t("take-back")}
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      {error && <ErrorAlert message={error} />}
    </>
  );
}
