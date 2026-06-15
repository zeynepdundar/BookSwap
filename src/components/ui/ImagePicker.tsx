import  { useEffect, useState } from "react";
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
import * as FileSystem from "expo-file-system/legacy";
import i18n from "@/i18n";
import { ErrorAlert } from "./ErrorAlert";
import { IMAGE_FALLBACKS } from "@/constants/image";


const MAX_IMAGE_SIZE_MB = 10; // Maximum allowed size in MB

const ImagePicker = ({
  selectedImage,
  initialImage,
}: {
  selectedImage: (data: any) => void;
  initialImage?: any;
}) => {
  const [pickedImage, setPickedImage] = useState(initialImage || "");
  const [error, setError] = useState(null);
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

  const getImageSize = async (imageUri: string) => {
    try {
      const imageInfo = await FileSystem.getInfoAsync(imageUri);
      return imageInfo.size; // Size in bytes
    } catch (error) {
      console.error("Error getting image size:", error);
      return 0;
    }
  };

  const checkImageSizeAndSet = async (newImageUri: string) => {
    const fileSizeInBytes = await getImageSize(newImageUri);
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    if (fileSizeInMB <= MAX_IMAGE_SIZE_MB) {
      setPickedImage(newImageUri);
      selectedImage( newImageUri );
    } else {
      setError(
        `The selected image is too large. Maximum allowed size is ${MAX_IMAGE_SIZE_MB} MB.`
      );
      setTimeout(() => {
        setError("")
      }, 1500);
    }

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
      const newImageUri = image.assets[0].uri;
      await checkImageSizeAndSet(newImageUri);
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
      const newImageUri = result.assets[0].uri;
      await checkImageSizeAndSet(newImageUri);
    }
  };

  useEffect(() => {
    if (initialImage) {
      setPickedImage(initialImage);
    }
  }, [initialImage]);

  return (
    <>
      <Pressable
        onPress={() => setIsOpen(true)}
        width="40%"
        height="120px"
        borderRadius="full"
      >
        <Image
          source={pickedImage ? { uri: pickedImage } : IMAGE_FALLBACKS.USER_AVATAR}
          alt="Profile Image"
          rounded="full"
          size={120}
        />
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
      <ErrorAlert message={error} />
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
