import React, { memo } from "react";
import { Button, CheckCircleIcon, Modal, Text, VStack } from "native-base";
import i18n from "@/i18n";
import { BookCollections } from "@/types/book.types";

interface InfoDialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAction?: string | null;
  navigation?: any;
  // Fallback options for dynamic cases like trade offerings
  title?: string;
  description?: string;
  confirmButtonLabel?: string;
  onConfirmPress?: () => void;
}

export const InfoDialogBox: React.FC<InfoDialogBoxProps> = memo(({ 
  isOpen, 
  onClose, 
  selectedAction = null,
  navigation,
  title: directTitle,
  description: directDescription,
  confirmButtonLabel: directLabel,
  onConfirmPress
}) => {
  
  // 1. Establish Default Working Parameters
  let displayTitle = directTitle || "Success";
  let displayDescription = directDescription || "Processed successfully";
  let displayBtnLabel = directLabel || "OK";
  let screenTarget: string | null = null;

  // 2. Map actions dynamically based on collection enums if specified
  if (selectedAction === BookCollections.WISHLIST) {
    displayTitle = i18n.t("successfully-added");
    displayDescription = i18n.t("the-book-added-to-wishlist");
    displayBtnLabel = i18n.t("see-my-wishlist");
    screenTarget = "Wishlist";
  } else if (selectedAction === BookCollections.LIBRARY) {
    displayTitle = i18n.t("successfully-added");
    displayDescription = i18n.t("the-book-added-to-library");
    displayBtnLabel = i18n.t("see-my-library");
    screenTarget = "Library";
  }

  // 3. Click handler routing rules
  const handlePrimaryPress = () => {
    onClose(); 

    if (onConfirmPress) {
      // Execute the custom screen inline callback function
      onConfirmPress();
    } else if (screenTarget && navigation) {
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
              {displayTitle}
            </Text>
          </VStack>
        </Modal.Header>

        <Modal.Body pt="1" pb="3" px="2">
          <Text fontSize="15px" fontWeight="400" color="black.200" textAlign="center" lineHeight="20px">
            {displayDescription}
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
              {displayBtnLabel.toUpperCase()}
            </Text>
          </Button>
        </Modal.Footer>

      </Modal.Content>
    </Modal>
  );
});