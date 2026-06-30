import React, { useCallback, useMemo } from "react";
import { Keyboard, FlatList, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Image,
  HStack,
  VStack,
  Text,
  Divider,
  Icon,
  Box,
  AspectRatio,
  Pressable,
  Button,
} from "native-base";

import { formatText, truncateText } from "@/utils/helper";
import i18n from "@/i18n";
import { useSelector } from "react-redux";
import { Book } from "@/types/book.types";

interface BookListVerticalProps {
  data: Book[];
  showOwners?: boolean;
  onPrimaryAction?: (book: Book) => void;
  onOpenActions?: (item: any) => void;
  onNavigateList?: (item: any) => void;
  onSendOffer?: (id: any) => void;
}

const ListRow = React.memo(function ListRow({
  item,
  onNavigateList,
  userId,
  onPrimaryAction,
  onOpenActions,
  onSendOffer,
  showOwners,
}: any) {
  const owners = item.owners ?? [];
  const ownersCount = item.ownersCount;

  const isDisabled = ownersCount === 0;


  const handleNavigateList = useCallback(() => {
    if (!onNavigateList || isDisabled) return;

    onNavigateList({
      id: item.id,
      usersOwning: owners.filter(o => o.id !== userId),
    });
  }, [onNavigateList, owners, userId, isDisabled, item.id]);
  return (
    <>
      <Box px={3} py={2}>
        <HStack alignItems="center" space={3}>
          <AspectRatio
            w="20"
            ratio={40 / 62}
            overflow="hidden"
            borderRadius="md"
          >
            <Image
              source={
                item.coverUrl
                  ? { uri: item.coverUrl }
                  : {
                    uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg",
                  }
              }
              alt={`Cover of ${item.title}`}
              w="100%"
              h="100%"
            />
          </AspectRatio>

          {/* CONTENT */}
          <VStack flex={1} space={1.5}>
            <Text fontSize="md" fontFamily="poppins-medium" numberOfLines={2}>
              {item.displayTitle}
            </Text>

            <Text color="gray.500" fontSize="sm" numberOfLines={1}>
              {item.displayAuthor}
            </Text>

            {(item.publisher || item.publishers?.length) && (
              <Text color="gray.500" fontSize="xs" numberOfLines={1}>
                {item.displayPublisher}
              </Text>
            )}

            {showOwners && (
              <Pressable
                onPress={handleNavigateList}
                alignSelf="flex-start"
                px={3}
                py={1.5}
                borderRadius="full"
                bg={isDisabled ? "gray.200" : "primary.50"}
                opacity={isDisabled ? 0.5 : 1}
                _pressed={{
                  opacity: 0.7,
                  bg: isDisabled ? "gray.100" : "primary.100",
                }}
              >
                <Text
                  fontSize="xs"
                  fontWeight="500"
                  color={isDisabled ? "gray.500" : "primary.500"}
                >
                  {i18n.t("owners-count", { count: ownersCount })}
                </Text>
              </Pressable>
            )}
          </VStack>

          {/* ACTIONS */}
          <VStack alignItems="flex-end">
            {onPrimaryAction && onPrimaryAction(item)}

            {!onPrimaryAction && (
              <Icon
                onPress={() => onOpenActions?.(item)}
                as={MaterialIcons}
                name="more-vert"
                size="md"
                color="gray.500"
              />
            )}

            {onSendOffer && (
              <Button
                onPress={() => onSendOffer({ item })}
                variant="primary"
                size="sm"
                mt={2}
              >
                {i18n.t("send-offer")}
              </Button>
            )}
          </VStack>
        </HStack>
      </Box>

      <Divider bg="gray.200" />
    </>
  );
});

export const BookListVertical: React.FC<BookListVerticalProps> = ({
  data,
  showOwners,
  onPrimaryAction,
  onOpenActions,
  onNavigateList,
  onSendOffer,
}) => {
  const { id: userId } = useSelector((state: any) => state.profile.profile);

  const normalizedData = useMemo(() => {
    return data.map((item) => {
      const owners = item.usersOwning ?? [];
      const ownersCount = owners.length;

      const firstPublisher = item.publishers?.[0];

      const displayPublisher = firstPublisher
        ? truncateText(formatText(firstPublisher), 30)
        : item.publisher
          ? truncateText(formatText(item.publisher), 50)
          : "";

      return {
        ...item,
        owners,
        ownersCount,
        displayTitle: truncateText(formatText(item.title), 44),
        displayAuthor: truncateText(formatText(item.author), 30),
        displayPublisher,
      };
    });
  }, [data]);

  const renderItemCb = useCallback(
    ({ item }) => (
      <ListRow
        item={item}
        userId={userId}
        showOwners={showOwners}
        onNavigateList={onNavigateList}
        onOpenActions={onOpenActions}
        onSendOffer={onSendOffer}
        onPrimaryAction={onPrimaryAction}
      />
    ),
    [
      userId,
      showOwners,
      onNavigateList,
      onOpenActions,
      onSendOffer,
      onPrimaryAction,
    ]
  );

  const keyExtractorCb = useCallback((item: any) => String(item.id), []);

  return (
    <FlatList
      data={normalizedData}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={7}
      showsVerticalScrollIndicator={false}
      onScrollBeginDrag={Keyboard.dismiss}
      keyboardShouldPersistTaps="handled"
      removeClippedSubviews={Platform.OS === "android"} renderItem={renderItemCb}
      keyExtractor={keyExtractorCb}
      extraData={userId}
      contentContainerStyle={{
        paddingTop: 8,
        paddingBottom: 120,
        paddingHorizontal: 12,
        gap: 10,
      }}
    />
  );
};