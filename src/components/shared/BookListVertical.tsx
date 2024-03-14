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
} from "native-base";
import { InfoDialogBox } from "../Modal/InfoDialogBox";
import { MaterialIcons } from "@expo/vector-icons";
import { ActionSheet } from "../ActionSheet";
import { LIBRARY, WISHLIST, ListTypes } from "../../store/profile-slice";
import { formatText, generateActions, truncateText } from "../../utils/helper";
interface BookListVerticalProps {
  data: any[]; // Replace YourItemType with the actual type of your data items
  primaryActionButton?: (id: string) => void;
  secondaryAction?: (item: any) => void;
  onNavigateList?: (item: any) => void;
}
export const BookListVertical: React.FC<BookListVerticalProps> = ({
  data,
  primaryActionButton,
  secondaryAction,
  onNavigateList,
  ...props
}) => {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedAction, setSelectedAction] = useState<typeof ListTypes | null>(
    null
  );
  const importUrl = require("../../assets/images/no-cover-available.png");



  const handleAction = (actionType) => {
    secondaryAction({
      type: actionType,
      id: selectedItem?.id,
      title: selectedItem.title,
      author: selectedItem.author,
      publisher: selectedItem.publisher,
      coverUrl: selectedItem.coverUrl,
    });
    setSelectedAction(actionType);
    closeActionSheet();
    setIsInfoDialogOpen(true);
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
              height="120"
              p="3"
              mx="2"
              my="1"
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
                    source={item.coverUrl ? { uri: item?.coverUrl } : importUrl}
                    alt={`Cover of ${item.title} by ${item.author}`}
                    roundedRight="4"
                  />
                </AspectRatio>
                <VStack width={173}>
                  <Text color="#000000" fontSize="15" numberOfLines={2}>
                    {truncateText(formatText(item.title),44)}
                  </Text>
                  <Text color="#8c8c8c" fontSize="11"  numberOfLines={1}>
                    {truncateText(formatText(item.author),30)}

                  </Text>
                  {/* Backend den publishers şeklinde gelen array , handle etmek için */}
                  {item.publisher ||
                  (Array.isArray(item.publishers) &&
                    item.publishers.length > 0) ? (
                    <Text color="#8c8c8c" fontSize="13" fontWeight="200">
                      {Array.isArray(item.publishers) &&
                      item.publishers.length > 0
                        ? formatText(item.publishers[0])
                        : formatText(item.publisher)}
                    </Text>
                  ) : // Render something else or nothing when both item.publisher and item.publishers are null or empty
                  null}

                  {item?.usersOwning && (
                    <>
                      <Spacer></Spacer>
                      <Pressable
                        onPress={() => {
                          onNavigateList(item);
                        }}
                        borderColor="#323232"
                        borderWidth="0.5"
                        borderRadius="9"
                        p="1"
                        width="90px"
                      >
                        <Text
                          alignSelf="center"
                          color="#323232"
                          fontSize="12px"
                        >
                          {item.usersOwning.length} Owner
                        </Text>
                      </Pressable>
                    </>
                  )}
                </VStack>
                <Spacer />
                <VStack>
                  {primaryActionButton && primaryActionButton(item)}
                  {!primaryActionButton && (
                    <Icon
                      onPress={() => openActionSheet(item)}
                      name={"more-vert"}
                      variant="solid"
                      size="md"
                      as={MaterialIcons}
                    />
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
      {secondaryAction && (
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
