import { useCallback, useState } from "react";
import {
  Button,
  FlatList,
  Text,
  HStack,
  Pressable,
  Image,
  Box,
} from "native-base";
import i18n from "../../i18n";
import Screen from "@/components/ui/Screen";
import { useSelector } from "react-redux";
import { AlertDialogBox } from "@/components/Modal/AlertDialogBox";
import { useFocusEffect } from "@react-navigation/native";
import { getImageSource } from "@/utils/helper";
import { fetchProfileImageUrl } from "@/services/profile/profile.service";
import { selectLibraryBooks } from "@/store/selectors";
import { IMAGE_FALLBACKS } from "@/constants/image";
import ScreenHeader from "@/components/ui/ScreenHeader";

export default function UserListScreen({ navigation, route }) {
  const usersTemp = route?.params?.data?.usersOwning;
  const book = route?.params?.data;

  const libraryBooks = useSelector(selectLibraryBooks);


  const [isOpen, setIsOpen] = useState(false);
  const [usersWithPhotos, setUsersWithPhotos] = useState(
    usersTemp.map(({ photo_file_name, ...rest }) => rest)
  );
  const fetchProfileImages = async () => {
    const updatedUsers = await Promise.all(
      usersTemp.map(async (user) => {
        const photoUrl = await fetchProfileImageUrl(user.id);
        return { ...user, photo_file_name: photoUrl };
      })
    );
    setUsersWithPhotos(updatedUsers);
  };
  useFocusEffect(
    useCallback(() => {
      fetchProfileImages();
    }, [usersTemp])
  );

  const sendOfferHandler = (data) => {
    console.log("sendOfferHandler called with data:", data);
    if (libraryBooks.length === 0) {
      // Library is empty, show an alert
      setIsOpen(true);
    } else {
      // Library is not empty, proceed with navigation
      navigation.navigate("SwapOfferProposal", { data });
    }
  };
  const onClose = () => setIsOpen(false);

  const onNavigateProfile = (selectedUser) => {
    navigation.navigate("OtherUserProfile", {
      user: selectedUser,
    });
  };

  const addBookHandler = () => {
    navigation.navigate("ProfileStack", { screen: "Library" });
    onClose();
  };

  return (
    <Screen full>
      <ScreenHeader
        title={i18n.t("ask-for-swap")}
        onBack={() => navigation.goBack()}
      />
      <FlatList
        data={usersWithPhotos}
        extraData={usersWithPhotos}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Box
            py={3}
            px={4}
            borderBottomWidth={1}
            borderColor="gray.200"
          >
            <HStack
              alignItems="center"
              justifyContent="space-between"
            >
              <Pressable
                onPress={() => onNavigateProfile(item)}
                flexDirection="row"
                alignItems="center"
                flex={1}
                mr={3}
              >
                <Box
                  size={10}
                  rounded="full"
                  bg="gray.200"
                  mr={3}
                  overflow="hidden"
                >
                  <Image
                    source={getImageSource(
                      item.photo_file_name,
                      IMAGE_FALLBACKS.USER_AVATAR
                    )}
                    alt="Profile Image"
                    size={10}
                    rounded="full"
                  />
                </Box>

                <Text
                  color="gray.900"
                  fontWeight="600"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </Pressable>


              <Button
                onPress={() =>
                  sendOfferHandler({
                    book,
                    user: item,
                  })
                }
                variant="primary"
                size="sm"
              >
                {i18n.t("send-offer")}
              </Button>

            </HStack>
          </Box>
        )}
        keyExtractor={(user) => user.id}
      />
      <AlertDialogBox
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={addBookHandler}
        title={i18n.t("library-empty")}
        description={i18n.t(
          "add-books-to-your-library-before-sending-an-offer"
        )}
        cancelButtonLabel={i18n.t("cancel")}
        confirmButtonLabel={i18n.t("see-my-library")}
      ></AlertDialogBox>
    </Screen>
  );
}
