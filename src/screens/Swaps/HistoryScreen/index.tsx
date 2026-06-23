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
  Icon,
} from "native-base";
import { useCallback, useState } from "react";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { formatText, getImageSource, truncateText } from "@/utils/helper";
import { useFocusEffect } from "@react-navigation/native";
import i18n from "@/i18n";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import { fetchProfileImageUrl } from "@/services/profile/profile.service";
import { fetchTradeHistoryAsync } from "@/store/offers/thunks";
import { offersSelectors } from "@/store/offers/slice";
import { APP_ICONS, IMAGE_FALLBACKS } from "@/constants/image";

export default function HistoryScreen({ navigation }) {

  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const historyList = useSelector(offersSelectors.history.selectAll);

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
            photo_file_name: photoUrl, // Add the photo URL or default image
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

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchTradeHistoryAsync());
    }, [dispatch])
  );

  if (loading && !refreshing) {
    return <LoadingOverlay />;
  }

  return (
    <>
      {/* EMPTY STATE */}
      {!historyList || historyList.length === 0 ? (
        <VStack
          flex={1}
          bg="#fff"
          px="6"
          justifyContent="center"
          alignItems="center"
          space={4}
        >
          <Box
            w="64px"
            h="64px"
            rounded="full"
            bg="primary.50"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              as={MaterialIcons}
              name="history"
              size="lg"
              color="primary.600"
            />
          </Box>

          <Text fontSize="18" fontWeight="500" color="#111827" textAlign="center">

            {i18n.t("no-history")}
          </Text>

          <Text
            fontSize="sm"
            fontWeight="400"
            textAlign="center"
            color="#6B7280"
            px="8"
            lineHeight="20px"
          >
            {i18n.t("history-subtitle")}
          </Text>
        </VStack>
      ) : (
        <FlatList
          w="100%"
          bg="#fff"
          data={historyListWithUserPhoto}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Box
              mx="4"
              my="2"
              p="3"
              borderWidth="1"
              borderRadius="12"
              borderColor="#EEEEEE"
              bg="#fff"
            >
              <HStack alignItems="center" justifyContent="space-between">

                {/* LEFT: BOOKS */}
                <HStack space={3} alignItems="center">

                  {/* Requested Book */}
                  <VStack alignItems="center" w="70px">
                    <Image
                      source={
                        item.requestedBook.coverUrl
                          ? { uri: item.requestedBook.coverUrl }
                          : {
                            uri: "https://store.bookbaby.com/bookshop/OnePageBookCoverImage.jpg"
                          }
                      }
                      width="55"
                      height="80"
                      borderRadius={6}
                    />

                    <Text
                      fontSize="10px"
                      mt="1"
                      textAlign="center"
                      numberOfLines={2}
                    >
                      {truncateText(formatText(item.requestedBook.title), 32)}
                    </Text>
                  </VStack>

                  <Image source={APP_ICONS.swap} alt="swap" />

                  {/* Offered Book */}
                  <VStack alignItems="center" w="70px">
                    <Image
                      source={
                        item.offeredBook.coverUrl
                          ? { uri: item.offeredBook.coverUrl }
                          : {
                            uri: "https://store.bookbaby.com/bookshop/OnePageBookCoverImage.jpg"
                          }
                      }
                      width="55"
                      height="80"
                      borderRadius={6}
                    />

                    <Text
                      fontSize="10px"
                      mt="1"
                      textAlign="center"
                      numberOfLines={2}
                    >
                      {truncateText(formatText(item.offeredBook.title), 32)}
                    </Text>
                  </VStack>
                </HStack>

                {/* RIGHT: META */}
                <VStack alignItems="flex-end" justifyContent="space-between" h="100%">
                  <Text fontSize="10px" color="#8c8c8c">
                    {item.createdAt}
                  </Text>

                  <Pressable onPress={() => onNavigateProfile(item.participantProfile)}>
                    <VStack alignItems="center" mt="3">
                      <Box size={10} rounded="full" overflow="hidden" bg="#e0e0e0">
                        <Image
                          source={getImageSource(
                            item.participantProfile.photo_file_name,
                            IMAGE_FALLBACKS.USER_AVATAR
                          )}
                          size={10}
                          rounded="full"
                        />
                      </Box>

                      <Text fontSize="10px" color="#8c8c8c" mt="1" textAlign="center">
                        {item.participantProfile.name}
                      </Text>
                    </VStack>
                  </Pressable>
                </VStack>

              </HStack>
            </Box>
          )}
          keyExtractor={(item) => `history-${item.id}`}
        />
      )}

      {/* ERROR STATE */}
      {error && (
        <Box h="75%" alignItems="center" justifyContent="center">
          <WarningTwoIcon size="5" color="error.500" />
          <Text mt={2} px={5} fontSize="xs" color="error.500" textAlign="center">
            {error}
          </Text>
        </Box>
      )}
    </>
  );
}
