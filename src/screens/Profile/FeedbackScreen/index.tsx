import { useMemo, useState } from "react";
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
import Screen from "@/components/ui/Screen";
import { InfoDialogBox } from "@/components/Modal/InfoDialogBox";
import { submitFeedback } from "@/services/feedback/feedback.service";
import ScreenHeader from "@/components/ui/ScreenHeader";


export default function FeedbackScreen({ navigation }) {
  const [feedbackText, setFeedbackText] = useState("");
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = useSelector((state: RootState) => state.profile.profile.id);

  const isDisabled = !feedbackText.trim() || isSubmitting;

  const closeInfoDialog = () => {
    setIsInfoDialogOpen(false);
    setFeedbackText("");
  };

  const handleSubmitFeedback = async () => {
    Keyboard.dismiss();
    setIsSubmitting(true);

    try {
      await submitFeedback(userId, feedbackText);
      setIsInfoDialogOpen(true);
    } catch (error) {
      console.error("Feedback submission error:", error);
      // TODO: show toast error
    } finally {
      setIsSubmitting(false);
    }
  };

  const config = useMemo(() => {
    return {
      title: i18n.t("thank-you"),
      description: i18n.t("feedback-appreciation-and-update"),
      buttonLabel: i18n.t("close"),
      onConfirm: closeInfoDialog,
    };
  }, []);

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
            onChangeText={setFeedbackText}
            numberOfLines={8}
            h="40"
            w="100%"
            _focus={{
              borderColor: "primary.500",
              backgroundColor: "gray.50",
            }}
          />
        </VStack>

        <VStack space={3} mx="4" my="10">
          <Button
            variant="primary"
            isDisabled={isDisabled}
            isLoading={isSubmitting}
            onPress={handleSubmitFeedback}
          >
            {i18n.t("submit")}
          </Button>
        </VStack>

        <InfoDialogBox
          isOpen={isInfoDialogOpen}
          onClose={closeInfoDialog}
          config={config}
        />
      </Screen>
    </TouchableWithoutFeedback>
  );

}
