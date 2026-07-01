import { useEffect, useState } from "react";
import {
  Badge,
  Image,
  Pressable,
  Icon,
} from "native-base";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

import * as FileSystem from "expo-file-system/legacy";
import { useAppToast } from "@/hooks/useAppToast";
import { IMAGE_FALLBACKS } from "@/constants/image";
import { ActionSheet } from "./ActionSheet";


const MAX_IMAGE_SIZE_MB = 10;

const ImagePicker = ({
  selectedImage,
  initialImage,
}: {
  selectedImage: (data: string) => void;
  initialImage?: string;
}) => {
  const [pickedImage, setPickedImage] = useState(initialImage || "");
  const [isOpen, setIsOpen] = useState(false);

  const toast = useAppToast();

  const [, requestCameraPermission] = useCameraPermissions();

  const [, requestLibraryPermission] =
    useMediaLibraryPermissions();


  const onClose = () => {
    setIsOpen(false);
  };


  const getImageSize = async (imageUri: string) => {
    try {
      const imageInfo = await FileSystem.getInfoAsync(imageUri);

      return imageInfo.size ?? 0;
    } catch (error) {
      console.error("Error getting image size:", error);
      return 0;
    }
  };


  const checkImageSizeAndSet = async (newImageUri: string) => {
    const fileSizeInBytes = await getImageSize(newImageUri);

    const fileSizeInMB =
      fileSizeInBytes / (1024 * 1024);


    if (fileSizeInMB <= MAX_IMAGE_SIZE_MB) {
      setPickedImage(newImageUri);
      selectedImage(newImageUri);
    } else {
      toast.error(
        `The selected image is too large. Maximum allowed size is ${MAX_IMAGE_SIZE_MB} MB.`
      );
    }
  };


  const takeImageHandler = async () => {
    setIsOpen(false);

    const permission = await requestCameraPermission();

    if (!permission.granted) {
      return;
    }


    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });


    if (!image.canceled) {
      await checkImageSizeAndSet(
        image.assets[0].uri
      );
    }
  };


  const uploadImageHandler = async () => {
    setIsOpen(false);

    const permission = await requestLibraryPermission();

    if (!permission.granted) {
      return;
    }


    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });


    if (!result.canceled) {
      await checkImageSizeAndSet(
        result.assets[0].uri
      );
    }
  };


  useEffect(() => {
    if (initialImage) {
      setPickedImage(initialImage);
    }
  }, [initialImage]);


  const imageActions = [
    {
      type: "upload",
      label: "upload-photo",
      onPress: uploadImageHandler,
    },
    {
      type: "camera",
      label: "take-photo",
      onPress: takeImageHandler,
    },
    {
      type: "cancel",
      label: "cancel",
      onPress: onClose,
    },
  ];


  return (
    <>
      <Pressable
        onPress={() => setIsOpen(true)}
        borderRadius="full"
      >
        <Image
          source={
            pickedImage
              ? { uri: pickedImage }
              : IMAGE_FALLBACKS.USER_AVATAR
          }
          alt="Profile Image"
          rounded="full"
          size={120}
        />

        <Badge
          rounded="full"
          w="7"
          h="7"
          bg="gray.100"
          position="absolute"
          right={0}
          bottom={0}
          alignItems="center"
          justifyContent="center"
        >
          <Icon
            as={MaterialIcons}
            name="photo-camera"
            size="sm"
            color="gray.700"
          />
        </Badge>
      </Pressable>


      <ActionSheet
        isOpen={isOpen}
        onClose={onClose}
        actions={imageActions}
      />
    </>
  );
};


export default ImagePicker;