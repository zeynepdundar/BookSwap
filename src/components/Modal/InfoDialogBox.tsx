import React, { memo } from "react";
import { Box, Button, Center, CheckCircleIcon, Modal, Text } from "native-base";

type InfoDialogConfig = {
  title: string;
  description: string;
  buttonLabel: string;
  onConfirm?: () => void;
};

interface InfoDialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
  config: InfoDialogConfig;
}

export const InfoDialogBox: React.FC<InfoDialogBoxProps> = memo(({
  isOpen,
  onClose,
  config
}) => {
  const handlePress = () => {
    onClose();
    config.onConfirm?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <Modal.Content
        w="90%"
        maxW="340px"
        borderRadius="2xl"
        overflow="hidden"
        bg="white"
        shadow={6}
      >
        {/* Accent bar */}
        <Box h="2px" bg="primary.500" />

        <Modal.Body px="6" py="6" alignItems="center">

          {/* Icon container */}
          <Center
            bg="primary.50"
            w="14"
            h="14"
            borderRadius="full"
            mb="4"
          >
            <CheckCircleIcon size="6" color="primary.500" />
          </Center>

          {/* Title */}
          <Text
            fontSize="18px"
            fontWeight="700"
            textAlign="center"
            color="gray.900"
            mb="2"
          >
            {config.title}
          </Text>

          {/* Description */}
          <Text
            fontSize="14px"
            textAlign="center"
            color="gray.500"
            lineHeight="20px"
          >
            {config.description}
          </Text>
        </Modal.Body>

        {/* Footer */}
        <Modal.Footer
          borderTopWidth={0}
          px="6"
          pb="6"
          pt="0"
          justifyContent="center"
        >
          <Button
            onPress={handlePress}
            w="100%"
            variant="primary"
          >
            <Text
              fontSize="14px"
              fontWeight="700"
              color="white"
              letterSpacing="0.5px"
            >
              {config.buttonLabel}
            </Text>
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
});
