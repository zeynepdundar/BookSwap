import { useNavigation } from "@react-navigation/native";
import { AlertDialog, Button, Center, CheckCircleIcon } from "native-base";
import React, { useEffect, useState } from "react";
import i18n from "../i18n";

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
  if (actionType === "wishlist") {
    title = i18n.t("added");
    description = i18n.t("the-book-added-to-wishlist");
    buttonVariant = "outline";
    confirmButtonLabel = i18n.t("see-my-wishlist");
  } else if (actionType === "library") {
    title = i18n.t("added");
    description = i18n.t("the-book-added-to-library");
    buttonVariant = "outline";
    confirmButtonLabel = i18n.t("see-my-library");
  }

  useEffect(() => {
    console.log("isOpen", isOpen);
    setIsAlertDialogOpen(isOpen);
  }, [isOpen]);

  const navigateToScreen = (screenName: keyof MyStackParamList) => {
    navigation.navigate("ProfileStack", {
      screen: screenName as keyof MyStackParamList,
    }); // Error here
  };

  const handleClose = () => {
    setIsAlertDialogOpen(false);
    onClose && onClose(); // Call onClose if it is provided

    if (actionType === "wishlist") {
      navigateToScreen("Wishlist" as keyof MyStackParamList);
    } else if (actionType === "library") {
      navigateToScreen("Library" as keyof MyStackParamList);
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
