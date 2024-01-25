import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  FlatList,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "native-base";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../i18n";
import { fetchReceivedOfferAsync } from "../../store/profile-actions";

const DUMMY_RECEIVED = [
  {
    id: "1",
    senderProfile: { name: "Lalo Salamanca", profileUrl: "" },
    createdAt: "1h ago",
    offeredBook: {
      title: "The World of Yesterday",
      author: "Stefan Zweig",
      coverUrl: "https://covers.openlibrary.org/b/id/6634325-L.jpg",
    },

    requestedBook: {
      title: "Boleyn Girl",
      author: "Plippa Gregory",
      coverUrl: "https://covers.openlibrary.org/b/id/13157680-L.jpg",
    },
  },
  {
    id: "2",
    senderProfile: { name: "Lalo Salamanca", profileUrl: "" },
    createdAt: "1w ago",
    offeredBook: {
      title: "The World of Yesterday",
      author: "Stefan Zweig",
      coverUrl: "https://covers.openlibrary.org/b/id/6634325-L.jpg",
    },

    requestedBook: {
      title: "What is Man?",
      author: "Mark Twain",
      coverUrl: "https://covers.openlibrary.org/b/id/6071484-L.jpg",
    },
  },
];
[
  {
      "created_at": "Tue, 26 Dec 2023 10:31:36 GMT",
      "id": 3,
      "offered_editions": [
          {
              "author": "Selçuk Demirel",
              "cover_id": null,
              "isbn_10": [
                  "906252592X"
              ],
              "isbn_13": null,
              "title": "Moumouk and the letters."
          }
      ],
      "receiver_id": 1,
      "receiver_user_name": "Luxian",
      "requested_editions": [
          {
              "author": "Cengiz Abbasgil",
              "cover_id": null,
              "isbn_10": [
                  "9753670168"
              ],
              "isbn_13": null,
              "title": "İş hukukunda bütün yönleriyle kıdem tazminatı ve uygulaması"
          }
      ],
      "sender_id": 2,
      "sender_user_name": "Lucian"
  }
]
export default function ReceivedScreen({ navigation }) {
  const tra = require("../../assets/images/icon/Icons.png");
  const otherUserImage = require("../../assets/images/jesse-pinkman-profile.png");
  const profilePhoto = require("../../assets/images/lalo-salamanca.png");
  const receivedOffers = useSelector((state:any) => state.profile);


  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();


  useEffect(() => {
    // Fetch received offers when the component mounts
    // dispatch(fetchReceivedOfferAsync("1"));
    console.log("Received offers",receivedOffers);
  }, [receivedOffers]);

  return (
    <FlatList
      maxWidth="100%"
      bg="#fff"
      height="75%"
      data={receivedOffers}
      showsVerticalScrollIndicator={false}
      pt="3"
      renderItem={({ item }) => (
        <Box pb="6" overflow="hidden" alignItems="center">
          <Flex
            direction="row"
            justifyContent="space-between"
            w="95%"
            alignSelf="center"
            position="relative"
            zIndex={9}
          >
            <Flex direction="row" justifyContent="space-between">
              <Avatar source={otherUserImage} size="44" />
              {/* <Text
                onPress={() => navigation.navigate("Library")}
                color="#161719"
                fontWeight="medium"
                fontSize="14px"
                mx="1"
              >
                {"Jesse Pinkman"}
              </Text> */}
            </Flex>
            <Flex direction="row" justifyContent="space-between">
              <VStack>
                <Text
                  onPress={() => navigation.navigate("Library")}
                  color="#161719"
                  fontWeight="medium"
                  fontSize="14px"
                  mx="1"
                >
                  {item.receiverUser.name}
                </Text>
                <Text
                  onPress={() => navigation.navigate("Library")}
                  color="coolGray.400"
                  fontSize="12px"
                  top="-5.5"
                  mx="1"
                  textAlign={"right"}
                >
                  {item.createdAt}
                </Text>
              </VStack>
              <Avatar source={profilePhoto} size="44" />
            </Flex>
          </Flex>
          <Box
            px="7"
            py="4"
            pt="6"
            pb="2"
            borderColor="coolGray.200"
            width="90%"
            shadow="2"
            alignSelf="center"
            maxW="80"
            top="-12"
            rounded="24"
            overflow="hidden"
            borderWidth="0.5"
          >
            <VStack>
              <HStack justifyContent="space-between" width="100%" space={1}>
                <VStack width="40%">
                  <AspectRatio
                    ratio={{
                      base: 40 / 62,
                    }}
                    width={"100%"}
                  >
                    {/* <Image
                      source={{ uri: item.offeredBook.coverUrl }}
                      alt={`Cover of: ${item.offeredBook.title} by ${item.offeredBook.author}`}
                      roundedRight="6"
                    /> */}
                  </AspectRatio>
                  <Text color="#000000" fontSize="14" fontWeight={600}>
                    {item.offeredBook.title}
                  </Text>
                  <Text color="#8c8c8c" fontSize="11">
                    by {item.offeredBook.author}
                  </Text>
                </VStack>
                <Center height={150}>
                  <Image source={tra} alt="Library icon" />
                </Center>
                <VStack width="40%">
                  <AspectRatio
                    ratio={{
                      base: 40 / 62,
                    }}
                    width={"100%"}
                  >
                    {/* <Image
                      source={{ uri: item.requestedBook.coverUrl }}
                      alt={`Cover of: ${item.offeredBook.title} by ${item.offeredBook.author}`}
                      roundedRight="6"
                    /> */}
                  </AspectRatio>
                  <Text color="#000000" fontSize="14" fontWeight={600}>
                    {item.requestedBook.title}
                  </Text>
                  <Text color="#8c8c8c" fontSize="11">
                    by {item.requestedBook.author}
                  </Text>
                </VStack>
              </HStack>
              {/* <Divider my={3} color="#E5E7F3" thickness="1" /> */}
              <Flex direction="row" justifyContent="space-between" pt="3">
                <Button
                  variant="ghost"
                  _text={{ color: "#9395A4" }}
                  onPress={() => navigation.goBack()}
                >
                  {i18n.t("decline")}
                </Button>
                <Divider
                  color="#E5E7F3"
                  thickness="1"
                  orientation="vertical"
                  height={6}
                  marginY="2"
                />
                <Button variant="ghost" onPress={() => navigation.goBack()}>
                  {i18n.t("accept")}
                </Button>
              </Flex>
            </VStack>
          </Box>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
