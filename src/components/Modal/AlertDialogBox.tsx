import { AlertDialog, Button } from "native-base";
import React, { memo, useRef } from "react";

interface AlertDialogBoxProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  cancelButtonLabel: string;
  confirmButtonLabel: string;
  title: string;
  description: string;
}

export const AlertDialogBox: React.FC<AlertDialogBoxProps> = memo(
  ({ isOpen, onConfirm, onClose, cancelButtonLabel, confirmButtonLabel, title, description }) => {
    const cancelRef = useRef<any>(null);

    return (
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content maxW="400px" w="90%" alignSelf="center">
          <AlertDialog.CloseButton position="absolute" top="2" right="2" />
          <AlertDialog.Header
            borderBottomWidth={0}

            _text={{
              fontSize: "lg",          // = 20px
              fontWeight: "700",       // Bold
              color: "black.400",      // Strong title color
              textAlign: "center",
              fontFamily:"Poppins"
            }}
            pt="4"
            pb="0"
          px="6"
            alignItems="center"
          >
            {title}
          </AlertDialog.Header>
          <AlertDialog.Body
            _text={{
              fontFamily:"Poppins",
              fontSize: "md",          // = 16px
              fontWeight: "400",       // Regular
              color: "black.200",      // Softer
              textAlign: "center",
              lineHeight: "lg",   
            }}
            pt="2"
            pb="3"
            px="6"
          >
            {description}
          </AlertDialog.Body>
          <AlertDialog.Footer borderTopWidth={0} pt="2" pb="4" justifyContent="center" >
            <Button.Group space={3}>
              <Button variant="neutral" onPress={onClose} ref={cancelRef}>
                {cancelButtonLabel}
              </Button>
              <Button variant="primary" onPress={onConfirm}>
                {confirmButtonLabel}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    );
  }
);
