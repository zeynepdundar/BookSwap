import { useFocusEffect } from "@react-navigation/native";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import { Button } from "native-base";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { SwapOffersList } from "@/components/ui/SwapOffersList";
import i18n from "@/i18n";

import { fetchSentOffersAsync, takeBackOfferAsync } from "@/store/offers/thunks";
import { offersSelectors } from "@/store/offers/slice";
import { useAppToast } from "@/hooks/useAppToast";
import { fetchProfileImageUrl } from "@/services/profile/profile.service";

export default function SentScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const toast = useAppToast();

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

      // The thunk threw (network/exception) — no payload to inspect.
      if (takeBackOfferAsync.rejected.match(response)) {
        toast.error(i18n.t("something-went-wrong"));
        dispatch(fetchSentOffersAsync());
        return;
      }

      const payload = response.payload as any;

      // On success the thunk resolves with the bare offerId; only a
      // handled failure carries the `{ success: false, message }` shape.
      if (payload?.success === false) {
        const errorMessage =
          payload.message === "Offer not found or not eligible for taking back"
            ? i18n.t("offer-not-found-or-eligible-for-taking-back")
            : payload.message;

        toast.error(errorMessage);
        dispatch(fetchSentOffersAsync());
        return;
      }

      // Instantly remove it from the UI so the user sees it disappear
      setSentOffersWithUserPhoto((prev) =>
        prev.filter((item) => item.id !== offerId)
      );
      toast.info(i18n.t("offer-taken-back-successfully"));
    } catch (error) {
      toast.error(i18n.t("something-went-wrong"));
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

  const renderActions = (item: any) => (
    <Button
      variant="neutral"
      onPress={() => takeBackOfferHandler(item.id)}
    >
      {i18n.t("take-back")}
    </Button>
  );

  return (
    <SwapOffersList
      type="sent"
      data={sentOffersWithUserPhoto}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onNavigateProfile={onNavigateProfile}
      ownProfileImage={profile?.imageData}
      renderActions={renderActions}
      emptyState={{
        iconName: "swap-horiz",
        title: i18n.t("no-sent-offers"),
        subtitle: i18n.t("discover-books-to-make-your-first-offer"),
      }}
    />
  );
}
