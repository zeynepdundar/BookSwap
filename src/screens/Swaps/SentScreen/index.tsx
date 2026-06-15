import { useFocusEffect } from "@react-navigation/native";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import i18n from "@/i18n";

import { formatText, getImageSource, truncateText } from "@/utils/helper";
import { fetchSentOffersAsync, takeBackOfferAsync } from "@/store/offers/thunks";
import { offersSelectors } from "@/store/offers/slice";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { APP_ICONS, IMAGE_FALLBACKS } from "@/constants/image";
import { fetchProfileImageUrl } from "@/services/profile/profile.service";

export default function SentScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Direct single source of truth from Redux
  const sentOffers = useSelector(offersSelectors.sent.selectAll);
  const [sentOffersWithUserPhoto, setSentOffersWithUserPhoto] =
    useState<any[]>(sentOffers);
  const { loading, profile } = useSelector((state: any) => state.profile);
  const dispatch = useAppDispatch();


  // 1. Fetch data safely ONLY when the screen comes into sharp focus
  useFocusEffect(
    useCallback(() => {
      if (profile?.id) {
        dispatch(fetchSentOffersAsync());
      }
    }, [dispatch, profile?.id])
  );

  const fetchProfileImages = async () => {
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
  };

  // Stable primitive key: only changes when the actual set of offers changes,
  // not on every render (selectAll returns a new array reference each time).
  const offersKey = useMemo(
    () => sentOffers.map((offer) => offer.id).join(","),
    [sentOffers]
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchSentOffersAsync()).finally(() => setRefreshing(false));
  }, [dispatch]);

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
        setTimeout(() => setError(null), 5000);
        dispatch(fetchSentOffersAsync());
        return;
      }
    } catch (error) {
      setError(i18n.t("something-went-wrong"));
      setTimeout(() => setError(null), 5000);
      dispatch(fetchSentOffersAsync());
    }
  };
  // Refetch participant photos only when the underlying offers actually change.
  // Keying on `offersKey` (a primitive) avoids the infinite render loop caused
  // by `sentOffers` getting a new array reference on every render.
  useEffect(() => {
    if (!sentOffers.length) {
      setSentOffersWithUserPhoto([]);
      return;
    }
    fetchProfileImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offersKey]);

  const onNavigateProfile = (selectedUser) => {
    navigation.navigate("OtherUserProfile", { user: selectedUser });
  };

  if (loading && !refreshing) {
    return <LoadingOverlay />;
  }

  return (
    <>
      {!sentOffers || sentOffers.length === 0 ? (
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
      ) : (
        <FlatList
          maxWidth="100%"
          bg="#fff"
          height="75%"
          data={sentOffersWithUserPhoto} // Directly use the stable Redux array hook channel here
          showsVerticalScrollIndicator={false}
          pt="3"
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Box pb="6" overflow="hidden" alignItems="center">
              <Flex direction="row" justifyContent="space-between" w="95%" alignSelf="center" position="relative" zIndex={9} p={1}>
                <Box size={10} rounded="full" backgroundColor="#e0e0e0" mr={3} overflow="hidden">
                  <Image source={getImageSource(profile?.imageData, IMAGE_FALLBACKS.USER_AVATAR)} alt="Profile Image" size={10} rounded="full" />
                </Box>

                <Pressable flex={1} alignItems="flex-end" onPress={() => onNavigateProfile(item?.participantProfile)}>
                  <HStack>
                    <VStack>
                      <Text color="#161719" fontWeight="medium" fontSize="14px" mx={1}>
                        {item?.participantProfile?.name}
                      </Text>
                      <Text color="coolGray.400" fontSize="12px" mx={1} textAlign="right" mt="-1">
                        {item?.createdAt}
                      </Text>
                    </VStack>
                    <Box size={10} rounded="full" backgroundColor="#e0e0e0" overflow="hidden">
                      {/* Look up dynamic file avatar string directly without local component mapping state arrays */}
                      <Image
                        source={getImageSource(item?.participantProfile?.photo_file_name, IMAGE_FALLBACKS.USER_AVATAR)}
                        alt="Participant Image"
                        size={10}
                        rounded="full"
                      />
                    </Box>
                  </HStack>
                </Pressable>
              </Flex>

              <Box px="7" py="4" pt="6" pb="2" borderColor="coolGray.200" width="90%" alignSelf="center" maxW="80" top="-12" rounded="10" overflow="hidden" borderWidth="1">
                <VStack>
                  <HStack justifyContent="space-between" width="100%" space={1}>
                    <VStack flex={1} alignItems="center">
                      <AspectRatio w="70%" ratio={45 / 68}>
                        <Image source={item?.offeredBook?.coverUrl ? { uri: item.offeredBook.coverUrl } : { uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg" }} alt={`Book cover: ${item?.offeredBook?.title ?? "Unknown title"}`} roundedRight="4" />
                      </AspectRatio>
                      <Text color="#000000" fontSize="12" fontWeight={500} numberOfLines={2}>
                        {truncateText(formatText(item?.offeredBook?.title), 36)}
                      </Text>
                      <Text color="#8c8c8c" fontSize="11">{item?.offeredBook?.author}</Text>
                    </VStack>

                    <Center height={150}>
                      <Image source={APP_ICONS.swap} alt="Swap books" />
                    </Center>

                    <VStack flex={1} alignItems="center">
                      <AspectRatio w="70%" ratio={45 / 68}>
                        <Image source={item?.requestedBook?.coverUrl ? { uri: item.requestedBook.coverUrl } : { uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg" }} alt={`Book cover: ${item?.requestedBook?.title ?? "Unknown title"}`} roundedRight="4" />
                      </AspectRatio>
                      <Text color="#000000" fontSize="12" fontWeight={500} numberOfLines={3}>
                        {item?.requestedBook?.title}
                      </Text>
                      <Text color="#8c8c8c" fontSize="11">{item?.requestedBook?.author}</Text>
                    </VStack>
                  </HStack>

                  <Flex direction="row" marginLeft="auto" pt="3">
                    <Button variant="outline" onPress={() => takeBackOfferHandler(item.id)}>
                      {i18n.t("take-back")}
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            </Box>
          )}
        />
      )}
      <ErrorAlert message={error} />
    </>
  );
}