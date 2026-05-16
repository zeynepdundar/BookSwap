import React, { useCallback, useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  FlatList,
  Image,
  HStack,
  VStack,
  Text,
  Spacer,
  Divider,
  Icon,
  Box,
  AspectRatio,
  Pressable,
  Button,
} from "native-base";

import { ActionSheet } from "@/components/shared/ActionSheet";
import { formatText, generateActions, truncateText } from "@/utils/helper";
import i18n from "@/i18n";
import { useSelector } from "react-redux";
import { BookCollections } from "@/types/book.types";
import { InfoDialogBox } from "@/components/Modal/InfoDialogBox";
interface BookListVerticalProps {
  data: any[]; // Replace YourItemType with the actual type of your data items
  onPrimaryAction?: (id: string) => void;
  onSecondaryAction?: (item: any) => void;
  onNavigateList?: (item: any) => void;
  onSendOffer?: (id: any) => void;
  showSendOfferButton?: boolean;
}

const ListRow = React.memo(function ListRow({
  item,
  onNavigateList,
  userId,
  onPrimaryAction,
  openActionSheet,
  onSendOffer,
}: any) {
  return (
    <>
      <Box height="125" mx="2" pl="2" ml="2" key={item.id} overflow="hidden">
      <HStack justifyContent="space-between" width="100%" space={3} py={1}>
        <AspectRatio w={{ base: "22%", md: "18%" }} ratio={40 / 62} maxWidth="80px">
          <Image
            source={
              item.coverUrl
                ? { uri: item?.coverUrl }
                : {
                    uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg",
                  }
            }
            alt={`Cover of ${item.title} by ${item.author}`}
            roundedRight="4"
          />
        </AspectRatio>
        <VStack width={198}>
          <Text color="#000000" fontSize="15" numberOfLines={2} lineHeight="18">
            {truncateText(formatText(item.title), 44)}
          </Text>
          <Text color="#8c8c8c" fontSize="11" numberOfLines={1}>
            {truncateText(formatText(item.author), 30)}
          </Text>
          {item.publisher ||
          (Array.isArray(item.publishers) && item.publishers.length > 0) ? (
            <Text color="#8c8c8c" fontSize="13" fontWeight="200" numberOfLines={item?.usersOwning ? 1 : 2}>
              {Array.isArray(item.publishers) && item.publishers.length > 0
                ? truncateText(formatText(item.publishers[0]), 30)
                : truncateText(formatText(item.publisher), 50)}
            </Text>
          ) : (
            ""
          )}

          {item?.usersOwning && (
            <Pressable
              onPress={() => handleNavigateList(item, onNavigateList, userId)}
              borderColor="#323232"
              borderWidth="0.5"
              borderRadius="9"
              p="1"
              mt="4"
              width="90px"
              disabled={item.usersOwning.filter((owner) => owner.id !== userId).length === 0}
            >
              <Text alignSelf="center" color="#323232" fontSize="12px">
                {item.usersOwning.filter((owner) => owner.id !== userId).length} Owner
              </Text>
            </Pressable>
          )}
        </VStack>
        <Spacer />
        <VStack>
          {onPrimaryAction && onPrimaryAction(item)}
          {!onPrimaryAction && (
            <Icon
              onPress={() => openActionSheet(item)}
              name="more-vert"
              variant="solid"
              size="lg"
              as={MaterialIcons}
            />
          )}
          {onSendOffer && (
            <Button
              onPress={() => onSendOffer({ item })}
              variant="primary"
              right={2}
              bottom={0}
              position="absolute"
              py="6px"
              px={0}
              rounded="6"
              width={126}
            >
              {i18n.t("send-offer")}
            </Button>
          )}
          <Spacer />
        </VStack>
      </HStack>
      </Box>
      <Box w="100%" alignSelf="center">
        <Divider my={2} mx="auto" w="90%" bg="#EEEEEE" />
      </Box>
    </>
  );
});

const keyExtractor = (item) => item.id;

const handleNavigateList = (item, onNavigateList, userId) => {
  const filteredOwners = item.usersOwning.filter((owner) => owner.id !== userId);
  const newItem = { ...item, usersOwning: filteredOwners };
  onNavigateList(newItem);
};
export const BookListVertical: React.FC<BookListVerticalProps> = ({
  data,
  onPrimaryAction,
  onSecondaryAction,
  onNavigateList,
  onSendOffer,
  showSendOfferButton,
  ...props
}) => {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const { id: userId } = useSelector((state: any) => state.profile.profile);

  useFocusEffect(
    useCallback(() => {
      // Reset state when the screen is focused
      setIsInfoDialogOpen(false);
      setIsActionSheetOpen(false);
      setSelectedItem(null);
      setSelectedAction(null);

      // Optionally, return a cleanup function if needed
      return () => {
        // Cleanup actions if necessary
      };
    }, [])
  );

  const handleAction = async (actionType) => {
    Keyboard.dismiss();
    const result: any = await onSecondaryAction({
      type: actionType,
      id: selectedItem?.id,
      title: selectedItem.title,
      author: selectedItem.author,
      publisher: selectedItem.publisher,
      coverUrl: selectedItem.coverUrl,
    });

    if (!result.success) {
      // Handle the error message if action failed
    } else {
      setSelectedAction(actionType);
      setIsInfoDialogOpen(true);
    }
    closeActionSheet();
  };
  const openActionSheet = (item) => {
    Keyboard.dismiss();
    setSelectedItem(item);
    setIsActionSheetOpen(true);
  };
  const closeActionSheet = () => {
    setSelectedItem(null);
    setIsActionSheetOpen(false);
  };
  const closeInfoDialog = () => {
    setIsInfoDialogOpen(false);
  };

  const navigation = useNavigation<any>();

  // Prepare dialog content based on selected action
  let title, description, buttonVariant, confirmButtonLabel, navigateToScreen;
  if (selectedAction === BookCollections.WISHLIST) {
    title = i18n.t("successfully-added");
    description = i18n.t("the-book-added-to-wishlist");
    buttonVariant = "outline";
    confirmButtonLabel = i18n.t("see-my-wishlist");
    navigateToScreen = () =>
      navigation.navigate("ProfileStack", { screen: "Wishlist" });
  } else if (selectedAction === BookCollections.LIBRARY) {
    title = i18n.t("successfully-added");
    description = i18n.t("the-book-added-to-library");
    buttonVariant = "outline";
    confirmButtonLabel = i18n.t("see-my-library");
    navigateToScreen = () =>
      navigation.navigate("ProfileStack", { screen: "Library" });
  }

  const actions = generateActions(handleAction, closeActionSheet);

  const renderItemCb = useCallback(
    ({ item }) => (
      <ListRow
        item={item}
        onNavigateList={onNavigateList}
        userId={userId}
        onPrimaryAction={onPrimaryAction}
        openActionSheet={openActionSheet}
        onSendOffer={onSendOffer}
      />
    ),
    [onNavigateList, userId, onPrimaryAction, onSendOffer]
  );

  const keyExtractorCb = useCallback((item: any) => item.id, []);

  return (
    <>
      <FlatList
        maxWidth="100%"
        height="100%"
        data={data}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={Keyboard.dismiss}
        keyboardShouldPersistTaps="handled"
        renderItem={renderItemCb}
        keyExtractor={keyExtractorCb}
        windowSize={7}
        removeClippedSubviews
      />
      {onSecondaryAction && (
        <ActionSheet
          isOpen={isActionSheetOpen}
          onClose={closeActionSheet}
          actions={actions}
        />
      )}
      <InfoDialogBox
        isOpen={isInfoDialogOpen}
        onClose={closeInfoDialog}
        title={title}
        description={description}
        primaryAction={{ label: confirmButtonLabel, variant: buttonVariant, onPress: navigateToScreen }}
      />
    </>
  );
};
