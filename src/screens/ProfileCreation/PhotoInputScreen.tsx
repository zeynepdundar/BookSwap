import { useState } from "react";
import {
  Actionsheet,
  AddIcon,
  ArrowBackIcon,
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Pressable,
  Spacer,
  VStack,
} from "native-base";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import Screen from "../../components/Screen";
import i18n from "../../i18n";

export default function PhotoInputScreen({ navigation }) {
  const avatarImage = require("../../assets/images/avatar.png");

  const [pickedImage, setPickedImage] = useState();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  }

  const onClose = () => {
    setIsOpen(false);
  };

  async function takeImageHandler() {
    setIsOpen(false);
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
  }

  async function uploadImageHandler() {
    setIsOpen(false);
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    let result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
    console.log(result);
  }

  const pressHandler = () => {
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
          backgroundColor="red.100"
        >
          <Pressable
            onPress={() => setIsOpen(true)}
            width="40%"
            height="120px"
            borderRadius="full"
          >
            {!pickedImage && (
              <Image
                width="100%"
                height="100%"
                borderRadius="full"
                source={avatarImage}
                alt="image base"
              />
            )}
            {pickedImage && (
              <Image
                width="100%"
                height="100%"
                borderWidth="5"
                borderRadius="full"
                borderColor="#545454"
                source={{ uri: pickedImage }}
                alt="image base"
              />
            )}
            <Badge
              rounded="100"
              w="7"
              h="7"
              bg="#F2F2F2"
              position="absolute"
              right={0}
              bottom={0}
            >
              <AddIcon   color="#545454" />
            </Badge>
          </Pressable>
        </Center>
        <Image source={{ uri: pickedImage }} alt="image base" />
        <Center>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Actionsheet.Item onPress={uploadImageHandler}>
              {i18n.t("upload-photo")}
              </Actionsheet.Item>
              <Actionsheet.Item onPress={takeImageHandler}>
              {i18n.t("take-photo")}  
              </Actionsheet.Item>
              <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
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
