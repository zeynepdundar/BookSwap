import { useNavigation } from "@react-navigation/native";
import { AlertDialog, Button, Center, CheckCircleIcon } from "native-base";
import React, { useEffect, useState } from "react";
import i18n from "../../i18n";
import { LIBRARY, WISHLIST } from "../../store/profile-slice";

type MyStackParamList = {
  Home: undefined;
  Profile: undefined;
  Library: undefined;
  Wishlist: undefined;

};

export const InfoDialogBox = ({
  isOpen,
  onClose,
  actionType,
  selectedItem,
}) => {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(isOpen);
  const cancelRef = React.useRef(null);
  const navigation = useNavigation();

  let title, description, buttonVariant, confirmButtonLabel;
  if (actionType === WISHLIST) {
    title = i18n.t("added");
    description = i18n.t("the-book-added-to-wishlist");
    buttonVariant = "outline";
    confirmButtonLabel = i18n.t("see-my-wishlist");
  } else if (actionType === LIBRARY) {
    title = i18n.t("added");
    description = i18n.t("the-book-added-to-library");
    buttonVariant = "outline";
    confirmButtonLabel = i18n.t("see-my-library");
  }
  else if (actionType === "TRADE") {
    title = i18n.t("the-offer-sent");
    description = i18n.t("see-sent-offers-description");
    buttonVariant = "outline";
    confirmButtonLabel = i18n.t("see-my-offers");
  }

  useEffect(() => {
    setIsAlertDialogOpen(isOpen);
  }, [isOpen]);

  const navigateToScreen = (screenName: keyof MyStackParamList ) => {
    navigation.navigate("ProfileStack", {
      screen: screenName,
    }); // Error here
  };

  const WISHLIST_SCREEN: keyof MyStackParamList = "Wishlist";
  const LIBRARY_SCREEN: keyof MyStackParamList = "Library";

  const handleClose = () => {
    setIsAlertDialogOpen(false);
    
    if (onClose) {
      onClose();
      return;
    }
  
    // Perform navigation based on the action type if onClose is not provided
    if (actionType === WISHLIST) {
      navigateToScreen(WISHLIST_SCREEN);
    } else if (actionType === LIBRARY) {
      navigateToScreen(LIBRARY_SCREEN);
    } else if (actionType === "TRADE") {
      navigation.navigate("Trading", { screen: "Sent" });
    }
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isAlertDialogOpen}
      onClose={handleClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header
          _text={{
            fontWeight: "medium",
            letterSpacing: "sm",
            textAlign: "center",
          }}
        >
          <Center>
            <CheckCircleIcon size="lg" color="primary.50" />
          </Center>
        </AlertDialog.Header>
        <AlertDialog.Body
          _text={{
            fontWeight: "medium",
            color: "black.200",
            letterSpacing: "sm",
          }}
        >
          {description}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant={buttonVariant ? buttonVariant : "primary"}
              onPress={handleClose}
            >
              {confirmButtonLabel?.toUpperCase()}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
