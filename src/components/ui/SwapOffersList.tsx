import React from "react";
import {
  AspectRatio,
  Box,
  Center,
  Divider,
  FlatList,
  Flex,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { formatText, getImageSource, truncateText } from "@/utils/helper";
import { IMAGE_FALLBACKS } from "@/constants/image";

export type SwapOfferType = "received" | "sent" | "history";

interface EmptyStateConfig {
  iconName: React.ComponentProps<typeof MaterialIcons>["name"];
  title: string;
  subtitle: string;
}

interface SwapOffersListProps {
  type: SwapOfferType;
  data: any[];
  refreshing: boolean;
  onRefresh: () => void;
  onNavigateProfile: (profile: any) => void;
  /** Own avatar source, shown in the card header for received/sent. */
  ownProfileImage?: any;
  /** Renders the action row for a card. Ignored for the `history` type. */
  renderActions?: (item: any) => React.ReactNode;
  emptyState: EmptyStateConfig;
}

/** A single book cover + title + author column used inside a swap card. */
function BookColumn({
  book,
  maxTitle = 36,
}: {
  book: any;
  maxTitle?: number;
}) {
  return (
    <VStack flex={1} alignItems="center">
      <AspectRatio w="70%" ratio={{ base: 45 / 68 }} mb="2">
        <Image
          source={getImageSource(book?.coverUrl, IMAGE_FALLBACKS.BOOK_COVER)}
          alt={`Book cover: ${book?.title ?? "Unknown title"}`}
          rounded="lg"
        />
      </AspectRatio>
      <Text color="#000000" fontSize="12" fontWeight={500} numberOfLines={2}>
        {truncateText(formatText(book?.title), maxTitle)}
      </Text>
      <Text color="#8c8c8c" fontSize="11" numberOfLines={2}>
        {truncateText(formatText(book?.author), 30)}
      </Text>
    </VStack>
  );
}

/** Full card with a user header, book pair and an optional action row. */
function OfferCard({
  item,
  type,
  ownProfileImage,
  onNavigateProfile,
  renderActions,
}: {
  item: any;
  type: SwapOfferType;
  ownProfileImage?: any;
  onNavigateProfile: (profile: any) => void;
  renderActions?: (item: any) => React.ReactNode;
}) {
  // Sent shows offered → requested; received/history show requested → offered.
  const leftBook = type === "sent" ? item?.offeredBook : item?.requestedBook;
  const rightBook = type === "sent" ? item?.requestedBook : item?.offeredBook;

  return (
    <Box pb="10" alignItems="center">
      {/* ===== HEADER (OUTSIDE CARD) ===== */}
      <Flex
        direction="row"
        justifyContent="space-between"
        w="92%"
        alignItems="center"
        zIndex={2}
        mb="-1"
      >
        {/* LEFT USER (you) */}
        <Box
          p={1}
          rounded="full"
          bg="white"
          shadow={1}
          zIndex={3}
        >
          <Image
            source={getImageSource(
              ownProfileImage,
              IMAGE_FALLBACKS.USER_AVATAR
            )}
            size={10}
            rounded="full"
          />
        </Box>

        {/* RIGHT USER (name + time + avatar) */}
        <Pressable onPress={() => onNavigateProfile(item?.participantProfile)}>
          <HStack alignItems="center" space={2}>
            <VStack alignItems="flex-end" space={0.5}>
              <Text fontSize="md" fontWeight="500" color="#161719" >
                {item?.participantProfile?.name}
              </Text>
              <Text fontSize="xs" color="coolGray.400" mt={-1.5}>
                {item?.createdAt}
              </Text>
            </VStack>
            <Box
              p={1}
              rounded="full"
              bg="white"
              shadow={1}
              zIndex={10}
            >
              <Image
                source={getImageSource(
                  item?.participantProfile?.photo_file_name,
                  IMAGE_FALLBACKS.USER_AVATAR
                )}
                size={10}
                rounded="full"
              />
            </Box>
          </HStack>
        </Pressable>
      </Flex>

      {/* ===== MAIN CARD ===== */}
      <Box
        w="92%"
        bg="white"
        borderWidth={1}
        borderColor="coolGray.100"
        borderRadius="16"
        shadow={1}
      >
        {/* BOOKS */}
        <HStack
          justifyContent="space-between"
          alignItems="center"
          px={4}
          pt={5}
          pb={4}
        >
          <BookColumn book={leftBook} />

          <Center
            w={12}
            h={12}
            rounded="full"
            bg="primary.50"
          >
            <Icon
              as={MaterialIcons}
              name="swap-horiz"
              color="primary.500"
              size="md"
            />
          </Center>

          <BookColumn book={rightBook} />
        </HStack>

        {/* ACTIONS */}
        {renderActions ? (
          <>
            <Divider bg="coolGray.100" />
            <Box px={4} py={3}>
              {renderActions(item)}
            </Box>
          </>
        ) : null}
      </Box>
    </Box >
  );
}

export const SwapOffersList: React.FC<SwapOffersListProps> = ({
  type,
  data,
  refreshing,
  onRefresh,
  onNavigateProfile,
  ownProfileImage,
  renderActions,
  emptyState,
}) => {
  if (!data || data.length === 0) {
    return (
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
            name={emptyState.iconName}
            size="lg"
            color="primary.500"
          />
        </Box>

        <Text fontSize="lg"
          color="gray.900"
          textAlign="center"
          fontFamily="poppins-medium">
          {emptyState.title}
        </Text>

        <Text
          fontSize="sm"
          color="gray.500"
          textAlign="center"
          lineHeight={20}
          px="8"
        >
          {emptyState.subtitle}
        </Text>
      </VStack>
    );
  }

  return (
    <FlatList
      flex={1}
      w="100%"
      bg="#fff"
      data={data}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={{
        paddingVertical: 8,
      }}
      keyExtractor={(item) => `${type}-${item.id}`}
      renderItem={({ item }) => (
        <OfferCard
          item={item}
          type={type}
          ownProfileImage={ownProfileImage}
          onNavigateProfile={onNavigateProfile}
          renderActions={renderActions}
        />
      )}
    />
  );
};
