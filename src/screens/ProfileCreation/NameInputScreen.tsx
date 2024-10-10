import { useState } from "react";
import {
  Button,
  Center,
  Heading,
  VStack,
  Input,
  Spacer,
} from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { setProfileData } from "../../store/profile-slice";

export default function NameInputScreen({ navigation }) {
  const profileData = useSelector((state: any) => state.profile.profile);
  const initialName = profileData.name || "";
  const [name, setName] = useState<string>(initialName);
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleNameChange = (newName: string) => {
    setName(newName);
    setButtonDisabled(newName.length <= 2);
  };

  const pressHandler = (event: any) => {
    dispatch(setProfileData({ name: name }));
    navigation.navigate("Birthdate");
  };

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>
        <Center h="118px" />
        <Heading w="100%" h="8" px={10}>
          {i18n.t("my-name")}
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
            onChangeText={handleNameChange}
          />
        </Center>
        <Spacer />
        <Center p={4}>
          <Button
            variant={isButtonDisabled ? "disabled" : "primary"}
            isDisabled={isButtonDisabled}
            onPress={pressHandler}
          >
            {i18n.t("continue")}
          </Button>
        </Center>
      </VStack>
    </Screen>
  );
}
