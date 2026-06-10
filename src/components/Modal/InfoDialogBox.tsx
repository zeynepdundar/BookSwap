import React, { memo } from "react";
import { Button, CheckCircleIcon, Modal, Text, VStack } from "native-base";
import i18n from "@/i18n";
import { BookCollections } from "@/types/book.types";

interface InfoDialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAction: string | null;
  navigation: any;
}

export const InfoDialogBox: React.FC<InfoDialogBoxProps> = memo(({ 
  isOpen, 
  onClose, 
  selectedAction,
  navigation 
}) => {
  
  // 1. Centralized fallbacks/defaults
  let title = "Success";
  let description = "Book processed successfully";
  let confirmButtonLabel = "OK";
  let screenTarget: string | null = null;

  // 2. Map actions dynamically based on your collections enum
  if (selectedAction === BookCollections.WISHLIST) {
    title = i18n.t("successfully-added");
    description = i18n.t("the-book-added-to-wishlist");
    confirmButtonLabel = i18n.t("see-my-wishlist");
    screenTarget = "Wishlist";
  } else if (selectedAction === BookCollections.LIBRARY) {
    title = i18n.t("successfully-added");
    description = i18n.t("the-book-added-to-library");
    confirmButtonLabel = i18n.t("see-my-library");
    screenTarget = "Library";
  }

  // 3. Centralized click action wrapper
  const handlePrimaryPress = () => {
    onClose(); // Clean up state in the parent search screen first

    if (screenTarget) {
      navigation.navigate("ProfileStack", { screen: screenTarget });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={true} isKeyboardDismissable={true}>
      <Modal.Content maxW="320px" w="90%" alignSelf="center" px="4" py="3" rounded="lg">
        
        <Modal.Header borderBottomWidth={0} px="0" mt="3" mb="1">
          <VStack alignItems="center" space={1} width="100%">
            <CheckCircleIcon size="8" color="primary.50" />
            <Text fontSize="18px" fontWeight="600" color="black.400" textAlign="center" lineHeight="24px">
              {title}
            </Text>
          </VStack>
        </Modal.Header>

        <Modal.Body pt="1" pb="3" px="2">
          <Text fontSize="15px" fontWeight="400" color="black.200" textAlign="center" lineHeight="20px">
            {description}
          </Text>
        </Modal.Body>

        <Modal.Footer borderTopWidth={0} justifyContent="center" pt="1" pb="3">
          <Button
            variant="outline"
            onPress={handlePrimaryPress}
            px="5"
            py="2.5"
            w="100%"
            rounded="md"
          >
            <Text fontSize="15px" fontWeight="600">
              {confirmButtonLabel?.toUpperCase()}
            </Text>
          </Button>
        </Modal.Footer>

      </Modal.Content>
    </Modal>
  );
});