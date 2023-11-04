import { Button, Center, Heading, Input, Text } from "native-base";
import { useState } from "react";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth-actions";
import { AppDispatch } from "../../store/store";

export default function VerificationCode({ navigation, route }) {
  const [code, setCode] = useState<string | null>("");

   const verificationId = route.params.verificationId;
  const confirmation = route.params.confirmation;

  const dispatch = useDispatch<AppDispatch>();

  async function confirmCode() {
    try {
      await confirmation.confirm(code);
      
      console.log('Confirmed Successfully!');
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const confirmCodeHandler = async (): Promise<void> => {
    //dispatch(login({verificationId, code}))
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
        {/* {error && (
          <Alert w="80%" borderRadius="10px" backgroundColor="black.700" mt={5}>
            <Text fontSize="sm" fontWeight="medium" color="#dddddd">
              {error.message}
            </Text>
          </Alert>
        )} */}
      </Center>
    </Screen>
  );
}
