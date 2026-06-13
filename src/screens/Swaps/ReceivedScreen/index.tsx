import { useFocusEffect } from "@react-navigation/native";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  FlatList,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import i18n from "@/i18n";

import { formatText, getImageSource, truncateText } from "@/utils/helper";
import { fetchProfileImageUrl } from "@/services/profile/profile.service";
import { acceptOfferAsync, fetchReceivedOffersAsync, rejectOfferAsync } from "@/store/offers/thunks";
import { offersSelectors } from "@/store/offers/slice";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { APP_ICONS, IMAGE_FALLBACKS } from "@/constants/image";
import { InfoDialogBox } from "@/components/Modal/InfoDialogBox";

export default function ReceivedScreen({ navigation }) {
  const receivedOffers = useSelector(offersSelectors.received.selectAll);
  const [receivedOffersWithUserPhoto, setReceivedOffersWithUserPhoto] =
    useState<any[]>(receivedOffers);
  const [refreshing, setRefreshing] = useState(false);
  const { loading, profile } = useSelector((state: any) => state.profile);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);

  // Track the ID of the offer currently being declined (null means hidden)
  const [activeDeclineOfferId, setActiveDeclineOfferId] = useState<string | number | null>(null);

  const showSuccess = useCallback(
    (message: string, durationMs: number = 5000) => {
      setSuccessMessage(i18n.t("swap-accepted-start-chat"));
      setIsInfoDialogOpen(true)

      setTimeout(() => {
        setSuccessMessage(null);
      }, durationMs);
    },
    []
  );

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

  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      fetchProfileImages();
    }, [receivedOffers])
  );

  const refreshReceivedOffers = useCallback(async () => {
    await dispatch(((fetchReceivedOffersAsync as any)()));
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

      if (acceptOfferAsync.fulfilled.match(response)) {
        // Instantly clear it from the UI list so the user sees it disappear
        setReceivedOffersWithUserPhoto((prev) => prev.filter((item) => item.id !== offer.id));

        setSuccessMessage(i18n.t("swap-accepted-start-chat"));
        setIsInfoDialogOpen(true);

        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
        return;
      }
      const payload = response.payload as any;

      const errorMessage =
        payload?.message === "Offer not found or not eligible for acceptance"
          ? i18n.t("offer-not-found-or-eligible-for-acceptance")
          : payload?.message ?? i18n.t("something-went-wrong");

      showError(errorMessage, 5000);
      await refreshReceivedOffers();
    } catch (error) {
      showError(i18n.t("something-went-wrong"));
      await refreshReceivedOffers();
    }
  };

  const rejectOfferHandler = async (offerId: any) => {
    setActiveDeclineOfferId(null); // Close the inline confirm window safely
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

  const renderEmptyItem = () => null;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchReceivedOffersAsync())
      .finally(() => setRefreshing(false));
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchReceivedOffersAsync());
    }, [dispatch])
  );

  if (loading && !refreshing) {
    return <LoadingOverlay />;
  }

  const config = {
    title: "Offer accepted!",
    description: "You’ve accepted the offer. The conversation is now available in Messages.",
    buttonLabel: "Go to chat",
    onConfirm: () => console.log("custom action"),
  };

  return (
    <>
      {!receivedOffers || receivedOffers.length === 0 ? (
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
              refreshing={refreshing}
              onRefresh={onRefresh}
              ListEmptyComponent={<></>}
              renderItem={renderEmptyItem}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
              }}
              showsVerticalScrollIndicator={false}
            />
          </Box>
        </VStack>
      ) : (
        <FlatList
          bg="#fff"
          data={receivedOffersWithUserPhoto}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }: { item: any }) => {
            const isConfirmingDecline = activeDeclineOfferId === item.id;

            return (
              <Box pb="6" overflow="hidden" alignItems="center">
                {/* User Info Header Row */}
                <Flex
                  direction="row"
                  justifyContent="space-between"
                  w="95%"
                  alignSelf="center"
                  position="relative"
                  zIndex={9}
                  p={1}
                >
                  <Box size={10} rounded="full" backgroundColor="#e0e0e0" mr={3} overflow="hidden">
                    <Image
                      source={getImageSource(profile.imageData, IMAGE_FALLBACKS.USER_AVATAR)}
                      alt="Profile Image"
                      size={10}
                      rounded="full"
                    />
                  </Box>
                  <Pressable
                    flex={1}
                    alignItems="flex-end"
                    onPress={() => onNavigateProfile(item?.participantProfile)}
                  >
                    <HStack>
                      <VStack>
                        <Text color="#161719" fontWeight="medium" fontSize="14px" mx={1}>
                          {item?.participantProfile?.name}
                        </Text>
                        <Text color="coolGray.400" fontSize="12px" mx={1} textAlign="right" mt="-1.5">
                          {item?.createdAt}
                        </Text>
                      </VStack>
                      <Box size={10} rounded="full" backgroundColor="#e0e0e0" overflow="hidden">
                        <Image
                          source={getImageSource(item?.participantProfile.photo_file_name, IMAGE_FALLBACKS.USER_AVATAR)}
                          alt="Profile Image"
                          size={10}
                          rounded="full"
                        />
                      </Box>
                    </HStack>
                  </Pressable>
                </Flex>

                {/* Main Card Content */}
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
                      {/* Offered Book */}
                      <VStack flex={1} alignItems="center">
                        <AspectRatio w="70%" ratio={{ base: 45 / 68 }}>
                          <Image
                            source={getImageSource(
                              item?.offeredBook?.coverUrl,
                              IMAGE_FALLBACKS.BOOK_COVER
                            )}
                          />
                        </AspectRatio>
                        <Text color="#000000" fontSize="12" fontWeight={500} numberOfLines={2}>
                          {truncateText(formatText(item?.offeredBook?.title), 36)}
                        </Text>
                        <Text color="#8c8c8c" fontSize="11" numberOfLines={1}>
                          {truncateText(formatText(item?.offeredBook?.author), 30)}
                        </Text>
                      </VStack>

                      <Center height={110}>
                        <Image source={APP_ICONS.swap} alt="Swap icon" />
                      </Center>

                      {/* Requested Book */}
                      <VStack flex={1} alignItems="center">
                        <AspectRatio w="70%" ratio={{ base: 45 / 68 }}>
                          <Image
                            source={
                              item?.requestedBook?.coverUrl
                                ? { uri: item?.requestedBook?.coverUrl }
                                : { uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg" }
                            }
                            alt={`Cover of: ${item?.requestedBook?.title}`}
                            roundedRight="4"
                          />
                        </AspectRatio>
                        <Text color="#000000" fontSize="12" fontWeight={500} numberOfLines={2}>
                          {truncateText(formatText(item?.requestedBook?.title), 36)}
                        </Text>
                        <Text color="#8c8c8c" fontSize="11" numberOfLines={2}>
                          {truncateText(formatText(item?.requestedBook?.author), 30)}
                        </Text>
                      </VStack>
                    </HStack>

                    {/* Conditional Action Row vs Confirmation Box */}
                    {!isConfirmingDecline ? (
                      <Flex direction="row" justifyContent="space-between" pt="3">
                        <Button
                          variant="ghost"
                          _text={{ color: "#9395A4" }}
                          onPress={() => setActiveDeclineOfferId(item.id)} // Show confirm inside this item
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
                    ) : (
                      <Box bg="transparent" py="3" mt="1">
                        <Text fontSize="14px" fontWeight="700" color="gray.900">
                          Decline this offer?
                        </Text>
                        <Text fontSize="12px" color="gray.500" mt="0.5">
                          The sender will be notified.
                        </Text>
                        <HStack space={5} mt="3" justifyContent="flex-end" alignItems="center">
                          <Pressable hitSlop={15} onPress={() => setActiveDeclineOfferId(null)}>
                            <Text color="gray.500" fontWeight="600" fontSize="13px">
                              Cancel
                            </Text>
                          </Pressable>
                          <Pressable hitSlop={15} onPress={() => rejectOfferHandler(item.id)}>
                            <Text color="red.500" fontWeight="600" fontSize="13px">
                              Decline
                            </Text>
                          </Pressable>
                        </HStack>
                      </Box>
                    )}
                  </VStack>
                </Box>
              </Box>
            );
          }}
          keyExtractor={(item) => `received-offer-${item.id}`}
        />
      )}

      <InfoDialogBox
        isOpen={isInfoDialogOpen}
        onClose={() => setIsInfoDialogOpen(false)}
        config={config}
      />
      <ErrorAlert message={error} />
    </>
  );
}