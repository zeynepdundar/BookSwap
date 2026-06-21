import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  AspectRatio,
  Box,
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  Flex,
  HStack,
  Heading,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import i18n from "@/i18n";
import Screen from "@/components/ui/Screen";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { ActionSheet } from "@/components/ui/ActionSheet";
import { InfoDialogBox } from "@/components/Modal/InfoDialogBox";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { useAddBooksToCollection } from "@/hooks/api/useAddBookToList";
import { fetchBooksByISBN } from "@/services/books/books.service";
import { generateActions } from "@/utils/helper";
import { BookCollection, BookCollections } from "@/types/book.types";
import { IMAGE_FALLBACKS } from "@/constants/image";

export default function BookDetailScreen({ navigation, route }) {
  const book = route?.params?.book ?? {};

  const { id: userId } = useSelector((state: any) => state.profile.profile);
  const { addBooksToCollection } = useAddBooksToCollection();

  const [owners, setOwners] = useState<any[]>(book.usersOwning ?? []);
  const [ownersLoading, setOwnersLoading] = useState<boolean>(false);

  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [listError, setListError] = useState<string | null>(null);

  // Owners are not part of the "most popular" payload, so fetch the full
  // edition by ISBN to learn who currently owns this book.
  useEffect(() => {
    if (book.usersOwning?.length || !book.isbn_13) return;

    let isActive = true;
    (async () => {
      try {
        setOwnersLoading(true);
        const editions = await fetchBooksByISBN(book.isbn_13);
        const match =
          editions.find((edition: any) => edition.id === book.id) ??
          editions[0];
        if (isActive) setOwners(match?.usersOwning ?? []);
      } catch (error) {
        console.log("Failed to fetch book owners", error);
      } finally {
        if (isActive) setOwnersLoading(false);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [book.isbn_13, book.id]);

  const otherOwners = owners.filter((owner: any) => owner.id !== userId);

  const handleAction = async (actionType: BookCollection) => {
    setIsActionSheetOpen(false);
    setListError(null);

    try {
      await addBooksToCollection({
        collection: actionType,
        books: [book],
      });
      setSelectedAction(actionType);
      setTimeout(() => setIsInfoDialogOpen(true), 300);
    } catch (error: any) {
      setListError(error.message || "Failed to add book.");
    }
  };

  const actions = generateActions(handleAction, () =>
    setIsActionSheetOpen(false)
  );

  const navigateOwners = () => {
    navigation.navigate("UserList", {
      data: { ...book, usersOwning: otherOwners },
    });
  };

  const getInfoDialogConfig = (action: string | null) => {
    if (action === BookCollections.WISHLIST) {
      return {
        title: i18n.t("successfully-added"),
        description: i18n.t("the-book-added-to-wishlist"),
        buttonLabel: i18n.t("see-my-wishlist"),
        onConfirm: () =>
          navigation.navigate("ProfileStack", { screen: "Wishlist" }),
      };
    }
    if (action === BookCollections.LIBRARY) {
      return {
        title: i18n.t("successfully-added"),
        description: i18n.t("the-book-added-to-library"),
        buttonLabel: i18n.t("see-my-library"),
        onConfirm: () =>
          navigation.navigate("ProfileStack", { screen: "Library" }),
      };
    }
    return null;
  };

  useEffect(() => {
    if (!listError) return;
    const timer = setTimeout(() => setListError(null), 5000);
    return () => clearTimeout(timer);
  }, [listError]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsActionSheetOpen(false);
        setIsInfoDialogOpen(false);
        setListError(null);
      };
    }, [])
  );

  const config = getInfoDialogConfig(selectedAction);

  return (
    <Screen scroll>
      <Box px={4} pt={2} pb={10}>
        <HStack alignItems="center" mb={4}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
            <ChevronLeftIcon size="6" color="coolGray.800" />
          </Pressable>
          <Heading flex={1} textAlign="center" fontSize={18} mr={6}>
            {i18n.t("book-details")}
          </Heading>
        </HStack>

        <VStack alignItems="center" mb={6}>
          <AspectRatio ratio={2 / 3} w="180px">
            <Image
              source={book.coverUrl ? { uri: book.coverUrl } : IMAGE_FALLBACKS.BOOK_COVER}
              alt={`Cover of ${book.title}`}
              resizeMode="cover"
              rounded="8"
            />
          </AspectRatio>
          <Text mt={4} bold fontSize={20} textAlign="center" numberOfLines={3}>
            {book.title}
          </Text>
          {!!book.author && (
            <Text mt={1} color="#838384" fontSize={14} textAlign="center">
              {book.author}
            </Text>
          )}
          {!!book.publisher && (
            <Text mt={1} color="#A6A6A6" fontSize={12} textAlign="center">
              {book.publisher}
            </Text>
          )}
        </VStack>

        <Box mb={6}>
          <Text color="black.400" fontWeight="700" mb={2}>
            {i18n.t("owners")}
          </Text>
          {ownersLoading ? (
            <Box h="60px" justifyContent="center">
              <LoadingOverlay />
            </Box>
          ) : otherOwners.length > 0 ? (
            <Pressable onPress={navigateOwners}>
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                borderWidth="0.5"
                borderColor="#E0E0E0"
                rounded="10"
                p={3}
              >
                <HStack alignItems="center" space={3}>
                  <HStack>
                    {otherOwners.slice(0, 3).map((owner: any, index: number) => (
                      <Box
                        key={owner.id}
                        ml={index === 0 ? 0 : -3}
                        borderWidth={2}
                        borderColor="#fff"
                        rounded="full"
                      >
                        <Image
                          source={IMAGE_FALLBACKS.USER_AVATAR}
                          alt="Owner avatar"
                          size={8}
                          rounded="full"
                        />
                      </Box>
                    ))}
                  </HStack>
                  <Text fontSize={14} color="coolGray.800">
                    {otherOwners.length} {i18n.t("owner")}
                  </Text>
                </HStack>
                <ChevronRightIcon size="5" color="coolGray.500" />
              </Flex>
            </Pressable>
          ) : (
            <Text color="#A6A6A6" fontSize={13}>
              {i18n.t("no-owners-yet")}
            </Text>
          )}
        </Box>

        <Button variant="primary" rounded="8" onPress={() => setIsActionSheetOpen(true)}>
          {i18n.t("add-to-my-lists")}
        </Button>
      </Box>

      <ActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        actions={actions}
      />

      {config && (
        <InfoDialogBox
          isOpen={isInfoDialogOpen}
          onClose={() => setIsInfoDialogOpen(false)}
          config={config}
        />
      )}

      <ErrorAlert message={listError} />
    </Screen>
  );
}
