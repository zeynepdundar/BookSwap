import {
  Heading,
  ChevronLeftIcon,
  Button,
  Spacer,
  HStack,
  VStack,
  TextArea,
  Text,
  Box,
  Center,
} from "native-base";

import i18n from "../../i18n";
import Screen from "../../components/Screen";

import { useEffect, useState } from "react";
import { submitFeedback } from "../../api/service";
import { useSelector } from "react-redux";
import { RootState } from "../../store/types";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { ErrorAlert } from "../BarcodeScannerScreen";

export default function FeedbackScreen({ navigation, route }) {
  const [feedbackText, setFeedbackText] = useState("");
  const [error, setError] = useState(null);
  const userId = useSelector((state: RootState) => state.profile.profile.id);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [focused, setFocused] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Enable button only if there's feedback text
    setButtonDisabled(!feedbackText);
  }, [feedbackText]);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleSubmitFeedback = async () => {
    try {
      const feedback = await submitFeedback(userId, feedbackText);
      if (feedback.ok) {
        setSuccessMessage("Feedback submitted successfully!");

        setTimeout(() => {
          setFeedbackText("")
          setSuccessMessage("");
          navigation.goBack();
        }, 1500);
      } else {
        setError("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      setError("Error submitting feedback. Please try again later.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen>
        <HStack
          alignItems="center"
          space="24%"
          justifyContent="space-between"
          w="100%"
          h="40px"       
        >
          <Button
            variant="ghost"
            leftIcon={<ChevronLeftIcon size="6" color="#212325" pr="0" />}
            _pressed={{
              bg: "transparent",
            }}
            onPress={() => navigation.goBack()}
          />
          <Heading>{i18n.t("feedback")}</Heading>
          <Spacer />
        </HStack>
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
              borderColor: "primary.50", // Change border color on hover
              backgroundColor: "gray.50", // Optional: change background on hover
            }}
            _focus={{
              borderColor: "primary.50", // Change border color when focused
              backgroundColor: "gray.50", // Optional: change background when focused
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            borderColor={focused ? "primary.100" : "gray.300"}
          />
        </VStack>

        <VStack space={3} mx="4" my="10">
          <Button
            variant={isButtonDisabled ? "disabled" : "primary"}
            onPress={handleSubmitFeedback}
            isDisabled={isButtonDisabled}
          >
            {i18n.t("submit")}
          </Button>
          <Center mt="300">
            {successMessage && <ErrorAlert message={successMessage} />}
          </Center>
        </VStack>
      </Screen>
    </TouchableWithoutFeedback>
  );
}
