import { Box, Button, Center, Flex, Image, Text } from "native-base";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import Screen from "../../components/Screen";
import PhoneInput from "react-native-phone-input";

const { width, height } = Dimensions.get("window");

export default function Auth() {
  const surfLogo = require("../../assets/images/surf.png");
  const swapBook = require("../../assets/images/swap-book.png");

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState("");
  const [confirm, setConfirm] = useState<Boolean | null>(null);

  console.log(width, height);

  const sendCode = (code: string) => {
    console.log(code);
  };

  const signin = async () => {
    const confirmation = true;
    if (confirmation) {
      setConfirm(confirmation);
    }
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
        <Center mb={30}>
          <Image source={surfLogo} alt="Book Swap Logo" size="7" mb={2} />
          <Image source={swapBook} alt="Book Swap" width={120} />
        </Center>
        <Center>
          <Text color="black.300" mb="12">
            Enter your phone number to verify your account
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
              autoFormat={true}
            />
          </Box>
        </Center>
        <Center>
          <Button
            variant="primary"
            mt={60}
            onPress={() => {
              sendCode(phoneNumber);
            }}
          >
            Send
          </Button>
        </Center>
      </Flex>
    </Screen>
  );
}

