import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  Button,
  Center,
  Heading,
  Spacer,
  VStack,
} from "native-base";
import i18n from "@/i18n";
import { setProfileData } from "@/store/profile/slice";
import Screen from "@/components/Screen";
import ImagePicker from "@/components/ImagePicker";
import StepHeader from "@/components/StepHeader";

export default function PhotoInputScreen({ navigation }) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const profileData = useSelector((state: any) => state.profile.profile);
  const initialImage = profileData.imageData || "";
  const [image, setImage] = useState<any>(initialImage);

  const handleImageUpload = (imageUri) => {
    setImage(imageUri);
  };

  const pressHandler = () => {
    dispatch(setProfileData({ imageData: image }));
    navigation.navigate("WishlistInput");
  };

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>
        <StepHeader
          onBack={() => navigation.goBack()}
        />
        <Spacer></Spacer>
        <Heading w="100%" h="8" px={10}>
          {i18n.t("my-photo")}
        </Heading>
        <Center
          w="100%"
          h="40%"
          px={8}
          justifyItems="center"
          alignItems="center"
        >
          <ImagePicker selectedImage={handleImageUpload} initialImage={image} />
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
