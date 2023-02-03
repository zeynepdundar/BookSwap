import { Box, Button, Center, Flex, Input, Text } from "native-base";
import React, { useState } from "react";
import Screen from "../../components/Screen";
import i18n from "../../i18n";
import firebase from "firebase/compat/app";

export default function VerificationCode({ navigation, route }) {
  const [code, setCode] = useState<string | null>("");
  const [error, setError] = useState<Object | null>(null);
  const verificationId = route.params.verificationId;

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode("");
        console.log("worked");
        navigation.navigate("Welcome");
      })
      .catch((error) => {
        console.log("error", error.message);
        switch (error.code) {
          case "auth/invalid-phone-number":
            setError({
              key: "auth-failed",
              message: "Invalid phone number format.",
            });
            break;
          case "auth/missing-phone-number":
            setError({
              key: "auth-failed",
              message: "Please enter a valid phone number.",
            });
            break;
          case "auth/too-many-requests":
            setError({
              key: "auth-failed",
              message: "Too many requests, please try again after 5 minutes.",
            });
            break;
          default:
            setError({
              key: "auth-failed",
              message: "An unknown error occured.",
            });
            break;
        }
      });
  };

  return (
    //   style={{
    //     height: height,
    //     width: "100%",
    //     flex: 1,
    //     justifyContent: "center",
    //   }}
    <Screen>
      <Flex direction="column" m="3" mt="20">
        <Center>
          <Text color="black.300" mb="12">
            {i18n.t("enter-your-phone-number")}
          </Text>
        </Center>
        <Center>
          <Box
            width={{
              base: 300,
              lg: 250,
            }}
            maxW="80"
            rounded="4px"
            overflow="hidden"
            borderColor="black.500"
            borderWidth="1"
            px="17px"
            py="12px"
          >
            <Input placeholder="Code" onChangeText={setCode} />
          </Box>
          {error && <Text>An Error: </Text>}
        </Center>
        <Center>
          <Button
            variant="primary"
            mt={60}
            onPress={() => {
              confirmCode();
            }}
          >
            Verify
          </Button>
        </Center>
      </Flex>
    </Screen>
  );
}
