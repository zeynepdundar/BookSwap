import {
  AlertDialog,
  Button,
  Center,
  CheckCircleIcon,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";

interface InfoDialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttonVariant?: string;
  confirmButtonLabel: string;
  navigateToScreen?: () => void; // Function to navigate
}

export const InfoDialogBox: React.FC<InfoDialogBoxProps> = ({
  isOpen,
  onClose,
  title,
  description,
  buttonVariant = "primary",
  confirmButtonLabel,
  navigateToScreen,
}) => {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(isOpen);
  const cancelRef = React.useRef(null);

  useEffect(() => {
    setIsAlertDialogOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsAlertDialogOpen(false);

    if (onClose) {
      // Call the provided onClose function
      onClose();
    }
  };
  const handleConfirm = () => {
    if (navigateToScreen) {
      navigateToScreen();
    }
    setIsAlertDialogOpen(false);
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
          borderBottomWidth={0}
          _text={{
            fontWeight: "medium",
            letterSpacing: "sm",
            textAlign: "center",
          }}
          mt="5"
        >
          <Center>
            <CheckCircleIcon size="lg" color="primary.50" />
          </Center>
          <Text fontWeight="600" fontSize="md" textAlign="center" mt="2">
            {title} {/* Display the title here */}
          </Text>
        </AlertDialog.Header>
        <AlertDialog.Body
          _text={{
            fontWeight: "medium",
            color: "black.200",
            letterSpacing: "sm",
            textAlign: "center",
          }}
          pt="0"
        >
          {description}
        </AlertDialog.Body>
        <AlertDialog.Footer borderTopWidth={0}>
          <Button.Group space={2}>
            <Button variant={buttonVariant} onPress={handleConfirm}>
              {confirmButtonLabel?.toUpperCase()}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
