import { Button, Center, Flex, Image, Text } from "native-base";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  StatusBar,
  ToastAndroid,
  NativeModules,
} from "react-native";
import Screen from "../../components/Screen";
// import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get("window");

export default function Auth() {
  const surfLogo = require("../../assets/images/surf.png");
  const swapBook = require("../../assets/images/swap-book.png");

  const [number, setNumber] = useState("");
  const [confirm, setConfirm] = useState<Boolean | null>(null);

  console.log(width, height);

  const signin = async () => {
    const confirmation = true;
    if (confirmation) {
      setConfirm(confirmation);
    }
  };

  return (
    <Screen>
      <Flex direction="column" mb="2.5" mt="20">
        <Center mb={30}>
          <Image source={surfLogo} alt="Book Swap Logo" size="7" mb={2} />
          <Image source={swapBook} alt="Book Swap" width={120} />
        </Center>
        <Center>
          <Text color="black.300">
            Enter your phone number to verify your account
          </Text>
        </Center>

        <Center>
          <Button variant="primary" m={5}>
            Send
          </Button>
        </Center>
      </Flex>
    </Screen>
    // <View
    //   style={{
    //     height: height,
    //     width: "100%",
    //     flex: 1,
    //     justifyContent: "center",
    //   }}
    // >
    //   <View
    //     style={{
    //       justifyContent: "space-between",
    //       flexDirection: "row",
    //       height: 40,
    //       marginTop: 7,
    //       alignItems: "center",
    //       marginHorizontal: 5,
    //     }}
    //   ></View>
    //   <Text
    //     style={{
    //       fontSize: 22,
    //       fontWeight: "bold",
    //       color: "white",
    //       marginLeft: 20,
    //       marginTop: 25,
    //       marginBottom: 15,
    //     }}
    //   >
    //     Sign in to continue
    //   </Text>
    //   <View
    //     style={{
    //       justifyContent: "center",
    //       alignItems: "center",
    //       marginHorizontal: 20,
    //     }}
    //   >
    //     <TextInput
    //       style={{
    //         marginBottom: 20,
    //         color: "#fff",
    //         width: "100%",
    //         borderBottomColor: "#f8f8f8",
    //         borderBottomWidth: 1,
    //       }}
    //       placeholder="Enter 10 digit Mobile Number"
    //       placeholderTextColor="#fff"
    //       underlineColorAndroid={"transparent"}
    //       keyboardType="number-pad"
    //       onChangeText={(value) => setNumber(value)}
    //       value={number}
    //       maxLength={10}
    //     />
    //     <TouchableOpacity
    //       onPress={signin}
    //       // disabled={ number.length == 10 ? false : true}
    //       style={[
    //         styles.listView,
    //         { backgroundColor: number.length == 10 ? "#000" : "grey" },
    //       ]}
    //     >
    //       <Text
    //         style={{
    //           color: "seashell",
    //           fontSize: 15,
    //           fontWeight: "bold",
    //         }}
    //       >
    //         Continue
    //       </Text>
    //     </TouchableOpacity>
    //     <View
    //       style={{
    //         justifyContent: "space-between",
    //         flexDirection: "row",
    //         height: 25,
    //         width: "100%",
    //       }}
    //     ></View>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.9,
  },
  listView: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "primary.100",
    borderRadius: 5,
  },
  fbButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4267B2",
    borderRadius: 5,
    color: "black.400",
    padding: 11,
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  googleButton: {
    width: "100%",
    height: 50,
    backgroundColor: "black",
    borderRadius: 5,
    color: "white",
    padding: 11,
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  hairline: {
    backgroundColor: "#A2A2A2",
    height: 0.5,
    width: "40%",
    marginTop: 19,
  },

  lineLowText1: {
    fontFamily: "AvenirNext-Bold",
    fontSize: 15,
    color: "#A2A2A2",
    width: "20%",
    textAlign: "center",
    marginTop: 7,
  },
});
