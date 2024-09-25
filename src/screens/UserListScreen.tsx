import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Heading,
  FlatList,
  Text,
  VStack,
  HStack,
  Spacer,
  Center,
  ArrowBackIcon,
  Divider,
  Avatar,
  Pressable,
  Image,
} from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AlertDialogBox } from "../components/Modal/AlertDialogBox";
import { fetchProfileImageUrl } from "../api/service";
import { useFocusEffect } from "@react-navigation/native";

export default function UserListScreen({ navigation, route }) {
  const usersTemp = route?.params?.data?.usersOwning;
  const book = route?.params?.data;

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { libraryBook } = useSelector((state: any) => state.profile.profile);

  const [libraryItems, setLibraryItem] = useState<any>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [usersWithPhotos, setUsersWithPhotos] = useState(
    usersTemp.map(({ photo_file_name, ...rest }) => rest) // Create a new object without photo_file_name
  );
  // Function to fetch profile image URLs and update the state
  const fetchProfileImages = async () => {
    const updatedUsers = await Promise.all(
      usersTemp.map(async (user) => {
        const photoUrl = await fetchProfileImageUrl(user.id); // Fetch the profile image URL
        return { ...user, photo_file_name: photoUrl || avatarImage }; // Set a default avatar if fetching fails
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
  const avatarImage = require("../assets/images/avatar.png");

  return (
    <Screen>
      <VStack space={1} alignItems="center">
        <HStack
          alignItems="center"
          justifyContent="space-between"
          w="100%"
          h={16}
        >
          <Button
            variant="ghost"
            leftIcon={<ArrowBackIcon size="6" color="#212325" pr="0" />}
            _pressed={{
              bg: "transparent",
            }}
            onPress={() => navigation.goBack()}
          ></Button>
          <Center flex={8}>
            <Heading>{i18n.t("ask-for-swap")}</Heading>
          </Center>
          <Spacer></Spacer>
        </HStack>
        <FlatList
          w="325px"
          data={usersWithPhotos}
          extraData={usersWithPhotos}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <>
              <Center
                mx="3"
                mb="1"
                justifyContent="center"
                h="76"
                key={item.id}
              >
                <HStack space={[4, 6]} justifyContent="space-between">
                  <Pressable
                    onPress={() => {
                      onNavigateProfile(item);
                    }}
                    flexDirection="row"
                    padding="1"
                  >
                    {item.photo_file_name && (
                      <Image
                        source={{ uri: item.photo_file_name }}
                        alt="Profile Image"
                        size={10}
                        rounded="full"
                        mr={3}
                      />
                    )}
                    <Text
                      color="#000000"
                      fontSize="16"
                      alignSelf="center"
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                  </Pressable>

                  <Spacer />
                  <Button
                    onPress={() => sendOfferHandler({ book: book, user: item })}
                    variant="primary"
                    right={0}
                    bottom="0"
                    position="absolute"
                    p={2}
                    px="0"
                    width={126}
                  >
                    {i18n.t("send-offer")}
                  </Button>
                </HStack>
              </Center>
              <Divider mt="0" mb="3" mx="3" bg="#EEEEEE" />
            </>
          )}
          keyExtractor={(user: any) => user.id}
        />
      </VStack>
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
