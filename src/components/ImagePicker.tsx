import React, { useEffect, useState } from "react";
import {
  Actionsheet,
  AddIcon,
  Badge,
  Image,
  Pressable,
  Alert,
} from "native-base";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import i18n from "../i18n";

const avatarImage = require("../assets/images/avatar.png");

const ImagePicker = ({ selectedImage, initialImage }: { selectedImage: (data: any) => void; initialImage?: any }) => {
  const [pickedImage, setPickedImage] = useState(initialImage || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const onClose = () => {
    setIsOpen(false);
  };

  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert("Insufficient Permissions");
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
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

    if (!image.canceled) {
      setPickedImage(image.assets[0].uri);
      selectedImage(image.assets[0].uri);
    }
  };

  const uploadImageHandler = async () => {
    setIsOpen(false);

    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
      selectedImage(result.assets[0]);
    }
  };

  useEffect(() => {
    // Set the initial image when the initialImage prop changes
    setPickedImage(initialImage || "");
  }, [initialImage]);

  return (
    <>
      <Pressable
        onPress={() => setIsOpen(true)}
        width="40%"
        height="120px"
        borderRadius="full"
      >
{ pickedImage &&       <Image
          width="100%"
          height="100%"
          borderRadius="full"
          source={{ uri: pickedImage }}
          alt="Profile Image"
        />}
{   !pickedImage &&             <Image
          width="100%"
          height="100%"
          borderRadius="full"
          source={ avatarImage}
          alt="Profile Image"
        />}
        <Badge
          rounded="100"
          w="7"
          h="7"
          bg="#F2F2F2"
          position="absolute"
          right={0}
          bottom={0}
        >
          <AddIcon color="#545454" />
        </Badge>
      </Pressable>
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
    </>
  );
};

export default ImagePicker;
