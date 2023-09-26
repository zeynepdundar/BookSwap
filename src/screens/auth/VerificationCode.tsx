import { Alert, Button, Center, Heading, Input, Text } from "native-base";
import { useState } from "react";
import firebase from "firebase/compat/app";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileCreationStack from "../../navigation/ProfileCreationStack";


export default function VerificationCode({ navigation, route }) {
  const [code, setCode] = useState<string | null>("");
  const [error, setError] = useState<any | null>(null);

  const verificationId = route.params.verificationId;


  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((res) => {
        setCode("");

        //Navigate to profile creation flow pages
        if (res.additionalUserInfo.isNewUser) {
          AsyncStorage.setItem("token", "");
        } 
      })
      .catch((error) => {
        console.log("error", error.message);
      });
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
              confirmCode();
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
