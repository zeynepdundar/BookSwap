import React, { memo, useRef } from "react";
import { AlertDialog, Button, Center, CheckCircleIcon, Text } from "native-base";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "subtle";

interface InfoDialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description: string;
  confirmButtonLabel: string;
  buttonVariant?: ButtonVariant;
}

export const InfoDialogBox: React.FC<InfoDialogBoxProps> = memo(
  ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmButtonLabel,
    buttonVariant = "primary",
  }) => {
    const cancelRef = useRef(null);

    const handleConfirm = () => {
      if (onConfirm) onConfirm();
      onClose();
    };

    return (
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isKeyboardDismissable={false}
      >
        <AlertDialog.Content
          maxW="320px"   
          w="90%"
          alignSelf="center"
          px="4"
          py="3"
          rounded="lg"
        >
          <AlertDialog.Header
            borderBottomWidth={0}
            alignItems="center"
            mt="3"
            mb="1"
            px="0"
          >
            <Center>
              <CheckCircleIcon size="8" color="primary.50" />
            </Center>

            <Text
              fontSize="18px"   
              fontWeight="600"
              color="black.400"
              textAlign="center"
              mt="1"
              lineHeight="24px"
            >
              {title}
            </Text>
          </AlertDialog.Header>
          <AlertDialog.Body
            _text={{
              fontSize: "15px",
              fontWeight: "400",
              color: "black.200",
              textAlign: "center",
              lineHeight: "20px",
            }}
            pt="1"
            pb="3"
            px="2"
          >
            {description}
          </AlertDialog.Body>
          <AlertDialog.Footer
            borderTopWidth={0}
            justifyContent="center"
            pt="1"
            pb="3"
          >
            <Button.Group space={2} width="100%" justifyContent="center">
              <Button
                variant={buttonVariant}
                onPress={handleConfirm}
                px="5"        
                py="2.5"
                rounded="md"
                fontSize="15px"
              >
                {confirmButtonLabel?.toUpperCase()}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    );
  }
);
