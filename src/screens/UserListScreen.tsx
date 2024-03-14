import { useState } from "react";
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
} from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AlertDialogBox } from "../components/Modal/AlertDialogBox";

export default function UserListScreen({ navigation, route }) {
  const usersTemp = route?.params?.data?.usersOwning;
  const book = route?.params?.data;

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { libraryBook } = useSelector((state: any) => state.profile.profile);

  const [libraryItems, setLibraryItem] = useState<any>([]);


  const [isOpen, setIsOpen] = useState(false);

  const pressHandler = (data) => {
    if (libraryBook.length === 0) {
      // Library is empty, show an alert
      setIsOpen(true);
    } else {
      // Library is not empty, proceed with navigation
      navigation.navigate("TradeProposal", { data });
    }
  };
  const onClose = () => setIsOpen(false);

  const addBookHandler = () => {
    navigation.navigate("ProfileStack", { screen: "Library" });
    onClose();
  };
  const avatarImage = require("../assets/images/avatar.png");

  return (
    <Screen>
      <VStack space={1} alignItems="center">
        {/* <Center w="100%" h="20" justifyContent="space-between">
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
            <Center>
              <Heading w="145">{i18n.t("ask-for-swap")}</Heading>
            </Center>{" "}
          </Flex>
        </Center> */}
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
          data={usersTemp}
          extraData={usersTemp}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <>
              <Center mx="3" mb="1" justifyContent="center" h="76">
                <HStack space={[4, 6]} justifyContent="space-between">
                  {item.photo_file_name  && (
                    <Avatar
                      borderRadius="full"
                      source={{ uri: item.photo_file_name }}
                    />
                  )}
                  {!item.photo_file_name  && (
                    <Avatar borderRadius="full" source={avatarImage} />
                  )}
                  <Text
                    color="#000000"
                    fontSize="16"
                    alignSelf="center"
                    width="105px"
                  >
                    {item.name}
                  </Text>

                  <Spacer />
                  <Button
                    onPress={() =>
                      pressHandler( { book: book, user: item } )
                    }
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
