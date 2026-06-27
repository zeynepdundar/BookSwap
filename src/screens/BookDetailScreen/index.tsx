import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Icon
} from "native-base";

import {
  MaterialIcons
} from "@expo/vector-icons";
import {
  Box,
  ChevronLeftIcon,
  ChevronRightIcon,
  HStack,
  Heading,
  Image,
  Pressable,
  Text,
  VStack,
  AspectRatio,
} from "native-base";
import i18n from "@/i18n";
import Screen from "@/components/ui/Screen";
import { InfoDialogBox } from "@/components/Modal/InfoDialogBox";
import { useAppToast } from "@/hooks/useAppToast";
import { useAddBooksToCollection } from "@/hooks/api/useAddBookToList";
import { fetchBooksByISBN } from "@/services/books/books.service";
import { BookCollection, BookCollections } from "@/types/book.types";
import { IMAGE_FALLBACKS } from "@/constants/image";

export default function BookDetailScreen({ navigation, route }) {
  const book = route?.params?.book ?? {};

  const { id: userId } = useSelector(
    (state: any) => state.profile.profile
  );

  const { addBooksToCollection } = useAddBooksToCollection();

  const [owners, setOwners] = useState<any[]>(
    book.usersOwning ?? []
  );

  const [ownersLoading, setOwnersLoading] =
    useState(false);

  const [selectedAction, setSelectedAction] =
    useState<string | null>(null);

  const [isInfoDialogOpen, setIsInfoDialogOpen] =
    useState(false);

  const toast = useAppToast();


  useEffect(() => {
    if (book.usersOwning?.length || !book.isbn_13) return;

    let active = true;

    const loadOwners = async () => {
      try {
        setOwnersLoading(true);

        const editions = await fetchBooksByISBN(
          book.isbn_13
        );

        const match =
          editions.find(
            (edition: any) =>
              edition.id === book.id
          ) ?? editions[0];


        if (active) {
          setOwners(
            match?.usersOwning ?? []
          );
        }

      } catch (error) {
        console.log(
          "Failed to fetch owners",
          error
        );
      } finally {
        if (active) {
          setOwnersLoading(false);
        }
      }
    };


    loadOwners();

    return () => {
      active = false;
    };

  }, [book.id, book.isbn_13]);


  const otherOwners = owners.filter(
    (owner) => owner.id !== userId
  );


  const handleAction = async (
    actionType: BookCollection
  ) => {

    try {

      await addBooksToCollection({
        collection: actionType,
        books: [book],
      });


      setSelectedAction(actionType);

      setTimeout(() => {
        setIsInfoDialogOpen(true);
      }, 300);


    } catch (error: any) {

      toast.error(error.message ?? "Failed to add book");
    }
  };


  const navigateOwners = () => {
    navigation.navigate(
      "UserList",
      {
        data: {
          ...book,
          usersOwning: otherOwners,
        },
      }
    );
  };


  const getDialogConfig = () => {

    if (
      selectedAction === BookCollections.WISHLIST
    ) {
      return {
        title: i18n.t(
          "successfully-added"
        ),
        description: i18n.t(
          "the-book-added-to-wishlist"
        ),
        buttonLabel:
          i18n.t("see-my-wishlist"),

        onConfirm: () =>
          navigation.navigate(
            "ProfileStack",
            {
              screen: "Wishlist",
            }
          ),
      };
    }


    if (
      selectedAction === BookCollections.LIBRARY
    ) {
      return {
        title: i18n.t(
          "successfully-added"
        ),
        description: i18n.t(
          "the-book-added-to-library"
        ),
        buttonLabel:
          i18n.t("see-my-library"),

        onConfirm: () =>
          navigation.navigate(
            "ProfileStack",
            {
              screen: "Library",
            }
          ),
      };
    }


    return null;
  };


  const dialogConfig = getDialogConfig();


  return (
    <Screen>
      <Box
        flex={1}
        px={5}
        pt={5}
        pb={6}
        bg="white"
      >

        {/* Header */}
        <HStack
          alignItems="center"
          mb={4}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={12}
          >
            <Box
              bg="gray.100"
              rounded="full"
              p={2}
            >
              <ChevronLeftIcon
                size={5}
                color="gray.500"
              />
            </Box>
          </Pressable>

        </HStack>


        <VStack
          flex={1}
          justifyContent="space-between"
        >


          <VStack>


            {/* Cover */}
            <Box
              alignItems="center"
              justifyContent="center"
            >
              <Box
                rounded="md"
                overflow="hidden"
                shadow={4}
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.18,
                  shadowRadius: 14,
                  shadowOffset: { width: 0, height: 8 },
                  elevation: 8,
                }}
              >
                <AspectRatio ratio={2 / 3} w="190px">
                  <Image
                    source={
                      book.coverUrl?.trim()
                        ? { uri: book.coverUrl }
                        : IMAGE_FALLBACKS.BOOK_COVER
                    }
                    alt={book.title}
                    resizeMode="cover"
                  />
                </AspectRatio>
              </Box>
            </Box>

            {/* Title & Author */}
            <VStack
              alignItems="center"
              space={1.5}
              mt={6}
              px={2}
            >
              <Heading
                fontSize="2xl"
                fontFamily="poppins-semi-bold"
                color="gray.900"
                textAlign="center"
                noOfLines={2}
              >
                {book.title}
              </Heading>

              {!!book.author && (
                <Text
                  fontSize="sm"
                  color="gray.500"
                  fontFamily="poppins-medium"
                  textAlign="center"
                  noOfLines={1}
                >
                  {book.author}
                </Text>
              )}

              {!!book.publisher && (
                <Text
                  fontSize="xs"
                  color="gray.500"
                  textAlign="center"
                  noOfLines={1}
                >
                  {book.publisher}
                </Text>
              )}
            </VStack>

            {/* Owners */}
            <Pressable
              mt={6}
              onPress={navigateOwners}
              disabled={ownersLoading || otherOwners.length === 0}
              _pressed={{ opacity: 0.7 }}
            >
              <HStack
                alignItems="center"
                space={3}
                bg="gray.100"
                borderWidth={1}
                borderColor="gray.200"
                rounded="2xl"
                px={4}
                py={3.5}
              >
                <Box
                  bg="primary.500"
                  rounded="full"
                  p={2.5}
                >
                  <Icon
                    as={MaterialIcons}
                    name="people-alt"
                    size="5"
                    color="white"
                  />
                </Box>

                <VStack flex={1}>
                  <Text
                    fontSize={15}
                    fontWeight="700"
                    color="gray.800"
                  >
                    {otherOwners.length > 0
                      ? i18n.t("available-count", {
                        count: otherOwners.length,
                      })
                      : i18n.t("no-owners-yet")}
                  </Text>
                  {otherOwners.length > 0 && (
                    <Text fontSize={12} color="gray.500">
                      {i18n.t("view-all")}
                    </Text>
                  )}
                </VStack>

                {otherOwners.length > 0 && (
                  <ChevronRightIcon
                    size={5}
                    color="gray.400"
                  />
                )}
              </HStack>
            </Pressable>
          </VStack>


          {/* Bottom Actions */}
          <HStack
            space={3}
            mt={6}
          >

            <Pressable
              flex={1}
              onPress={() => handleAction(BookCollections.LIBRARY)}
              _pressed={{ opacity: 0.85 }}
            >
              <VStack
                alignItems="center"
                justifyContent="center"
                space={2}
                bg="primary.500"
                rounded="2xl"
                py={4}
                shadow={2}
              >
                <Icon
                  as={MaterialIcons}
                  name="auto-stories"
                  size="6"
                  color="white"
                />

                <Text
                  fontSize="sm"
                  fontFamily="poppins-semi-bold"
                  color="white"
                >
                  {i18n.t("add-to-library")}
                </Text>
              </VStack>
            </Pressable>
            <Pressable
              flex={1}
              onPress={() => handleAction(BookCollections.WISHLIST)}
              _pressed={{ opacity: 0.85 }}
            >
              <VStack
                alignItems="center"
                justifyContent="center"
                space={2}
                bg="white"
                borderWidth={1}
                borderColor="gray.200"
                rounded="2xl"
                py={4}
                shadow={1}
              >
                <Icon
                  as={MaterialIcons}
                  name="favorite-border"
                  size="6"
                  color="primary.500"
                />

                <Text
                  fontSize="sm"
                  fontFamily="poppins-semi-bold"
                  color="gray.700"
                >
                  {i18n.t("add-to-wishlist")}
                </Text>
              </VStack>
            </Pressable>
          </HStack>


        </VStack>


      </Box>


      {
        dialogConfig &&
        <InfoDialogBox

          isOpen={isInfoDialogOpen}

          onClose={() =>
            setIsInfoDialogOpen(false)
          }

          config={dialogConfig}

        />
      }


    </Screen>
  );
}