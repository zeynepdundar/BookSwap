import {
  ChevronLeftIcon,
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  VStack,
  Box,
} from "native-base";
import Screen from "../../components/Screen";
import i18n from "../../i18n";
import ImagePicker from "../../components/ImagePicker";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { setProfileData } from "../../store/profile-slice";
import { useState } from "react";

export default function PhotoInputScreen({ navigation }) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const profileData = useSelector((state: any) => state.profile.profile);
  const initialImage = profileData.imageData || ""; // Assuming imageData contains the image URI
  const [image, setImage] = useState<any>(initialImage);

  const handleImageUpload = (imageUri) => {
    setImage(imageUri);
  };

  const pressHandler = () => {
    dispatch(setProfileData({ imageData: image }));
    navigation.navigate("Wishlist");
  };

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>
        <Box w="100%" alignItems="flex" h="38px">
          <Button
            variant="ghost"
            leftIcon={<ChevronLeftIcon size="6" color="#212325" pr="0" />}
            _pressed={{
              bg: "transparent",
            }}
            onPress={() => navigation.goBack()}
          />
        </Box>
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
