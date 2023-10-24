import { AlertDialog, Button } from "native-base";

export const AlertDialogBox = ({ isOpen, onConfirm, onClose, cancelButtonLabel, confirmButtonLabel, title, description }) => {
  return (
    <AlertDialog leastDestructiveRef={null} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header
          _text={{
            fontWeight: "medium",
            letterSpacing: "sm",
            textAlign: "center",
          }}
        >
          {title}
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
            <Button variant="secondary" onPress={onClose} ref={null}>
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
};
