import {
  ArrowBackIcon,
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  VStack,
} from "native-base";
import Screen from "../../components/Screen";
import i18n from "../../i18n";
import ImagePicker from "../../components/ImagePicker";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { setProfileData } from "../../store/profile-slice";
import { useState } from "react";

export default function PhotoInputScreen({ navigation }) {
  const [image, setImage] = useState<string>("");

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleSelectImage = (data) => {
    setImage(data)
  };

  const pressHandler = () => {
    dispatch(setProfileData({imageData:image}));
    navigation.navigate("Wishlist");
  };

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>
        <Center w="100%" h="20" justifyContent="space-between">
          <Flex direction="row" justifyContent="space-between" w="100%" h="10">
            <Button
              backgroundColor="transparent"
              variant="ghost"
              leftIcon={<ArrowBackIcon size="6" color="#212325" pr="0" />}
              _pressed={{
                bg: "transparent",
              }}
              onPress={() => navigation.goBack()}
            ></Button>
          </Flex>
        </Center>
        <Heading w="100%" h="8" px={6}>
          {i18n.t("my-photo")}
        </Heading>
        <Center
          w="100%"
          h="40%"
          px={8}
          justifyItems="center"
          alignItems="center"
        >
          <ImagePicker selectImage={handleSelectImage}/>
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
