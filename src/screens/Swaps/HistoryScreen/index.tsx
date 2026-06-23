import { Box, Text, WarningTwoIcon } from "native-base";
import { useCallback, useState } from "react";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { SwapOffersList } from "@/components/ui/SwapOffersList";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import i18n from "@/i18n";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import { fetchProfileImageUrl } from "@/services/profile/profile.service";
import { fetchTradeHistoryAsync } from "@/store/offers/thunks";
import { offersSelectors } from "@/store/offers/slice";

export default function HistoryScreen({ navigation }) {
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const historyList = useSelector(offersSelectors.history.selectAll);

  const [historyListWithUserPhoto, setHistoryListWithUserPhoto] =
    useState<any[]>(historyList);
  const { loading } = useSelector((state: any) => state.profile);
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
      <SwapOffersList
        type="history"
        data={historyListWithUserPhoto}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onNavigateProfile={onNavigateProfile}
        emptyState={{
          iconName: "history",
          title: i18n.t("no-history"),
          subtitle: i18n.t("history-subtitle"),
        }}
      />

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
