import { Button, Icon, Modal, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import i18n from "../../i18n";

const BlockUserModal = ({ isOpen, onClose, blockUser = null }) => {
  const reasons = [
    i18n.t("inappropriate-behavior"),
    i18n.t("spam"),
    i18n.t("other")
  ];
  const handleBlockUser = (reason) => {
    // blockUser(reason);
    onClose(); // Close the modal after selecting a reason
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header
          borderBottomWidth={0}
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Icon
            name="remove-circle-outline"
            variant="solid"
            size="sm"
            mb="1"
            as={MaterialIcons}
          />
          {i18n.t("block-and-report").toLocaleUpperCase()}
        </Modal.Header>
        <Modal.Body>
          <VStack space={3} alignItems="flex-start">
            {reasons.map((reason) => (
              <>
                {/* <Icon
                  name="sentiment-very-dissatisfied"
                  variant="solid"
                  size="sm"
                  mb="1"
                  as={MaterialIcons}
                /> */}
                <Button
                  backgroundColor="transparent"
                  variant="ghost"
                  _text={{ color: "#000000", fontWeight: "200" }}
                  key={reason}
                  onPress={() => handleBlockUser(reason)}
                >
                  {reason}
                </Button>
              </>
            ))}
            
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            backgroundColor="transparent"
            variant="ghost"
            _text={{ color: "#000000", fontWeight: "200" }}
            flex="1"
            onPress={() => {
              onClose();
            }}
          >
            {i18n.t("cancel")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default BlockUserModal;
