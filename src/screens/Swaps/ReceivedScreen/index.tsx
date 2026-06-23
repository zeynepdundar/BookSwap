import { useFocusEffect } from "@react-navigation/native";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import {
  Box,
  Button,
  HStack,
  Icon,
  Pressable,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { SwapOffersList } from "@/components/ui/SwapOffersList";
import i18n from "@/i18n";

import { fetchProfileImageUrl } from "@/services/profile/profile.service";
import { acceptOfferAsync, fetchReceivedOffersAsync, rejectOfferAsync } from "@/store/offers/thunks";
import { offersSelectors } from "@/store/offers/slice";
import { useAppToast } from "@/hooks/useAppToast";
import { InfoDialogBox } from "@/components/Modal/InfoDialogBox";

export default function ReceivedScreen({ navigation }) {
  const receivedOffers = useSelector(offersSelectors.received.selectAll);
  const [receivedOffersWithUserPhoto, setReceivedOffersWithUserPhoto] =
    useState<any[]>(receivedOffers);
  const [refreshing, setRefreshing] = useState(false);
  const { loading, profile } = useSelector((state: any) => state.profile);
  const toast = useAppToast();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);

  // Track the ID of the offer currently being declined (null means hidden)
  const [activeDeclineOfferId, setActiveDeclineOfferId] = useState<string | number | null>(null);

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

  const showError = useCallback((message: string) => {
    toast.error(message);
  }, [toast]);

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

      showError(errorMessage);
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

  const renderActions = (item: any) => {
    const isConfirmingDecline = activeDeclineOfferId === item.id;

    return !isConfirmingDecline ? (
      <HStack space={3}>
        <Button
          flex={1}
          variant="neutral"
          onPress={() => setActiveDeclineOfferId(item.id)}
        >
          {i18n.t("decline")}
        </Button>

        <Button
          variant="primary"
          flex={1}
          leftIcon={
            <Icon
              as={MaterialIcons}
              name="check-circle-outline"
              size="sm"
              color="#fff"
            />
          }
          onPress={() => acceptOfferHandler(item)}
        >
          {i18n.t("accept")}
        </Button>
      </HStack>
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
    );
  };

  return (
    <>
      <SwapOffersList
        type="received"
        data={receivedOffersWithUserPhoto}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onNavigateProfile={onNavigateProfile}
        ownProfileImage={profile.imageData}
        renderActions={renderActions}
        emptyState={{
          iconName: "swap-horiz",
          title: i18n.t("no-offers-received"),
          subtitle: i18n.t("received-offers-subtitle"),
        }}
      />

      <InfoDialogBox
        isOpen={isInfoDialogOpen}
        onClose={() => setIsInfoDialogOpen(false)}
        config={config}
      />
    </>
  );
}
