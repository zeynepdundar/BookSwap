import { Alert, Button, Center, Heading, Input, Text } from "native-base";
import { useEffect, useState } from "react";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import { useDispatch } from "react-redux";
import { userAuth } from "../../store/auth-actions";
import { AppDispatch } from "../../store/store";
import auth from "@react-native-firebase/auth";

export default function VerificationCode({ route }) {
  const [code, setCode] = useState<string | null>("");
  const [error, setError] = useState<any | null>(null);

  const confirmation = route.params.confirmation;

  const dispatch = useDispatch<AppDispatch>();

  async function confirmCode() {
    try {
      await confirmation.confirm(code);
      dispatch(userAuth(user));
      console.log("Confirmed Successfully!");
    } catch (error) {
      console.log("Error: ", error.code);
      switch (error.code) {
        case "auth/code-expired":
          setError({
            key: "auth-failed",
            message:
              "The SMS code has expired. Please re-send the verification code",
          });
          break;
        case "auth/invalid-verification-code":
          setError({
            key: "auth-failed",
            message: "Invalid verification code",
          });
          break;
        default:
          setError({
            key: "auth-failed",
            message:
              "Sorry, we can’t fulfill this request at this time. Please try again later or use a different phone number. ",
          });
          break;
      }
    }
  }

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const confirmCodeHandler = async (): Promise<void> => {
    await confirmCode();
  };

  return (
    <Screen>
      <Heading mt="100px">{i18n.t("verification-code")}</Heading>
      <Center>
        <Text color="black.300" mb="12">
          {i18n.t("type-verification-code")}
        </Text>
      </Center>
      <Center>
        <Input
          variant="underlined"
          maxLength={6}
          width={200}
          fontSize={20}
          borderTopColor="none"
          borderBottomColor="black.300"
          color="black.300"
          textAlign="center"
          keyboardType="numeric"
          onChangeText={setCode}
        />
        <Center>
          <Text color="black.300" mt="5">
            {i18n.t("resend-code-text-1")}
            <Text color="primary.50">{i18n.t("resend-code-text-2")}</Text>
          </Text>
        </Center>
        <Center mt={10}>
          <Button
            variant="primary"
            onPress={() => {
              confirmCodeHandler();
            }}
          >
            {i18n.t("confirm")}
          </Button>
        </Center>
        {error && (
          <Alert w="80%" borderRadius="10px" backgroundColor="black.700" mt={5}>
            <Text fontSize="sm" fontWeight="medium" color="#dddddd">
              {error.message}
            </Text>
          </Alert>
        )}
      </Center>
    </Screen>
  );
}
