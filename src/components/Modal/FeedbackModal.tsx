import { Button, Icon, Modal, Text, TextArea, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import i18n from "../../i18n";
import { useEffect, useState } from "react";

export const FeedbackModal = ({ isOpen, onClose }) => {
  const [feedbackText, setFeedbackText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFeedbackText(""); 
    }
  }, [isOpen]);
  const handleSubmitFeedback = () => {
    setFeedbackText("");
    onClose(); 
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" avoidKeyboard>
      <Modal.Content height="50%">
        <Modal.CloseButton />
        <Modal.Header
          borderBottomWidth={0}
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          mb={0}
        >
          <Icon
            name="rate-review"
            variant="solid"
            size="sm"
            mb="1"
            as={MaterialIcons}
          />
          {i18n.t("feedback").toLocaleUpperCase()}
        </Modal.Header>
        <Modal.Body  mt="-5">
          <VStack space={3} mx="4">
            <Text fontWeight="200" color="gray.400">
              {i18n.t("feedback-description")}
            </Text>
            <TextArea
              value={feedbackText}
              onChangeText={text => setFeedbackText(text)}
              numberOfLines={8}
              h="40"
              autoCompleteType={false}
              w="100%"
            />
          </VStack>
        </Modal.Body>
        <Modal.Footer borderTopWidth={0} justifyContent="center" >
          <Button.Group space={2}>
            <Button variant="primary" onPress={handleSubmitFeedback}>
              {i18n.t("submit")}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
