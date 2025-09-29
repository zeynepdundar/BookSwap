import { useCallback, useState } from "react";
import {
  Button,
  Heading,
  FlatList,
  Text,
  HStack,
  Spacer,
  ChevronLeftIcon,
  Divider,
  Pressable,
  Image,
  Box,
} from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";
import { useSelector } from "react-redux";
import { AlertDialogBox } from "../components/Modal/AlertDialogBox";
import { fetchProfileImageUrl } from "../api/service";
import { useFocusEffect } from "@react-navigation/native";
import { getImageSource } from "../utils/helper";

export default function UserListScreen({ navigation, route }) {
  const usersTemp = route?.params?.data?.usersOwning;
  const book = route?.params?.data;

  const avatar = require("../assets/images/avatar.png");

  const { libraryBook } = useSelector((state: any) => state.profile.profile);


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
    if (libraryBook.length === 0) {
      // Library is empty, show an alert
      setIsOpen(true);
    } else {
      // Library is not empty, proceed with navigation
      navigation.navigate("TradeProposal", { data });
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
    <Screen>
      <HStack
        alignItems="center"
        space="22%"
        justifyContent="space-between"
        w="100%"
        h="50px"
      >
        <Button
          variant="ghost"
          leftIcon={<ChevronLeftIcon size="6" color="#212325" pr="0" />}
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigation.goBack()}
        />
        <Heading>{i18n.t("ask-for-swap")}</Heading>
        <Spacer></Spacer>
      </HStack>
      <FlatList
        maxWidth="100%"
        height="100%"
        data={usersWithPhotos}
        extraData={usersWithPhotos}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <>
            <Box
              py="1"
              justifyContent="center"
              height="60"
              mx="2"
              p="2"
              key={item.id}
              overflow={"hidden"}
            >
              <HStack space={[4, 6]} justifyContent="space-between">
                <Pressable
                  onPress={() => {
                    onNavigateProfile(item);
                  }}
                  flexDirection="row"
                  padding="1"
                  alignItems="center"
                >
                  <Box
                    size={10}
                    rounded="full"
                    backgroundColor="#e0e0e0"
                    mr={3}
                    overflow="hidden"
                  >
                    <Image
                      source={getImageSource(item.photo_file_name, avatar)}
                      alt="Profile Image"
                      size={10}
                      rounded="full"
                    />
                  </Box>
                  <Text
                    color="#000000"
                    fontSize="16"
                    alignSelf="center"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                </Pressable>
                <Button
                  onPress={() => sendOfferHandler({ book: book, user: item })}
                  variant="primary"
                  p={0}
                  m="6px"
                >
                  {i18n.t("send-offer")}
                </Button>
              </HStack>
            </Box>
            <Box w="100%" alignSelf="center">
              <Divider my={2} mx="auto" w="90%" bg="#EEEEEE" />
            </Box>
          </>
        )}
        keyExtractor={(user: any) => user.id}
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
