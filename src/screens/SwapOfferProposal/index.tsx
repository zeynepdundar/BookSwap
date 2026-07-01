import { useEffect, useMemo, useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  Image,
  Box,
  Text,
  Pressable,
  VStack,
  HStack,
  Icon,
  AspectRatio,
  CloseIcon,
  useToast,
} from "native-base";

import i18n from "@/i18n";
import { getImageSource } from "@/utils/helper";
import { InfoDialogBox } from "@/components/Modal/InfoDialogBox";
import Screen from "@/components/ui/Screen";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import { sendOfferAsync } from "@/store/offers/thunks";
import { APP_ICONS, IMAGE_FALLBACKS } from "@/constants/image";
import ScreenHeader from "@/components/ui/ScreenHeader";

interface Book {
  id?: string | number;
  title?: string;
  coverUrl?: string;
  [key: string]: any;
}

interface SentProposal {
  receiverId: string;
  offeredBook: Book | null;
  requestedBook: Book | null;
}

export default function SwapOfferProposal({ navigation, route }) {
  const user = route?.params?.data?.user || route?.params?.user;
  const book = route?.params?.data?.book || route?.params?.book;

  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentProposal, setSentProposal] = useState<SentProposal>(() => ({
    receiverId: user?.id || "",
    offeredBook: route?.params?.offeredBook || null,
    requestedBook: book || route?.params?.requestedBook || null,
  }));

  const dispatch = useAppDispatch();
  const toast = useToast();

  const isButtonDisabled =
    !sentProposal.offeredBook || !sentProposal.requestedBook || isSubmitting;

  const updateProposal = useCallback((key: keyof SentProposal, value: any) => {
    setSentProposal((prev) => ({ ...prev, [key]: value }));
  }, []);

  const proposeTradeHandler = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await dispatch(sendOfferAsync(sentProposal)).unwrap();
      setIsInfoDialogOpen(true);
    } catch (e) {
      console.error(e);
      toast.show({
        description: i18n.t("offer-send-error") || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const offered = route?.params?.offeredBook;
    const requested = route?.params?.requestedBook;

    if (offered) {
      updateProposal("offeredBook", offered);
      navigation.setParams({ offeredBook: undefined });
    }

    if (requested) {
      updateProposal("requestedBook", requested);
      navigation.setParams({ requestedBook: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params?.offeredBook, route?.params?.requestedBook]);

  const closeInfoDialog = () => setIsInfoDialogOpen(false);

  const config = useMemo(
    () => ({
      title: i18n.t("the-offer-sent"),
      description: i18n.t("see-sent-offers-description"),
      buttonLabel: i18n.t("see-my-offers"),
      onConfirm: () =>
        navigation.navigate("HomeTabs", {
          screen: "Swaps",
          params: { screen: "Sent" },
        }),
    }),
    [navigation]
  );

  /* ---------------- UI COMPONENTS ---------------- */

  const BookCard = ({ book: cardBook, onRemove }: { book: Book; onRemove: () => void }) => (
    <VStack alignItems="center" space={2}>
      <Box position="relative">
        <AspectRatio ratio={41 / 62} w="95px">
          <Image
            source={
              cardBook?.coverUrl
                ? { uri: cardBook.coverUrl }
                : { uri: IMAGE_FALLBACKS.BOOK_COVER }
            }
            alt={cardBook?.title || "cover"}
            rounded="md"
          />
        </AspectRatio>
        <Pressable
          position="absolute"
          top={-10}
          right={-5}
          onPress={onRemove}
          hitSlop={12}
          zIndex={10}
        >
          <Box
            w="8"
            h="8"
            rounded="full"
            bg="error.500"
            alignItems="center"
            justifyContent="center"
            shadow={4}
            borderWidth={2}
            borderColor="white"
            style={{
              transform: [{ translateX: 2 }, { translateY: -2 }],
            }}
          >
            <CloseIcon size={3} color="white" />
          </Box>
        </Pressable>
      </Box>

      <Text fontSize="sm" textAlign="center" color="gray.900" numberOfLines={2}>
        {cardBook?.title}
      </Text>
    </VStack>
  );

  const EmptySlot = ({ label, onPress }: { label: string; onPress: () => void }) => (
    <Pressable
      onPress={onPress}
      borderWidth={1}
      borderColor="gray.300"
      borderStyle="dashed"
      rounded="xl"
      py={6}
      alignItems="center"
      justifyContent="center"
      w="full"
      accessibilityRole="button"
      accessibilityLabel={label}
      _pressed={{ opacity: 0.7 }}
    >
      <Icon as={MaterialIcons} name="add" size="lg" color="primary.500" />
      <Text mt={1} fontSize="sm" color="primary.500">
        {label}
      </Text>
    </Pressable>
  );

  const SlotCard = ({
    title,
    bookKey,
    book: slotBook,
    emptyLabel,
    onAdd,
  }: {
    title: string;
    bookKey: keyof SentProposal;
    book: Book | null;
    emptyLabel: string;
    onAdd: () => void;
  }) => (
    <VStack space={2}>
      <Text fontSize="md" fontFamily="poppins-medium" color="gray.900">
        {title}
      </Text>

      <Box
        h="200px"
        borderWidth={1}
        borderColor="gray.200"
        bg="white"
        rounded="xl"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        {slotBook ? (
          <BookCard
            book={slotBook}
            onRemove={() => updateProposal(bookKey, null)}
          />
        ) : (
          <EmptySlot label={emptyLabel} onPress={onAdd} />
        )}
      </Box>
    </VStack>
  );

  if (!user) {
    return (
      <Screen full>
        <ScreenHeader
          title={i18n.t("swap-proposal")}
          onBack={() => navigation.goBack()}
        />
        <VStack flex={1} alignItems="center" justifyContent="center" px={4}>
          <Text color="gray.500">
            {i18n.t("swap-proposal-missing-user") || "Something went wrong loading this offer."}
          </Text>
        </VStack>
      </Screen>
    );
  }

  return (
    <Screen full>
      <ScreenHeader
        title={i18n.t("swap-proposal")}
        onBack={() => navigation.goBack()}
      />

      <VStack flex={1} px={4} pt={2} space={4}>
        <SlotCard
          title={i18n.t("book-you-will-give")}
          bookKey="offeredBook"
          book={sentProposal.offeredBook}
          emptyLabel={i18n.t("add-book")}
          onAdd={() =>
            navigation.navigate("ProfileStack", {
              screen: "Library",
              params: { data: "SwapOfferProposal" },
            })
          }
        />

        <Box alignItems="center">
          <Image source={APP_ICONS.swap_arrows} alt="swap" />
        </Box>

        <SlotCard
          title={i18n.t("book-you-will-receive")}
          bookKey="requestedBook"
          book={sentProposal.requestedBook}
          emptyLabel={i18n.t("add-book")}
          onAdd={() => navigation.navigate("OtherLibrary", { user })}
        />
        <VStack
          space={4}
          mt={6}
          pb={6}
          pt={3}
          borderTopWidth={1}
          borderTopColor="gray.100"
        >
          <HStack justifyContent="space-between" alignItems="center">
            <VStack space={0.5}>
              <Text fontSize="xs" color="gray.400">
                {i18n.t("swap-with")}
              </Text>

              <Text fontSize="sm" fontFamily="poppins-medium" color="gray.900">
                {user?.name}
              </Text>
            </VStack>

            <Image
              source={getImageSource(
                user?.photo_file_name,
                IMAGE_FALLBACKS.USER_AVATAR
              )}
              alt="profile"
              size={10}
              rounded="full"
            />
          </HStack>

          {/* CTA */}
          <Button
            variant="primary"
            isDisabled={isButtonDisabled}
            isLoading={isSubmitting}
            isLoadingText={
              i18n.t("sending-offer") || i18n.t("send-offer")
            }
            onPress={proposeTradeHandler}
          >
            {i18n.t("send-offer")}
          </Button>

        </VStack>
      </VStack>

      <InfoDialogBox
        isOpen={isInfoDialogOpen}
        onClose={closeInfoDialog}
        config={config}
      />
    </Screen>
  );
} 