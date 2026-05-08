import React, { memo, useRef } from "react";
import { Button, Center, CheckCircleIcon, Modal, Text } from "native-base";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "subtle";

interface InfoDialogBoxProps {
  isOpen: boolean;
  onClose: () => void;

  title: string;
  description: string;

  primaryAction?: {
    label: string;
    onPress?: () => void;
    variant?: ButtonVariant;
  };

  secondaryAction?: {
    label: string;
    onPress?: () => void;
    variant?: ButtonVariant;
  };
}

export const InfoDialogBox: React.FC<InfoDialogBoxProps> = memo(
  ({
    isOpen,
    onClose,
    title,
    description,
    primaryAction,
    secondaryAction,
  }) => {
    const cancelRef = useRef(null);

    console.log("whaqq")

    const handlePrimaryPress = async () => {
      await primaryAction?.onPress?.();
      onClose();
    };

    const handleSecondaryPress = () => {
      secondaryAction?.onPress?.();
      onClose();
    };

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={true}
        isKeyboardDismissable={true}
      >
        <Modal.Content
          maxW="320px"
          w="90%"
          alignSelf="center"
          px="4"
          py="3"
          rounded="lg"
        >
          <Modal.Header
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
          </Modal.Header>
          <Modal.Body
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
          </Modal.Body>
          <Modal.Footer
            borderTopWidth={0}
            justifyContent="center"
            pt="1"
            pb="3"
          >
            <Button.Group space={2} width="100%" justifyContent="center">
              {secondaryAction && (
                <Button
                  ref={cancelRef}
                  variant={secondaryAction.variant ?? "ghost"}
                  onPress={handleSecondaryPress}
                  px="5"
                  py="2.5"
                  rounded="md"
                  fontSize="15px"
                >
                  {secondaryAction.label?.toUpperCase()}
                </Button>
              )}
              {primaryAction && (
                <Button
                  variant={primaryAction.variant ?? "primary"}
                  onPress={handlePrimaryPress}
                  px="5"
                  py="2.5"
                  rounded="md"
                  fontSize="15px"
                >
                  {primaryAction.label?.toUpperCase()}
                </Button>
              )}
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  }
);
