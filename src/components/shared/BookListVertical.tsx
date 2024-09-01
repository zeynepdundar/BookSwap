import { useEffect, useState } from "react";
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
import { InfoDialogBox } from "../Modal/InfoDialogBox";
import { MaterialIcons } from "@expo/vector-icons";
import { ActionSheet } from "../ActionSheet";
import { formatText, generateActions, truncateText } from "../../utils/helper";
import i18n from "../../i18n";
import { useSelector } from "react-redux";
import { ListTypes } from "../../constants";
interface BookListVerticalProps {
  data: any[]; // Replace YourItemType with the actual type of your data items
  onPrimaryAction?: (id: string) => void;
  onSecondaryAction?: (item: any) => void;
  onNavigateList?: (item: any) => void;
  onSendOffer?: (id: any) => void;
  showSendOfferButton?: boolean;
}
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
  const [selectedAction, setSelectedAction] = useState<typeof ListTypes | null>(
    null
  );
  const importUrl = require("../../assets/images/no-cover-available.png");
  const { id: userId } = useSelector((state: any) => state.profile.profile);

  const handleAction = async (actionType) => {
    const result = await onSecondaryAction({
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

  const actions = generateActions(handleAction, closeActionSheet);

  return (
    <>
      <FlatList
        maxWidth="100%"
        mx="3"
        height="100%"
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <>
            <Box
              // pl={["3", "4"]}
              // pr={["3", "5"]}
              // py="2"
              // mb="1"
              // justifyContent="center"
              height="135"
              p="3"
              mx="2"
              my="1"
              key={item.id}
            >
              <HStack
                justifyContent="space-between"
                width="100%"
                space={3}
                p={1}
              >
                <AspectRatio
                  w="20%"
                  ratio={{
                    base: 40 / 62,
                  }}
                >
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
                <VStack width={173}>
                  <Text color="#000000" fontSize="15" numberOfLines={2}>
                    {truncateText(formatText(item.title), 44)}
                  </Text>
                  <Text color="#8c8c8c" fontSize="11" numberOfLines={1}>
                    {truncateText(formatText(item.author), 30)}
                  </Text>
                  {/* Backend den publishers şeklinde gelen array , handle etmek için */}
                  {item.publisher ||
                  (Array.isArray(item.publishers) &&
                    item.publishers.length > 0) ? (
                    <Text
                      color="#8c8c8c"
                      fontSize="13"
                      fontWeight="200"
                      numberOfLines={item?.usersOwning ? 1 : 2}
                    >
                      {Array.isArray(item.publishers) &&
                      item.publishers.length > 0
                        ? truncateText(formatText(item.publishers[0]), 30)
                        : truncateText(formatText(item.publisher), 50)}
                    </Text>
                  ) : (
                    // Render something else or nothing when both item.publisher and item.publishers are null or empty
                    ""
                  )}

                  {item?.usersOwning && (
                    <>
                      <Spacer></Spacer>
                      <Pressable
                        onPress={() => {
                          const filteredOwners = item.usersOwning.filter(
                            (owner) => owner.id !== userId
                          );
                          const newItem = {
                            ...item,
                            usersOwning: filteredOwners,
                          };
                          onNavigateList(newItem);
                        }}
                        borderColor="#323232"
                        borderWidth="0.5"
                        borderRadius="9"
                        p="1"
                        width="90px"
                        disabled={
                          item.usersOwning.filter(
                            (owner) => owner.id !== userId
                          ).length === 0
                        }
                      >
                        <Text
                          alignSelf="center"
                          color="#323232"
                          fontSize="12px"
                        >
                          {
                            item.usersOwning.filter(
                              (owner) => owner.id !== userId
                            ).length
                          }{" "}
                          Owner
                        </Text>
                      </Pressable>
                    </>
                  )}
                </VStack>
                <Spacer />
                <VStack>
                  {onPrimaryAction && onPrimaryAction(item)}
                  {!onPrimaryAction && (
                    <Icon
                      onPress={() => openActionSheet(item)}
                      name={"more-vert"}
                      variant="solid"
                      size="lg"
                      as={MaterialIcons}
                    />
                  )}
                  {onSendOffer && (
                    // <Pressable
                    //   onPress={() => onSendOffer(item.id)}
                    //   borderColor="#007BFF"
                    //   borderWidth="1"
                    //   borderRadius="9"
                    //   p="2"
                    //   width="90px"
                    // >
                    //   <Text alignSelf="center" color="#007BFF" fontSize="12px">
                    //     Send Offer
                    //   </Text>
                    // </Pressable>
                    <Button
                      onPress={() => onSendOffer({ item })}
                      variant="primary"
                      right={2}
                      bottom="-14"
                      position="absolute"
                      py={2}
                      px={0}
                      width={126}
                    >
                      {i18n.t("send-offer")}
                    </Button>
                  )}

                  <Spacer />
                </VStack>
              </HStack>
            </Box>
            <Divider mt="0" mb="3" mx="4" width={"90%"} bg="#EEEEEE" />
          </>
        )}
        keyExtractor={(item) => item.id}
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
        actionType={selectedAction}
        selectedItem={selectedItem}
      />
    </>
  );
};
