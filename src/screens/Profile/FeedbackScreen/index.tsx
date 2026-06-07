import { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useSelector } from "react-redux";
import {
  Button,
  VStack,
  TextArea,
  Text,
} from "native-base";

import i18n from "@/i18n";
import { RootState } from "@/store/types";
import Screen from "@/components/shared/Screen";
import { InfoDialogBox } from "@/components/Modal/InfoDialogBox";
import { submitFeedback } from "@/services/feedback/feedback.service";
import ScreenHeader from "@/components/shared/ScreenHeader";


export default function FeedbackScreen({ navigation }) {
  const [feedbackText, setFeedbackText] = useState("");
  const userId = useSelector((state: RootState) => state.profile.profile.id);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);

  const isDisabled = !feedbackText?.trim()


  const closeInfoDialog = () => {
    setIsInfoDialogOpen(false);

    setFeedbackText("");
  };

  const handleSubmitFeedback = async () => {
    Keyboard.dismiss();
    try {
      const feedback = await submitFeedback(userId, feedbackText);
      setIsInfoDialogOpen(true);
    }
    //TODO: Show error message toast to user and and loading state while submitting
    catch (error) {
      console.error("Feedback submission error:", error);
    }
  };

  //Auto-close info dialog after 3 seconds
  //useEffect(() => {
  //  if (!isInfoDialogOpen) return;
  //  const timer = setTimeout(() => {
  //    closeInfoDialog();
  //  }, 3000);
  /// return () => clearTimeout(timer);
  //}, [isInfoDialogOpen]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen>
        <ScreenHeader
          title={i18n.t("feedback")}
          onBack={() => navigation.goBack()}
        />
        <VStack space={3} mx="4">
          <Text fontWeight="200" color="gray.400">
            {i18n.t("feedback-description")}
          </Text>
          <TextArea
            value={feedbackText}
            onChangeText={(text) => setFeedbackText(text)}
            numberOfLines={8}
            h="40"
            autoCompleteType={false}
            w="100%"
            _hover={{
              borderColor: "primary.50",
              backgroundColor: "gray.50",
            }}
            _focus={{
              borderColor: "primary.50",
              backgroundColor: "gray.50",
            }}

          />
        </VStack>

        <VStack space={3} mx="4" my="10">
          <Button
            variant="primary"
            isDisabled={isDisabled}
            onPress={handleSubmitFeedback}

          >
            {i18n.t("submit")}
          </Button>
        </VStack>

        <InfoDialogBox
          isOpen={isInfoDialogOpen}
          onClose={closeInfoDialog}
          title={i18n.t("thank-you")}
          description={i18n.t("feedback-appreciation-and-update")}
          primaryAction={{
            label: i18n.t("close"),
            variant: "outline",
            onPress: closeInfoDialog,
          }}
        />
      </Screen>
    </TouchableWithoutFeedback>
  );
}
