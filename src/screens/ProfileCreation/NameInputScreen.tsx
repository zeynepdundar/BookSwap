import { useState } from "react";
import { Button, Center, Heading, VStack, Input, Spacer } from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { setProfileData } from "../../store/profile-slice";

export default function NameInputScreen({ navigation }) {
  const [name, setName] = useState<string>("");

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();


  const pressHandler = (event: any) => {
    dispatch(setProfileData({name:name}));
    navigation.navigate("Birthdate");
  };

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>
        <Center h="20" />
        <Heading w="100%" h="8" px={6}>
          {i18n.t("my-full-name")}
        </Heading>
        <Center w="100%" h="20" px={8}>
          <Input
            value={name}
            variant="underlined"
            maxLength={25}
            width={250}
            fontSize={20}
            borderTopColor="none"
            borderBottomColor="black.400"
            color="black.400"
            textAlign="center"
            autoCorrect={false}
            onChangeText={(enteredName) => {
              setName(enteredName);
            }}
          />
        </Center>
        <Spacer />
        <Center p={4}>
          <Button variant="primary" onPress={pressHandler}>
            {i18n.t("continue")}
          </Button>
        </Center>
      </VStack>
    </Screen>
  );
}
