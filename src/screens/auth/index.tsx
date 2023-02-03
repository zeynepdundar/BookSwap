import { Box, Button, Center, Flex, Image, Text } from "native-base";
import React, { useRef, useState } from "react";
import Screen from "../../components/Screen";
import PhoneInput from "react-native-phone-input";
import i18n from "../../i18n";
import firebase from "firebase/compat/app";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../../firebase";

export default function Auth({ navigation }) {
  const surfLogo = require("../../assets/images/surf.png");
  const swapBook = require("../../assets/images/swap-book.png");

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState("");

  const [code, setCode] = useState<string>("");
  const [verificationId, setVerificationId] = useState<string>(null);

  const recaptchaVerifier = useRef(null);
  const sendCode = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then((res) => {
        setVerificationId(res);
        console.log("res", res);
        navigation.navigate("VerificationCode", {
          verificationId: res,
        });
      });
    // The SMS code has expired. Please re-send the verification code to try again. (auth/code-expired).
    setPhoneNumber("");
  };

  return (
    <Screen>
      <Flex direction="column" m="3" mt="20">
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification={true}
        ></FirebaseRecaptchaVerifierModal>
        <Center mb={30}>
          <Image source={surfLogo} alt="Book Swap Logo" size="7" mb={2} />
          <Image source={swapBook} alt="Book Swap" width={120} />
        </Center>
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
            <PhoneInput
              onChangePhoneNumber={setPhoneNumber}
              initialCountry={"tr"}
              ref={(ref) => {
                ref ? setCountryCode(ref.getCountryCode()) : 1;
              }}
              flagStyle={{ width: 32, height: 24, borderWidth: 0 }}
              textStyle={{
                fontSize: 16,
                fontFamily: "poppins-regular",
                color: "#808085",
              }}
              offset={20}
              textProps={{
                maxLength: 20,
              }}
              autoFormat={true}
            />
          </Box>
        </Center>
        <Center>
          <Button
            variant="primary"
            mt={60}
            onPress={() => {
              sendCode();
            }}
          >
            {i18n.t("send")}
          </Button>
        </Center>
      </Flex>
    </Screen>
  );
}
