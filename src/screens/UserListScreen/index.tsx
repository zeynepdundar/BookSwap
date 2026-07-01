import { useCallback, useState } from "react";
import {
  Button,
  FlatList,
  Text,
  Pressable,
  Image,
  Divider,
  Flex,
  VStack,
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
  const usersTemp = route?.params?.data?.usersOwning ?? [];
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

        return {
          ...user,
          photo_file_name: photoUrl,
        };
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
    if (libraryBooks.length === 0) {
      setIsOpen(true);
      return;
    }

    navigation.navigate("SwapOfferProposal", {
      data,
    });
  };

  const onClose = () => setIsOpen(false);

  const onNavigateProfile = (selectedUser) => {
    navigation.navigate("OtherUserProfile", {
      user: selectedUser,
    });
  };

  const addBookHandler = () => {
    navigation.navigate("ProfileStack", {
      screen: "Library",
    });

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
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 24,
          paddingHorizontal: 24,
        }}
        ItemSeparatorComponent={() => (
          <Divider ml={16} bg="gray.200" />
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onNavigateProfile(item)}
            _pressed={{ bg: "gray.50" }}
          >
            <Flex
              direction="row"
              alignItems="center"
              py={3.5}
            >
              {/* Avatar */}
              <Image
                source={getImageSource(
                  item.photo_file_name,
                  IMAGE_FALLBACKS.USER_AVATAR
                )}
                alt="Profile Image"
                size={12}
                rounded="full"
              />

              {/* Content */}
              <VStack flex={1} ml={3}>
                <Text
                  fontSize="md"
                  fontFamily="poppins-semi-bold"
                  color="gray.900"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </VStack>

              {/* Action */}
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
            </Flex>
          </Pressable>
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
      />
    </Screen>
  );
}